import { Food } from "../../../constants/types/types";
import * as _ from "lodash";
import { collection, getFirestore, addDoc } from "firebase/firestore";
/**
 * @brief Validates the new food form before sending to the DB.
 */
export function safeToSendNewFoodToDB(formState: Readonly<Food>): {
  isSafe: boolean;
  reason: string;
} {
  // Food UID exists
  if (!formState.uid) {
    return { isSafe: false, reason: "Internal Error: Food UID is required." };
  }

  // Food name exists
  if (!formState.name) {
    return { isSafe: false, reason: "Food name is required." };
  }

  // Food name is less than 50 characters
  if (formState.name.length >= 50) {
    return {
      isSafe: false,
      reason: "Food name must be less than 50 characters.",
    };
  }

  // Food description is less than 100 characters, if it exists
  if (formState.description && formState.description.length >= 100) {
    return {
      isSafe: false,
      reason: "Food description must be less than 100 characters.",
    };
  }

  // Restaurant UID exists
  if (!formState.restaurantUid) {
    return { isSafe: false, reason: "Restaurant is required." };
  }

  // Menu UID is a string or null
  if (typeof formState.menuUid !== "string" && formState.menuUid !== null) {
    return {
      isSafe: false,
      reason:
        "Internal Error: Menu is of incorrect type, please reload the page.",
    };
  }

  // All toggles are booleans
  if (
    typeof formState.nutritionalData.isGlutenFree !== "boolean" ||
    typeof formState.nutritionalData.isDairyFree !== "boolean" ||
    typeof formState.nutritionalData.isVegetarian !== "boolean" ||
    typeof formState.nutritionalData.isVegan !== "boolean" ||
    typeof formState.nutritionalData.isEstimate !== "boolean" ||
    typeof formState.nutritionalData.hasFreshFruit !== "boolean" ||
    typeof formState.nutritionalData.hasFreshVegetables !== "boolean"
  ) {
    return {
      isSafe: false,
      reason:
        "Internal Error: A toggle is of the incorrect type, please reload the page.",
    };
  }

  // 0 < calories < 4000
  if (
    formState.nutritionalData.calories <= 0 ||
    formState.nutritionalData.calories >= 4000
  ) {
    return { isSafe: false, reason: "Calories must be between 0 and 4000." };
  }

  // 0 < fat < 200
  if (
    formState.nutritionalData.fat.quantity <= 0 ||
    formState.nutritionalData.fat.quantity >= 200
  ) {
    return { isSafe: false, reason: "Fat must be between 0 and 200." };
  }

  // fat unit must be grams (g)
  if (formState.nutritionalData.fat.unit !== "g") {
    return { isSafe: false, reason: "Fat must be in grams." };
  }

  // 0 < carbohydrates < 400
  if (
    formState.nutritionalData.carbohydrates.quantity <= 0 ||
    formState.nutritionalData.carbohydrates.quantity >= 400
  ) {
    return {
      isSafe: false,
      reason: "Carbohydrates must be between 0 and 400.",
    };
  }

  // carbohydrates unit must be grams (g)
  if (formState.nutritionalData.carbohydrates.unit !== "g") {
    return { isSafe: false, reason: "Carbohydrates must be in grams." };
  }

  // 0 < protein < 200
  if (
    formState.nutritionalData.protein.quantity <= 0 ||
    formState.nutritionalData.protein.quantity >= 200
  ) {
    return { isSafe: false, reason: "Protein must be between 0 and 200." };
  }

  // protein unit must be grams (g)
  if (formState.nutritionalData.protein.unit !== "g") {
    return { isSafe: false, reason: "Protein must be in grams." };
  }

  // 0 < fiber < 150
  if (
    formState.nutritionalData.fiber !== null &&
    formState.nutritionalData.fiber.quantity >= 150
  ) {
    return { isSafe: false, reason: "Fiber must be less than 150." };
  }

  // fiber unit must be grams (g)
  if (
    formState.nutritionalData.fiber !== null &&
    formState.nutritionalData.fiber.unit !== "g"
  ) {
    return { isSafe: false, reason: "Fiber must be in grams." };
  }

  // cannot select isVegan without isDairyFree
  if (
    formState.nutritionalData.isVegan &&
    !formState.nutritionalData.isDairyFree
  ) {
    return {
      isSafe: false,
      reason: "Cannot select isVegan without isDairyFree.",
    };
  }

  // cannot select isVegan without isVegetarian
  if (
    formState.nutritionalData.isVegan &&
    !formState.nutritionalData.isVegetarian
  ) {
    return {
      isSafe: false,
      reason: "Cannot select isVegan without isVegetarian.",
    };
  }

  // use entered calories must be within 10% of the macronutirent total
  const computedCalories =
    formState.nutritionalData.protein.quantity * 4 +
    formState.nutritionalData.fat.quantity * 9 +
    formState.nutritionalData.carbohydrates.quantity * 4;
  const tolerance = 0.1;
  const minCalories = Math.round(computedCalories * (1 - tolerance));
  const maxCalories = Math.round(computedCalories * (1 + tolerance));
  if (
    formState.nutritionalData.calories < minCalories ||
    formState.nutritionalData.calories > maxCalories
  ) {
    return {
      isSafe: false,
      reason: `Calories must be within 10% of the macronutrient total (calories = protein * 4 + fat * 9 + carbohydrates * 4)\nExpected: ${minCalories} - ${maxCalories} calories\nReceived: ${formState.nutritionalData.calories} calories`,
    };
  }

  /******* TODO: UNCOMMENT ONCE AUTH IS HOOKED UP *******/
  // // submittedByUserUid exists
  //   if (!formState.submittedByUserUid) {
  //     return {
  //       isSafe: false,
  //       reason: "Internal Error: submittedByUserUid is required.",
  //     };
  //   }

  // All checks passed, it is safe to send the new food to the DB
  return { isSafe: true, reason: "" };
}

/**
 * @note Function will update description & fiber object to null if description
 * is an empty string or fiber.quantity is 0.This is because the form requires a
 * non-null value for fiber and description, but the DB should not mislead users
 * by showing 0g fiber or "" description.
 */
export async function sendNewFoodToDB(formState: Food): Promise<{
  success: boolean;
  error: string;
}> {
  // Do not change the formState, must make a new object
  let dbReadyFood = _.cloneDeep(formState);

  if (
    dbReadyFood.nutritionalData.fiber !== null &&
    dbReadyFood.nutritionalData.fiber.quantity === 0
  ) {
    dbReadyFood.nutritionalData.fiber = null;
  }

  if (dbReadyFood.description === "") {
    dbReadyFood.description = null;
  }

  try {
    const db = getFirestore();
    const foodsCollection = collection(db, "foods");
    await addDoc(foodsCollection, dbReadyFood);
    return { success: true, error: "" };
  } catch (e: any) {
    return { success: false, error: e.message as string };
  }
}

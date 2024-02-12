import { FoodForm } from "../../constants/types/types";

// name, description, menuUid, restaurantUid, submittedByUserUid,
export const handleTopLevelStringChange = (
  name: string,
  value: string,
  setFormState: React.Dispatch<React.SetStateAction<FoodForm>>
) => {
  setFormState((prevFormState) => {
    return {
      ...prevFormState,
      [name]: value,
    };
  });
};

/**
 * @brief Updates state for nutritional data items. Assumes all units are grams.
 * @param name calories, protein, carbohydrates, fiber, isGlutenFree, isDairyFree, isVegetarian, isVegan, isEstimate, hasFreshFruit or hasFreshVegetables
 * @param value the field on the UI
 * @param setFormState state setter
 */
export const handleNutritionalDataChange = (
  name: keyof FoodForm["nutritionalData"],
  value: string | boolean,
  setFormState: React.Dispatch<React.SetStateAction<FoodForm>>
) => {
  setFormState((prevState) => {
    const newState: FoodForm = { ...prevState };

    if (name === "calories" && typeof value === "string") {
      // strip all non-numeric characters.
      const onlyNumbers = Number(value.replace(/[^0-9]/g, ""));
      newState.nutritionalData.calories = onlyNumbers;
    } else if (
      typeof value === "boolean" &&
      (name === "isGlutenFree" ||
        name === "isDairyFree" ||
        name === "isVegetarian" ||
        name === "isVegan" ||
        name === "isEstimate" ||
        name === "hasFreshFruit" ||
        name === "hasFreshVegetables")
    ) {
      newState.nutritionalData[name] = value;
    } else if (
      name === "protein" ||
      name === "fat" ||
      name === "carbohydrates" ||
      name === "fiber"
    ) {
      const numericalNutritionalData = {
        quantity:
          isNaN(Number(value)) || Number(value) === 0 ? 0 : Number(value),
        unit: "g",
      };
      newState.nutritionalData[name] = numericalNutritionalData;
    }
    return newState;
  });
};

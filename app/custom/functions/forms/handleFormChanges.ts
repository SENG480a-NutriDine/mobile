import _ from "lodash";
import { Food } from "../../../constants/types/types";

// name, description, menuUid, restaurantUid, submittedByUserUid,
export const handleTopLevelStringChange = (
  name: string,
  value: string,
  setFormState: React.Dispatch<React.SetStateAction<Food>>
) => {
  setFormState((prevFormState) => {
    return {
      ...prevFormState,
      [name]: value,
    };
  });
};

// TODO: This is the dummy implementation: Will need to update to
// allow any number of purchaseAt items (it is an array).
export function handlePurchaseAtChange(
  url: string | null,
  displayName: string | null,
  setFormState: React.Dispatch<React.SetStateAction<Food>>
) {
  setFormState((prevFormState) => {
    const setUrl = url ?? prevFormState.purchaseAt?.[0].url ?? "";
    const setDisplayName =
      displayName ?? prevFormState.purchaseAt?.[0].displayName ?? "";
    return {
      ...prevFormState,
      purchaseAt: [{ url: setUrl, displayName: setDisplayName }],
    };
  });
}

/**
 * @brief Updates state for nutritional data items. Assumes all units are grams.
 * @param name calories, protein, carbohydrates, fiber, isGlutenFree, isDairyFree, isVegetarian, isVegan, isEstimate, hasFreshFruit or hasFreshVegetables
 * @param value the field on the UI
 * @param setFormState state setter
 */
export const handleNutritionalDataChange = (
  name: keyof Food["nutritionalData"],
  value: string | boolean,
  setFormState: React.Dispatch<React.SetStateAction<Food>>
) => {
  setFormState((prevState) => {
    const newState: Food = _.cloneDeep(prevState);

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

import { FoodForm } from "../types/types";

export const initializeFoodForm: FoodForm = {
  name: "",
  description: "",
  nutritionalData: {
    calories: 0,
    protein: {
      quantity: 0,
      unit: "g",
    },
    fat: {
      quantity: 0,
      unit: "g",
    },
    carbohydrates: {
      quantity: 0,
      unit: "g",
    },
    fiber: {
      quantity: 0,
      unit: "g",
    },
    isGlutenFree: false,
    isDairyFree: false,
    isVegetarian: false,
    isVegan: false,
    isEstimate: false,
    hasFreshFruit: false,
    hasFreshVegetables: false,
  },
  menuUid: "",
  restaurantUid: "",
  submittedByUserUid: "", // TODO: get from auth
  purchaseAt: [],
};

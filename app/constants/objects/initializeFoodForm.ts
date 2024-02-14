import { Food } from "../types/types";

export const initializeFoodForm: Readonly<Food> = {
  uid: "",
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
  submittedByUserUid: "",
  purchaseAt: [{ url: "", displayName: "" }],
  ratingCounts: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  },
};

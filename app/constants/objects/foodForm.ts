export const initializeFoodForm = {
  name: "", // handleTopLevelStringChange
  description: "", // handleTopLevelStringChange
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
  menuUid: "", // handleTopLevelStringChange
  restaurantUid: "", // handleTopLevelStringChange
  submittedByUserUid: "", // handleTopLevelStringChange -- TODO: get from auth
  purchaseAt: [],
};

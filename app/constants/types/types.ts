export type NutritionalData = {
  calories: number;
  protein: {
    quantity: number;
    unit: string;
  };
  fat: {
    quantity: number;
    unit: string;
  };
  carbohydrates: {
    quantity: number;
    unit: string;
  };
  fiber: {
    quantity: number;
    unit: string;
  } | null;
  isGlutenFree: boolean;
  isDairyFree: boolean;
  isVegetarian: boolean;
  isVegan: boolean;
  isEstimate: boolean;
  hasFreshFruit: boolean;
  hasFreshVegetables: boolean;
};

export interface Food {
  uid: string;
  name: string;
  description: string | null;
  nutritionalData: NutritionalData;
  menuUid: string | null;
  restaurantUid: string;
  ratingCounts: RatingCounts;
  submittedByUserUid: string;
  purchaseAt:
    | {
        url: string;
        displayName: string;
      }[]
    | null;
}

export interface Menu {
  uid: string;
  name: string;
  description: string | null;
  restaurantUid: string;
}

export interface RatingCounts {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
}

export interface Restaurant {
  uid: string;
  name: string;
  ratingCounts: RatingCounts;
}

export interface User {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number | null;
  address: string | null;
  favoriteFoodUids: string[];
}

export type FoodForm = Omit<Food, "uid" | "ratingCounts">;

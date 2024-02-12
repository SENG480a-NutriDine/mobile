import { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { Restaurant } from "../../constants/types/types";

const useRestaurants = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [restaurantsAreLoading, setRestaurantsAreLoading] =
    useState<boolean>(true);

  useEffect(() => {
    const fetchExercises = async () => {
      console.log("useRestaurant() is fetching...");
      try {
        const db = getFirestore();
        const restaurantsCollection = collection(db, "restaurants");
        const restaurantsQuery = query(restaurantsCollection);
        const querySnapshot = await getDocs(restaurantsQuery);

        const fetchedRestaurants: Restaurant[] = [];
        querySnapshot.forEach((doc) => {
          fetchedRestaurants.push({ ...(doc.data() as Restaurant) });
        });

        setRestaurants(fetchedRestaurants);
        setRestaurantsAreLoading(false);
      } catch (error) {
        console.log("Error fetching restaurant data:", error);
        setRestaurantsAreLoading(false);
      }
    };

    fetchExercises();
  }, []);

  return { restaurants, restaurantsAreLoading };
};

export default useRestaurants;

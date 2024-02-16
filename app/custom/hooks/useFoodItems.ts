import { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { Food } from '../../constants/types/types'; // Assuming you have a FoodItem type defined

const useFoodItems = () => {
    const [foodItems, setFoodItems] = useState<Food[]>([]);
    const [foodItemsAreLoading, setFoodItemsAreLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchFoodItems = async () => {
            console.log("Fetching food items...");
            try {
                const db = getFirestore();
                const foodItemsCollection = collection(db, "foods");
                const querySnapshot = await getDocs(foodItemsCollection);

                const fetchedFoodItems: Food[] = [];
                querySnapshot.forEach((doc) => {
                    fetchedFoodItems.push({ ...(doc.data() as Food) });
                });

                setFoodItems(fetchedFoodItems);
                setFoodItemsAreLoading(false);
            } catch (error) {
                console.log("Error fetching food items:", error);
                setFoodItemsAreLoading(false);
            }
        };

        fetchFoodItems();
    }, []);

    return { foodItems, foodItemsAreLoading };
};

export default useFoodItems;

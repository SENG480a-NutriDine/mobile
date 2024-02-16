import { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { Menu } from "../../constants/types/types";

const useMenu = (restaurantUid: string) => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [menusAreLoading, setMenusAreLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMenus = async () => {
      console.log("useMenu() is fetching...");
      try {
        const db = getFirestore();
        const menusCollection = collection(db, "menus");
        const menusQuery = query(
          menusCollection,
          where("restaurantUid", "==", restaurantUid)
        );
        const querySnapshot = await getDocs(menusQuery);

        const fetchedMenus: Menu[] = [];
        querySnapshot.forEach((doc) => {
          fetchedMenus.push({ ...(doc.data() as Menu) });
        });

        setMenus(fetchedMenus);
        setMenusAreLoading(false);
      } catch (error) {
        console.log("Error fetching menu data:", error);
        setMenusAreLoading(false);
      }
    };

    fetchMenus();
  }, [restaurantUid]);

  return { menus, menusAreLoading };
};

export default useMenu;

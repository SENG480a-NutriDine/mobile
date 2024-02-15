import { doc, getDoc, setDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../firebaseConfig";

// Function to check and add a user to Firestore
export const checkAndAddUser = async (user: {
  uid: string;
  displayName: string | null;
  email: string | null;
}) => {
  const userRef = doc(FIREBASE_DB, "users", user.uid);
  const docSnap = await getDoc(userRef);

  if (!docSnap.exists()) {
    try {
      // The user doesn't exist, so add them to Firestore
      await setDoc(userRef, {
        name: user.displayName,
        email: user.email,
      });
      return true; // Successfully added the user
    } catch (error) {
      throw new Error("Failed to add user to Firestore"); // Rethrow or handle as needed
    }
  } else {
    return true;
  }
};

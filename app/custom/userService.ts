import { doc, getDoc, setDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../firebaseConfig";

// Define a TypeScript type for the User
type UserType = {
  uid: string;
  displayName: string | null;
  email: string | null;
};

// Function to check and add a user to Firestore, or retrieve their type if they exist
export const checkAndAddUser = async (user: UserType): Promise<string> => {
  const userRef = doc(FIREBASE_DB, "users", user.uid);
  const docSnap = await getDoc(userRef);

  if (docSnap.exists()) {
    // The user already exists, return their type
    const userData = docSnap.data();
    return userData.type || "unknown"; // Return "unknown" if type is not set
  } else {
    try {
      // The user doesn't exist, so add them to Firestore as "regular"
      await setDoc(userRef, {
        name: user.displayName,
        email: user.email,
        type: "regular", // Set user type as "regular"
      });
      return "regular"; // Return "regular" since this is a new user
    } catch (error) {
      console.error("Failed to add user to Firestore:", error);
      throw new Error("Failed to add user to Firestore");
    }
  }
};

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyB9KciPJF6V4CB_yi37AXy-I4RognItqBQ",
  authDomain: "nutridine.firebaseapp.com",
  projectId: "nutridine",
  storageBucket: "nutridine.appspot.com",
  messagingSenderId: "188208814441",
  appId: "1:188208814441:web:c38d239cd4d32dcaad05f8",
  measurementId: "G-8Q4FKYK8WB",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
// export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
// export const FIREBASE_ANALYTICS = getAnalytics(FIREBASE_APP);

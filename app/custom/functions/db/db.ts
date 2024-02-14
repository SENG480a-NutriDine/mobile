import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getFirestore,
} from "firebase/firestore";

/**
 * @brief Generates a unique identifier.
 * @description Firebase creates a unique ID for all new documents. Due to our
 * data model of mocking a relational DB, we need to generate a unique ID and
 * store it as a doc property, rather than using the assigned ID.
 */
export async function generateUid(): Promise<string> {
  const db = getFirestore();
  const uid = (await addDoc(collection(db, "uidGenerator"), {})).id;
  await deleteDoc(doc(db, "uidGenerator", uid));
  return uid;
}

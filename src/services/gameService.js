import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/Firebase";

export const getGameScore = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const docRef = doc(db, "gameScores", user.uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
};

export const saveGameScore = async (score) => {
  const user = auth.currentUser;
  if (!user) throw new Error("Not authenticated");

  const docRef = doc(db, "gameScores", user.uid);
   const name = user.displayName;
  await setDoc(docRef, { name, score, gameOver: true });
  
};

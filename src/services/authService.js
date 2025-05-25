import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword, signOut,updateProfile
} from "firebase/auth";
import { auth } from "../firebase/Firebase";
import {
    getAuth,
    onAuthStateChanged,
    sendPasswordResetEmail,
} from "firebase/auth";

export const registerUser = async (email, password, name) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    if (auth.currentUser) {
      await updateProfile(auth.currentUser, { displayName: name });
      await auth.currentUser.reload(); // Refresh the user data
    }

    return { user: auth.currentUser, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};


export const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );
        return { user: userCredential.user, error: null };
    } catch (error) {
        return { user: null, error: error.message };
    }
};

export const observeUser = (callback) => {
    return onAuthStateChanged(auth, callback);
};

export const resetPassword = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        return { success: true };
    } catch (error) {
        return { error: error.message };
    }
};

export const logout = async () => {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Error signing out:", error);
  }
};

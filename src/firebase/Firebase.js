// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQdLKbagQgBVVq8jK2MFlxhtf6gydw2PA",
  authDomain: "digital-j.firebaseapp.com",
  projectId: "digital-j",
  storageBucket: "digital-j.appspot.com",
  messagingSenderId: "180934718496",
  appId: "1:180934718496:web:a218369eb2a19578fb3845",
  measurementId: "G-7PPB5K50EL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
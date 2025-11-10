// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBlp5hxn8uHFGEqhkDroq_khz8RpCQ-K7A",
    authDomain: "emergencyapp786.firebaseapp.com",
    projectId: "emergencyapp786",
    storageBucket: "emergencyapp786.appspot.com", // Make sure this is correct
    messagingSenderId: "714485189721",
    appId: "1:714485189721:web:a552df09f28327e698f548"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
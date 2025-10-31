// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBrf7nkJvSleFYKgB1PN4en7Mu62SjvFzg",
  authDomain: "funny-shopping.firebaseapp.com",
  projectId: "funny-shopping",
  storageBucket: "funny-shopping.firebasestorage.app",
  messagingSenderId: "630945281513",
  appId: "1:630945281513:web:ae05461292765179104778",
  measurementId: "G-JNMHMT9W5S",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCxBZeOZ5DliwMgEdJPaQKYPyB4pWdP0mM",
  authDomain: "workplace-d01fa.firebaseapp.com",
  projectId: "workplace-d01fa",
  storageBucket: "workplace-d01fa.appspot.com",
  messagingSenderId: "1078807145368",
  appId: "1:1078807145368:web:5a07d678821887ca7399ed"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db= getFirestore( app);
export const storage=getStorage(app);
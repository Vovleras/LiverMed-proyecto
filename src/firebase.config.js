// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD2SCVjxVdxlOIOUv1byE2qHAextFZTLJU",
  authDomain: "livermed-77229.firebaseapp.com",
  projectId: "livermed-77229",
  storageBucket: "livermed-77229.firebasestorage.app",
  messagingSenderId: "969105704290",
  appId: "1:969105704290:web:0a5c195dd3fe6e434d583b",
  measurementId: "G-LS4PS60J7M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA7xgB7jp9d91UQWN7-Yc-aWn5vl7BtrdY",
  authDomain: "taskapp-a0333.firebaseapp.com",
  projectId: "taskapp-a0333",
  storageBucket: "taskapp-a0333.firebasestorage.app",
  messagingSenderId: "573581234268",
  appId: "1:573581234268:web:019e082ac1b1ee513a1699",
  measurementId: "G-JV5V4S5M1K"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

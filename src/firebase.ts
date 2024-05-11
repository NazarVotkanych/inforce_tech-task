import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
const API_KEY = import.meta.env.VITE_API_KEY;

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "myvisoauth.firebaseapp.com",
  projectId: "myvisoauth",
  storageBucket: "myvisoauth.appspot.com",
  messagingSenderId: "730360465447",
  appId: "1:730360465447:web:9a0ddf515c925e1ce06602"
};

export const app = initializeApp(firebaseConfig);
export const googleAuthPrivider = new GoogleAuthProvider();
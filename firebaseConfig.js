// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";  // Adicione esta linha

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCA7Xpmj9eIihYZ3VfVTDvg_XQ2mMt8PZY",
  authDomain: "auth-firebase-caio-aula2.firebaseapp.com",
  projectId: "auth-firebase-caio-aula2",
  storageBucket: "auth-firebase-caio-aula2.appspot.com",
  messagingSenderId: "253803720481",
  appId: "1:253803720481:web:2a4499bf57be1f23449860",
  measurementId: "G-TZFK8FZ8K5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firestore
export const db = getFirestore(app);  // Adicione esta linha para inicializar o Firestore

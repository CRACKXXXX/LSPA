// Firebase configuration and initialization
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBPDjE4Xqn4HINCy_oxNvR4OxnNcjw4wkI",
  authDomain: "lspa-joel.firebaseapp.com",
  projectId: "lspa-joel",
  storageBucket: "lspa-joel.firebasestorage.app",
  messagingSenderId: "96316117978",
  appId: "1:96316117978:web:186d8774afaecb232866e3",
  measurementId: "G-12748SLGT8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore database
const db = getFirestore(app);

export { db };
export default app;

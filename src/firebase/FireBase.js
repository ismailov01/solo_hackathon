import { initializeApp, getApp } from "firebase/app";
import "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC7sm66rJjNygnwPjI3Ju8ysPE7lBbkuiM",
  authDomain: "hackathon-porject.firebaseapp.com",
  projectId: "hackathon-porject",
  storageBucket: "hackathon-porject.appspot.com",
  messagingSenderId: "630650216444",
  appId: "1:630650216444:web:299a69c2fe1c854d7b9c79"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebaseApp = getApp();
export const storage = getStorage(firebaseApp);
export const auth = getAuth();
export const fireDB = getFirestore(app);


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxJa3Vg4VWjL0Lqa9hTyROutkOPeA8flg",
  authDomain: "all-todo-list-ts-fb.firebaseapp.com",
  projectId: "all-todo-list-ts-fb",
  storageBucket: "all-todo-list-ts-fb.appspot.com",
  messagingSenderId: "682521023617",
  appId: "1:682521023617:web:19f0e11c002d3d928c6980",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

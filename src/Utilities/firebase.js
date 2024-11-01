// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {  getFirestore, collection, addDoc, getDocs, query, where, updateDoc, doc} from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, getAuth, onAuthStateChanged } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0o4oVeFC_qtVz50EH9VA_e14mVBNYpJA",
  authDomain: "react-ecommmerce.firebaseapp.com",
  projectId: "react-ecommmerce",
  storageBucket: "react-ecommmerce.appspot.com",
  messagingSenderId: "456944499562",
  appId: "1:456944499562:web:b6c40b4392f5414b624313"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export{
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    auth,
    getFirestore,
    collection,
    addDoc,
    db,
    onAuthStateChanged,
    getDocs,
    query,
    where,
    updateDoc,
    doc
    
}

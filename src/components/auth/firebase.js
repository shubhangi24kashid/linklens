import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
 apiKey: "AIzaSyAektik3U6HHb2ftExj38SW1qk6iiqxKko",
  authDomain: "linklens-62260.firebaseapp.com",
  projectId: "linklens-62260",
  storageBucket: "linklens-62260.firebasestorage.app",
  messagingSenderId: "400747087691",
  appId: "1:400747087691:web:9572d18e91e17cb291cace",
  measurementId: "G-SBTRC3JQP2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANhliBdSArGOi057DJ09RTpfxUlmd1BEo",
  authDomain: "clone-1d6d4.firebaseapp.com",
  projectId: "clone-1d6d4",
  storageBucket: "clone-1d6d4.appspot.com",
  messagingSenderId: "125850208081",
  appId: "1:125850208081:web:53b0effd1971f677b53570",
  measurementId: "G-65Q57T4P95"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export default firebaseConfig;

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkzRLsLmFXuV-iFJUUMPmH3ZCsKqEu0Ko",
  authDomain: "cook-the-code-cdb8f.firebaseapp.com",
  projectId: "cook-the-code-cdb8f",
  storageBucket: "cook-the-code-cdb8f.firebasestorage.app",
  messagingSenderId: "28371719314",
  appId: "1:28371719314:web:4636b82255de2c3bdac24b",
  measurementId: "G-JPPJKXPV8B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAY4LoY74waZv9H-brV5OphyxRvMn-TEsA",
  authDomain: "affworld-assignment.firebaseapp.com",
  projectId: "affworld-assignment",
  storageBucket: "affworld-assignment.appspot.com",
  messagingSenderId: "242457691613",
  appId: "1:242457691613:web:f882213bc7f8c38ff56234",
  measurementId: "G-N08T4HDVGV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default firebaseConfig;
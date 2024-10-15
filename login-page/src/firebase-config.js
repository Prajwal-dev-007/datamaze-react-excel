// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwtYfxZ1GVX0BfxnwQ_KjX_yRxf1WYQ3Y",
  authDomain: "excel-firebase-react.firebaseapp.com",
  projectId: "excel-firebase-react",
  storageBucket: "excel-firebase-react.appspot.com",
  messagingSenderId: "53417301610",
  appId: "1:53417301610:web:4c39eba237aa44316c9c13",
  measurementId: "G-GEX56CXTKK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)


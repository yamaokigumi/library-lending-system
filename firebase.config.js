// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrXX-J40F7lcEbRVo7wqjEkZXVXddgTRg",
  authDomain: "yamaokigumi.firebaseapp.com",
  projectId: "yamaokigumi",
  storageBucket: "yamaokigumi.appspot.com",
  messagingSenderId: "497049610870",
  appId: "1:497049610870:web:51c77ef049e1b8cc4fcd57",
  measurementId: "G-CK5PXFVZP2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
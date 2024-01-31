// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "saad-blog-6fbcf.firebaseapp.com",
  projectId: "saad-blog-6fbcf",
  storageBucket: "saad-blog-6fbcf.appspot.com",
  messagingSenderId: "412221192180",
  appId: "1:412221192180:web:623b1f1d75458d05dd6ba1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


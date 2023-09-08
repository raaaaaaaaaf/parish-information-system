// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9UVHLgXu7Hdp-BEly2otRGXiU82iLSvU",
  authDomain: "parish-information-syste-d0b2b.firebaseapp.com",
  projectId: "parish-information-syste-d0b2b",
  storageBucket: "parish-information-syste-d0b2b.appspot.com",
  messagingSenderId: "126385446129",
  appId: "1:126385446129:web:ec2326e5c2fb7846afdd50",
  measurementId: "G-5G8LWQJP2Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)
export const storage = getStorage()
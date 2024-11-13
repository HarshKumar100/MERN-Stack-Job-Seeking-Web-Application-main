// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "Api-key",
  authDomain: "domain",
  projectId: "social-media-59009",
  storageBucket: "bucket",
  messagingSenderId: "957185569746",
  appId: "appid",
  measurementId: "G-6FL9R543P0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);    
export const auth=getAuth(app)
export const db=getFirestore(app)
export const storage=getStorage(app)
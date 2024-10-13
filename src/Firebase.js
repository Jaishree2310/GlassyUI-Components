// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TOD O: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD_hNW_FpBL3NgWs-bOFooaV9--0827VEc',
  authDomain: 'glassy-components.firebaseapp.com',
  projectId: 'glassy-components',
  storageBucket: 'glassy-components.appspot.com',
  messagingSenderId: '193677779650',
  appId: '1:193677779650:web:d68c2aaa8e7cf5775a515b',
  measurementId: 'G-KV5DDV7YEJ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
export const db = getFirestore(app);

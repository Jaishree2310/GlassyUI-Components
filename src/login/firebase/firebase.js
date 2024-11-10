import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
// Create an accont on firebase and you get all this configuration just replace that with this
// Then your sign-in / sign-up feature will work smothly
const firebaseConfig = {
  apiKey: 'AIzaSyBTMlmquV6yW7bMSkPk4cETVqKsUK_aEjY',

  authDomain: 'gssoc-passop.firebaseapp.com',

  projectId: 'gssoc-passop',

  storageBucket: 'gssoc-passop.firebasestorage.app',

  messagingSenderId: '596205653550',

  appId: '1:596205653550:web:9af96a57fdf1c3609399bf',

  measurementId: 'G-812J1WK5X0',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth, app };

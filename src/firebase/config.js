import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {

  apiKey: "AIzaSyCUsYOs-sYSAp-90rc9bDHDfLM_P9LBZkE",

  authDomain: "ehrsksu.firebaseapp.com",

  databaseURL: "https://ehrsksu-default-rtdb.firebaseio.com",

  projectId: "ehrsksu",

  storageBucket: "ehrsksu.firebasestorage.app",

  messagingSenderId: "31004474453",

  appId: "1:31004474453:web:2a921ef08833605754a8dc",

  measurementId: "G-FYBKXZDJ0V"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db }; 
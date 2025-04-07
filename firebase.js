// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB4Z5vG5k_rkAAqKkEb9KbAoHM9rfz754U",
    authDomain: "linaapp-4310c.firebaseapp.com",
    projectId: "linaapp-4310c",
    storageBucket: "linaapp-4310c.firebasestorage.app",
    messagingSenderId: "666661350487",
    appId: "1:666661350487:web:426c98b591b2923a210712",
    measurementId: "G-EFX2056XM5"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add your Firebase project's configuration here
const firebaseConfig = {
    apiKey: "AIzaSyBnfjHIOGPjmRkU4t1nRGkOXA1tw9YBdyc",
    authDomain: "vodacihronov-d489b.firebaseapp.com",
    projectId: "vodacihronov-d489b",
    storageBucket: "vodacihronov-d489b.firebasestorage.app",
    messagingSenderId: "804293483006",
    appId: "1:804293483006:web:27186c12a84e6dffd048af",
    measurementId: "G-6HH2GQVW3W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db }; 
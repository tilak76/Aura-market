// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBffZa-Ni93fsW_pubn6uxrvOPypSD1Auo",
    authDomain: "project-tracker-5311e.firebaseapp.com",
    databaseURL: "https://project-tracker-5311e-default-rtdb.firebaseio.com",
    projectId: "project-tracker-5311e",
    storageBucket: "project-tracker-5311e.firebasestorage.app",
    messagingSenderId: "115112116108",
    appId: "1:115112116108:web:2c8b9ae1d1c8396f0220a9",
    measurementId: "G-WR87X7ELJW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };

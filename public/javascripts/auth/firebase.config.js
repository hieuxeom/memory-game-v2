// @ts-ignore
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
// @ts-ignore
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-analytics.js";
// @ts-ignore
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
var firebaseConfig = {
    apiKey: "AIzaSyBZuhG3WLNMD_VIoeUrnhMA8UN5UgGfgDY",
    authDomain: "memory-game-db746.firebaseapp.com",
    projectId: "memory-game-db746",
    storageBucket: "memory-game-db746.appspot.com",
    messagingSenderId: "1055719462094",
    appId: "1:1055719462094:web:bc86fd11371efc41656c9f",
    measurementId: "G-LJX36HPEFX",
};
// Initialize Firebase
export var app = initializeApp(firebaseConfig);
export var auth = getAuth(app);
export var provider = new GoogleAuthProvider(app);
var analytics = getAnalytics(app);

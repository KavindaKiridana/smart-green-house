//waterTap.js file
// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBlfnZvS9N2XBjBMiKMnlCywc-FjBnkDhQ",
    authDomain: "plnat-growth.firebaseapp.com",
    databaseURL: "https://plnat-growth-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "plnat-growth",
    storageBucket: "plnat-growth.firebasestorage.app",
    messagingSenderId: "714741844786",
    appId: "1:714741844786:web:ce7246947c8d5a109f252b",
    measurementId: "G-PLPRSHRBH7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Function to fetch and update the water tap status
function updateWaterTapStatus() {
    const dbRef = ref(db, "weatherParameters/tap");
    get(dbRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                document.getElementById("waterSwitch").checked = snapshot.val() === "true";
                console.log("Water tap state (from Firebase):", snapshot.val());
            } else {
                console.error("No tap data found in Firebase.");
            }
        })
        .catch((error) => console.error("Error reading data:", error));
}

// Fetch water tap status on page load
window.addEventListener("load", updateWaterTapStatus);

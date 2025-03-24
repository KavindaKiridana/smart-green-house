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

// Function to fetch and display data
function fetchData() {
    // Create a single database reference
    const dbRef = ref(db);

    // Get data from Firebase
    get(child(dbRef, "weatherParameters"))
        .then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();

                // Check if 'tap' key exists in the data
                if (data.tap !== undefined) {
                    // Set the checkbox state based on 'data.tap'
                    document.getElementById("waterSwitch").checked = data.tap === "true"; // Ensure "true" is a string
                    console.log("Water tap state:", data.tap);
                } else {
                    console.error("'tap' key not found in Firebase data.");
                }
            } else {
                console.error("No data found in Firebase.");
            }
        })
        .catch((error) => {
            console.error("Error reading data:", error);
        });
}

// Function to handle checkbox change event
let isUserInteraction = true;
function handleWaterSwitchChange(event) {
    // Only proceed if the change is user-initiated
    if (!isUserInteraction) return;

    console.log("Water tap switch state changed");
}

// Add event listener to the checkbox
document.getElementById("waterSwitch").addEventListener("change", handleWaterSwitchChange);

// Call the function immediately when the script loads
fetchData();


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

// Flag to track whether the checkbox change is user-initiated
let isUserInteraction = true;

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
                    // Disable user interaction flag while programmatically updating the checkbox
                    isUserInteraction = false;

                    // Set the checkbox state based on 'data.tap'
                    document.getElementById("waterSwitch").checked = data.tap === "true"; // Ensure "true" is a string
                    console.log("Water tap state:", data.tap);

                    // Re-enable user interaction flag after updating
                    isUserInteraction = true;
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
function handleWaterSwitchChange(event) {
    // Only proceed if the change is user-initiated
    if (!isUserInteraction) return;

    console.log("Water tap switch state changed by user.");

    // Show the formDiv
    const formDiv = document.getElementById("formDiv");
    formDiv.style.display = "flex"; // Make the form visible

    // Hide the formDiv after 1 minute (60000 milliseconds)
    setTimeout(() => {
        formDiv.style.display = "none"; // Hide the form
    }, 60000);
}

// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault(); // Prevent the form from submitting and refreshing the page

    // Get the values from the form inputs
    const hours = document.getElementById("hoursInput").value;
    const minutes = document.getElementById("minutesInput").value;

    // Log the values to the console
    console.log(`User entered time: ${hours} hours and ${minutes} minutes`);

    // Hide the formDiv after submission
    const formDiv = document.getElementById("formDiv");
    formDiv.style.display = "none";
}

// Add event listener to the checkbox
document.getElementById("waterSwitch").addEventListener("change", handleWaterSwitchChange);

// Add event listener to the form
document.getElementById("getTime").addEventListener("submit", handleFormSubmit);

// Hide the formDiv on page load
window.addEventListener("load", () => {
    const formDiv = document.getElementById("formDiv");
    formDiv.style.display = "none";
});

// Call the function immediately when the script loads
fetchData();
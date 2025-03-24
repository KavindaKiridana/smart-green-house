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

// Flag to track whether the checkbox change is user-initiated or programmatic
let isUserInteraction = true;
// Timer variable to manage the form visibility timeout
let formVisibilityTimer = null;
// Variable to store the user-selected time
let userSelectedTime = "";

// Function to fetch and display data from Firebase
function fetchData() {
    // Create a database reference
    const dbRef = ref(db);

    // Get data from Firebase
    get(child(dbRef, "weatherParameters"))
        .then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();

                // Check if 'tap' key exists in the data
                if (data.tap !== undefined) {
                    // Set flag to false to indicate this is a programmatic change, not user interaction
                    isUserInteraction = false;

                    // Set the checkbox state based on 'data.tap'
                    document.getElementById("waterSwitch").checked = data.tap === "true";
                    console.log("Water tap state (from Firebase):", data.tap);

                    // Re-enable user interaction flag after updating
                    setTimeout(() => {
                        isUserInteraction = true;
                    }, 100);
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
    // Only proceed if the change is user-initiated (not from Firebase data update)
    if (!isUserInteraction) {
        console.log("Checkbox change was programmatic, not showing form");
        return;
    }

    console.log("Water tap switch state changed by user interaction!");

    // Get the form div
    const formDiv = document.getElementById("formDiv");

    // Show the form
    formDiv.style.display = "block";
    console.log("Form displayed to user due to water switch interaction");

    // Clear any existing timer
    if (formVisibilityTimer) {
        clearTimeout(formVisibilityTimer);
    }

    // Set a timer to hide the form after 1 minute (60000 milliseconds)
    formVisibilityTimer = setTimeout(() => {
        formDiv.style.display = "none";
        console.log("Form hidden after 1 minute timeout");
    }, 60000);
}

// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault(); // Prevent the form from submitting normally and refreshing the page

    // Get the values from the form inputs
    const hours = document.getElementById("hoursInput").value;
    const minutes = document.getElementById("minutesInput").value;

    // Format the time as HH:MM with padding zeros if needed
    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    userSelectedTime = `${formattedHours}:${formattedMinutes}`;

    // Log the formatted time to the console
    console.log(`User entered time: ${userSelectedTime}`);

    // Hide the form div after submission
    const formDiv = document.getElementById("formDiv");
    formDiv.style.display = "none";
    console.log("Form hidden after submission");

    // Clear the timer since we're hiding the form manually
    if (formVisibilityTimer) {
        clearTimeout(formVisibilityTimer);
        formVisibilityTimer = null;
    }
}

// Initialize the page when DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM content loaded, initializing...");

    // Ensure form div is hidden on page load
    const formDiv = document.getElementById("formDiv");
    if (formDiv) {
        formDiv.style.display = "none";
        console.log("Form div hidden on initial page load");
    } else {
        console.error("Form div element not found");
    }

    // Add event listener to the checkbox for change events
    const waterSwitch = document.getElementById("waterSwitch");
    if (waterSwitch) {
        waterSwitch.addEventListener("change", handleWaterSwitchChange);
        console.log("Event listener added to water switch");
    } else {
        console.error("Water switch element not found");
    }

    // Add event listener to the form for submission events
    const getTimeForm = document.getElementById("getTime");
    if (getTimeForm) {
        getTimeForm.addEventListener("submit", handleFormSubmit);
        console.log("Event listener added to time form");
    } else {
        console.error("Get time form not found");
    }

    // Fetch initial data from Firebase
    fetchData();
    console.log("Initial Firebase data fetch requested");
});
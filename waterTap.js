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
// Timer variable to manage the timeout
let formVisibilityTimer = null;

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

    // Get the form div
    const formDiv = document.getElementById("formDiv");

    // Show the form
    formDiv.style.display = "block";

    // Clear any existing timer
    if (formVisibilityTimer) {
        clearTimeout(formVisibilityTimer);
    }

    // Hide the form after 1 minute (60000 milliseconds)
    formVisibilityTimer = setTimeout(() => {
        formDiv.style.display = "none";
        console.log("Form hidden after timeout");
    }, 60000);
}

// Function to handle form submission
function handleFormSubmit(event) {
    event.preventDefault(); // Prevent the form from submitting and refreshing the page

    // Get the values from the form inputs
    const hours = document.getElementById("hoursInput").value;
    const minutes = document.getElementById("minutesInput").value;

    // Format the time as HH:MM
    const formattedTime = `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;

    // Log the formatted time to the console
    console.log(`User entered time: ${formattedTime}`);

    // Hide the form div after submission
    const formDiv = document.getElementById("formDiv");
    formDiv.style.display = "none";

    // Clear the timer since we're hiding the form manually
    if (formVisibilityTimer) {
        clearTimeout(formVisibilityTimer);
        formVisibilityTimer = null;
    }
}

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
    // Initially hide the form div
    const formDiv = document.getElementById("formDiv");
    if (formDiv) {
        formDiv.style.display = "none";
        console.log("Form hidden on page load");
    } else {
        console.error("Form div element not found");
    }

    // Add event listener to the checkbox
    const waterSwitch = document.getElementById("waterSwitch");
    if (waterSwitch) {
        waterSwitch.addEventListener("change", handleWaterSwitchChange);
    } else {
        console.error("Water switch element not found");
    }

    // Add event listener to the form
    const getTimeForm = document.getElementById("getTime");
    if (getTimeForm) {
        getTimeForm.addEventListener("submit", handleFormSubmit);
    } else {
        console.error("Get time form not found");
    }

    // Fetch data from Firebase
    fetchData();
});
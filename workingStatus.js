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

// Use `let` instead of `const` to allow reassignment
let lastUpdatedTime = 0;

// Function to fetch and display data
function fetchData() {
    // Create a single database reference
    const dbRef = ref(db);

    // Get data from Firebase
    get(child(dbRef, "weatherParameters"))
        .then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                // Update lastUpdatedTime with the value from Firebase
                lastUpdatedTime = data.time;

                // Log the updated time
                console.log(lastUpdatedTime); // This will now log the correct time

                // Update the status badge to show success
                document.getElementById("status").innerHTML = '<i class="fas fa-check-circle me-2"></i> Working Well';
                document.getElementById("status").className = "status-badge status-success";
            } else {
                console.error("No data found!");
                // Update the status badge to show warning
                document.getElementById("status").innerHTML = '<i class="fas fa-times-circle me-2"></i> No data found!';
                document.getElementById("status").className = "status-badge status-warning";
            }
        })
        .catch((error) => {
            console.error("Error reading data:", error);
            // Update the status badge to show warning in case of an error
            document.getElementById("status").innerHTML = '<i class="fas fa-times-circle me-2"></i> Error fetching data!';
            document.getElementById("status").className = "status-badge status-warning";
        });
}

// Call the function immediately when the script loads
fetchData();

// Add auto-refresh functionality (every 60 seconds)
setInterval(fetchData, 60000);
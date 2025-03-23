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

    const outputElement2 = document.getElementById("tempValue");
    outputElement2.innerText = "Loading..."; // Show loading message

    const dbRef2 = ref(db);
    get(child(dbRef2, "weatherParameters"))
        .then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                // Display the fetched data in a formatted way
                outputElement2.innerText = `
                    Temperature: ${data.temp}°C
                `;
            } else {
                outputElement2.innerText = "No data found!";
            }
        })
        .catch((error) => {
            console.error("Error reading data:", error);
            outputElement2.innerText = `Error: ${error.message}`;
        });

    const outputElement3 = document.getElementById("humidityValue");
    outputElement3.innerText = "Loading..."; // Show loading message

    const dbRef3 = ref(db);
    get(child(dbRef, "weatherParameters"))
        .then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                // Display the fetched data in a formatted way
                outputElement3.innerText = `
                    Humidity: ${data.humidity}%
                    
                `;
            } else {
                outputElement3.innerText = "No data found!";
            }
        })
        .catch((error) => {
            console.error("Error reading data:", error);
            outputElement3.innerText = `Error: ${error.message}`;
        });

    const outputElemen4 = document.getElementById("soilValue");
    outputElement4.innerText = "Loading..."; // Show loading message

    const dbRef4 = ref(db);
    get(child(dbRef4, "weatherParameters"))
        .then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                // Display the fetched data in a formatted way
                outputElement4.innerText = `
                    Soil Moisture: ${data.moisture}%
                    
                `;
            } else {
                outputElement4.innerText = "No data found!";
            }
        })
        .catch((error) => {
            console.error("Error reading data:", error);
            outputElement4.innerText = `Error: ${error.message}`;
        });

    const outputElement5 = document.getElementById("lightValue");
    outputElement5.innerText = "Loading..."; // Show loading message

    const dbRef5 = ref(db);
    get(child(dbRef5, "weatherParameters"))
        .then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                // Display the fetched data in a formatted way
                outputElement5.innerText = `
                    Light: ${data.light} lux
                   
                `;
            } else {
                outputElement5.innerText = "No data found!";
            }
        })
        .catch((error) => {
            console.error("Error reading data:", error);
            outputElement5.innerText = `Error: ${error.message}`;
        });
}

// Call the function immediately when the script loads
fetchData();

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";

let firebaseConfig;
try {
    const configModule = await import('./config.js');
    firebaseConfig = configModule.firebaseConfig;
    if (!firebaseConfig || !firebaseConfig.apiKey) {
        throw new Error("Firebase configuration is invalid or missing apiKey.");
    }
} catch (error) {
    console.error("Failed to import Firebase configuration:", error);
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Function to fetch and update the water tap status
function updateWaterTapStatus() {
    const dbRef = ref(db, "weatherParameters/tap");
    get(dbRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                const tapState = snapshot.val();
                document.getElementById("waterSwitch").checked = tapState;
                console.log("Water tap state (from Firebase):", tapState);
            } else {
                console.error("No tap data found in Firebase.");
            }
        })
        .catch((error) => console.error("Error reading data:", error));
}

// Function to update Firebase when the checkbox is toggled
function handleWaterTapToggle() {
    const waterSwitch = document.getElementById("waterSwitch");
    waterSwitch.addEventListener("change", () => {
        const newState = waterSwitch.checked;
        const dbRef = ref(db, "weatherParameters/tap");
        set(dbRef, newState)
            .then(() => {
                console.log("Water tap state updated in Firebase:", newState);
            })
            .catch((error) => {
                console.error("Error updating tap state:", error);
                // Revert checkbox if update fails
                waterSwitch.checked = !newState;
            });
    });
}

// Fetch water tap status on page load
// window.addEventListener("load", () => {
//     updateWaterTapStatus();
//     handleWaterTapToggle();
// });

function fetchData() {
    updateWaterTapStatus();
    handleWaterTapToggle();
}
// Call the function immediately when the script loads
fetchData();
// Add auto-refresh functionality 
setInterval(fetchData, 1);
// 1 second = 1000 milliseconds, so 1 second interval is set for auto-refresh
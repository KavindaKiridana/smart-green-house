import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { firebaseConfig } from "./config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Reference to the Alerts div
const alertsDiv = document.getElementById("Alerts");
const alertsList = alertsDiv?.querySelector(".list-group");

// Function to format timestamp
function formatTimestamp(timestamp) {
    try {
        const date = new Date(timestamp);
        if (isNaN(date.getTime())) {
            console.error("Invalid timestamp:", timestamp);
            return "Unknown time";
        }
        const today = new Date();
        const isToday = date.toDateString() === today.toDateString();
        const timeStr = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        return isToday ? `Today, ${timeStr}` : `Yesterday, ${timeStr}`;
    } catch (error) {
        console.error("Error formatting timestamp:", error);
        return "Unknown time";
    }
}

// Function to update alerts
function updateAlerts(errors) {
    if (!alertsDiv || !alertsList) {
        console.error("Alerts div or list not found in the DOM");
        return;
    }

    alertsList.innerHTML = ""; // Clear existing alerts

    if (errors && errors.errors && Array.isArray(errors.errors) && errors.errors.length > 0) {
        // Show alerts div and populate with errors
        console.log("Showing alerts with", errors.errors.length, "errors");
        alertsDiv.style.display = "block";
        errors.errors.forEach((error) => {
            const [timestamp, message] = error.split(": ", 2);
            const alertType = "warning"; // Treat all errors as warnings
            const iconClass = "fas fa-exclamation-triangle text-warning";

            const li = document.createElement("li");
            li.className =
                "list-group-item bg-transparent text-light border-bottom border-dark d-flex justify-content-between align-items-center";
            li.innerHTML = `
                <div>
                    <i class="${iconClass} me-2"></i>
                    ${message || error}
                    <div class="text-muted small">${formatTimestamp(timestamp)}</div>
                </div>
                <span class="badge bg-${alertType} ${alertType === "warning" ? "text-dark" : ""}">${alertType.charAt(0).toUpperCase() + alertType.slice(1)}</span>
            `;
            alertsList.appendChild(li);
        });
    } else {
        // Hide alerts div if no errors
        console.log("Hiding alerts: No errors found");
        alertsDiv.style.display = "none";
    }
}

// Listen for database changes
const errorsRef = ref(db, "errors");
onValue(errorsRef, (snapshot) => {
    try {
        const data = snapshot.val();
        console.log("Firebase data received:", data);
        updateAlerts(data);
    } catch (error) {
        console.error("Error fetching Firebase data:", error);
        alertsDiv.style.display = "none"; // Hide on error to avoid confusion
    }
}, (error) => {
    console.error("Firebase onValue error:", error);
    alertsDiv.style.display = "none";
});
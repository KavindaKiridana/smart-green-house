// Two datetime strings
let pastTime = "2025-03-23 12:29:42";

// Get the current datetime
const now = new Date();
// Format date in local time (Sri Lanka)
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0');
const day = String(now.getDate()).padStart(2, '0');
const hours = String(now.getHours()).padStart(2, '0');
const minutes = String(now.getMinutes()).padStart(2, '0');
const seconds = String(now.getSeconds()).padStart(2, '0');

let currentTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

// Convert the strings into Date objects
let date1 = new Date(pastTime);
let date2 = new Date(currentTime);

// Subtract the two Date objects (result is in milliseconds)
let differenceInMilliseconds = date2 - date1;

// Convert the difference into meaningful units
let differenceInSeconds = differenceInMilliseconds / 1000; // Convert to seconds
let differenceInMinutes = differenceInSeconds / 60; // Convert to minutes
let differenceInHours = differenceInMinutes / 60; // Convert to hours
let differenceInDays = differenceInHours / 24; // Convert to days

// Output the results
console.log("Difference in milliseconds:", differenceInMilliseconds);
console.log("Difference in seconds:", differenceInSeconds);
console.log("Difference in minutes:", differenceInMinutes);
console.log("Difference in hours:", differenceInHours);
console.log("Difference in days:", differenceInDays);
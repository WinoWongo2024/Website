// Sample train data with real-time BST
let trainData = [
    { time: getCurrentBSTTimePlusMinutes(5), destination: "King's Cross", platform: "10", expected: "On time" },
    { time: getCurrentBSTTimePlusMinutes(10), destination: "Edinburgh", platform: "9", expected: "On time" },
    { time: getCurrentBSTTimePlusMinutes(15), destination: "York", platform: "8", expected: "On time" },
    { time: getCurrentBSTTimePlusMinutes(20), destination: "Leeds", platform: "7", expected: "On time" },
];

// Helper function to get current time in BST plus X minutes
function getCurrentBSTTimePlusMinutes(minutes) {
    const now = new Date();
    const bstOffset = 60; // BST is UTC+1
    now.setMinutes(now.getMinutes() + minutes);
    return now.toTimeString().split(' ')[0].slice(0, 5); // Returns HH:MM format
}

// Function to get the current time in BST
function getCurrentTimeBST() {
    const now = new Date();
    const offset = now.getTimezoneOffset(); // Get the local timezone offset
    const bstOffset = 60; // BST is UTC+1
    const bstTime = new Date(now.getTime() + (offset + bstOffset) * 60000); // Adjust for BST

    return bstTime.toTimeString().split(' ')[0].slice(0, 5); // Returns time in HH:MM
}

// Function to display the current BST time
function displayCurrentTime() {
    const currentTimeEl = document.getElementById('current-time');
    currentTimeEl.textContent = `Current Time (BST): ${getCurrentTimeBST()}`;
}

// Function to render the departure board
function renderBoard() {
    const boardContent = document.getElementById("board-content");
    boardContent.innerHTML = ''; // Clear the previous content

    trainData.forEach((train, index) => {
        let row = document.createElement('tr');
        const currentTime = getCurrentTimeBST();

        // If the train has passed, remove it from the board
        if (train.time < currentTime) {
            // Keep train for an extra minute, then remove
            const timeDifference = new Date(`1970-01-01T${currentTime}:00Z`) - new Date(`1970-01-01T${train.time}:00Z`);
            if (timeDifference > 60000) {
                return; // Train has passed over 1 minute ago, remove from the board
            }
        }

        if (train.expected === "Cancelled") {
            row.classList.add('cancelled');
        } else if (train.expected !== "On time" && train.expected !== train.time) {
            row.classList.add('delayed');
        }

        row.innerHTML = `
            <td>${train.time}</td>
            <td>${train.destination}</td>
            <td>${train.platform}</td>
            <td>${train.expected}</td>
        `;

        boardContent.appendChild(row);
    });
}

// Simulate train delays and cancellations (replace with real API data)
function updateTrainData() {
    trainData = trainData.map(train => {
        const currentTime = getCurrentTimeBST();
        // If the train is not on time, randomly delay or cancel
        if (Math.random() > 0.9) {
            train.expected = "Cancelled";
        } else if (Math.random() > 0.7 && train.expected === "On time" && train.time > currentTime) {
            // Simulate a delay
            let delayMinutes = Math.floor(Math.random() * 5) + 1;
            let newTime = new Date(`1970-01-01T${train.time}:00Z`);
            newTime.setMinutes(newTime.getMinutes() + delayMinutes);
            train.expected = newTime.toTimeString().split(' ')[0].slice(0, 5); // Update expected time with delay
        }
        return train;
    });

    renderBoard();
}

// Initialize the board and set up real-time updates
function init() {
    renderBoard();
    displayCurrentTime();

    // Update train data every 30 seconds
    setInterval(updateTrainData, 30000);

    // Update the current time every second
    setInterval(displayCurrentTime, 1000);
}

// Start the board when the page loads
window.onload = init;

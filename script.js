// Sample data for real-time update simulation
let trainData = [
    { time: "04:50", destination: "London Kings Cross", platform: "10", expected: "On time" },
    { time: "05:05", destination: "Edinburgh Waverley", platform: "9", expected: "Delayed" },
    { time: "05:15", destination: "Leeds", platform: "8", expected: "On time" },
    { time: "05:25", destination: "Manchester Piccadilly", platform: "7", expected: "On time" },
];

// Function to render the board
function renderBoard() {
    const boardContent = document.getElementById("board-content");
    boardContent.innerHTML = ''; // Clear the previous content

    trainData.forEach((train, index) => {
        let row = document.createElement('tr');
        if (train.expected === "Cancelled") {
            row.classList.add('cancelled');
        } else if (train.expected === "Delayed") {
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

// Simulate delay and cancellation logic (real logic would be based on an API)
function updateTrainData() {
    // Randomly update trains
    trainData = trainData.map(train => {
        // Simulate delays and cancellations
        if (Math.random() > 0.8) {
            train.expected = "Cancelled";
        } else if (Math.random() > 0.6) {
            train.expected = "Delayed";
        } else {
            train.expected = "On time";
        }
        return train;
    });

    renderBoard();
}

// Render board initially
renderBoard();

// Update the board every 30 seconds to simulate real-time updates
setInterval(updateTrainData, 30000);

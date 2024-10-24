
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

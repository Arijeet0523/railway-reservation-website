document.addEventListener('DOMContentLoaded', function () {
    // Set today's date as the default date
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').value = today;

    // Sample train data
    const trainData = {
        express: { name: 'Express Train', departure: 'City A', destination: 'City B' },
        local: { name: 'Local Train', departure: 'City X', destination: 'City Y' },
        bullet: { name: 'Bullet Train', departure: 'City P', destination: 'City Q' }
    };

    const trainSelect = document.getElementById('trainSelect');
    const trainName = document.getElementById('trainName');
    const departureInput = document.getElementById('departure');
    const destinationInput = document.getElementById('destination');
    const passengerCountInput = document.getElementById('passengerCount');
    const passengerDetailsContainer = document.getElementById('passengerDetails');
    // Update departure and destination based on the selected train
    trainSelect.addEventListener('change', function () {
        const selectedTrain = trainSelect.value;
        if (selectedTrain && trainData[selectedTrain]) {
            departureInput.value = trainData[selectedTrain].departure;
            destinationInput.value = trainData[selectedTrain].destination;
        } else {
            departureInput.value = '';
            destinationInput.value = '';
        }
    });
    passengerCountInput.addEventListener('input', function () {
        const passengerCount = parseInt(passengerCountInput.value, 10);
        generatePassengerFields(passengerCount);
    });
});
function generatePassengerFields() {
    const passengerCount = document.getElementById('passengerCount').value;
    const passengerDetailsDiv = document.getElementById('passengerDetails');
    passengerDetailsDiv.innerHTML = '';

    for (let i = 1; i <= passengerCount; i++) {
        const nameLabel = document.createElement('label');
        nameLabel.textContent = `Passenger ${i} Name:`;
        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.id = `passenger${i}Name`;
        nameInput.required = true;

        const ageLabel = document.createElement('label');
        ageLabel.textContent = `Passenger ${i} Age:`;
        const ageInput = document.createElement('input');
        ageInput.type = 'number';
        ageInput.id = `passenger${i}Age`;
        ageInput.required = true;

        passengerDetailsDiv.appendChild(nameLabel);
        passengerDetailsDiv.appendChild(nameInput);
        passengerDetailsDiv.appendChild(ageLabel);
        passengerDetailsDiv.appendChild(ageInput);
    }
}

function makeReservation() {
    const trainName = document.getElementById('trainName').value;
    const departure = document.getElementById('departure').value;
    const destination = document.getElementById('destination').value;
    const date = document.getElementById('date').value;
    const passengerCount = document.getElementById('passengerCount').value;
    const selectedClass = document.getElementById('class').value;
    // const specialServices = document.getElementById('specialServices').checked;
    const passengerDetails = getPassengerDetails();
    const reservationData = {
        trainName,
        departure,
        destination,
        date,
        passengerCount,
        selectedClass,
        passengerDetails
        // specialServices
    };

    // Store the reservation in localStorage (simulate data storage)
    localStorage.setItem('reservation', JSON.stringify(reservationData));

    const reservationResult = document.getElementById('reservationResult');
    const formattedDate = new Date(date).toDateString();
    const confirmationMessage = `Reservation Successful!\nTrain: ${trainName}\nDeparture: ${departure}\nDestination: ${destination}\nDate: ${formattedDate}\nPassengers: ${passengerCount}\nClass: ${selectedClass}\n`;

    // Display confirmation message
    reservationResult.innerHTML = confirmationMessage;
}

function checkBookingStatus() {
    const reservationResult = document.getElementById('reservationResult');
    const currentReservation = reservationResult.innerHTML;

    if (currentReservation.trim() === '') {
        alert('No reservation made yet. Please make a reservation first.');
    } else {
        alert(`Current Reservation Status:\n${currentReservation}`);
    }
}
function getPassengerDetails() {
    const passengerCount = document.getElementById('passengerCount').value;
    const passengerDetails = [];

    for (let i = 1; i <= passengerCount; i++) {
        const nameInput = document.getElementById(`passenger${i}Name`);
        const ageInput = document.getElementById(`passenger${i}Age`);

        console.log(nameInput, ageInput); // Log inputs to check if they are valid

        if (nameInput && ageInput) {
            passengerDetails.push({
                name: nameInput.value,
                age: ageInput.value
            });
        }
    }

    console.log('Passenger Details:', passengerDetails); // Log the collected details
    return passengerDetails;
}

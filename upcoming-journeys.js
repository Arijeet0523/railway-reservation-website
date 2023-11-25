document.addEventListener('DOMContentLoaded', function () {
    displayUpcomingJourneys();
});

function displayUpcomingJourneys() {
    const upcomingJourneysContainer = document.getElementById('upcomingJourneys');
    const reservationDataString = localStorage.getItem('reservation');

    if (!reservationDataString) {
        upcomingJourneysContainer.innerHTML = '<p>No upcoming journeys</p>';
        return;
    }

    const reservationData = JSON.parse(reservationDataString);
    console.log('Reservation Data:', reservationData);
    const formattedDate = new Date(reservationData.date).toDateString();
    console.log('Passenger Details:', reservationData.passengerDetails);
    const journeyDetails = `
        <h2></h2>
        <p><strong>Train:</strong> ${reservationData.trainName}</p>
        <p><strong>Departure:</strong> ${reservationData.departure}</p>
        <p><strong>Destination:</strong> ${reservationData.destination}</p>
        <p><strong>Date:</strong> ${formattedDate}</p>
        <p><strong>Passengers:</strong> ${reservationData.passengerCount}</p>
        <p><strong>Class:</strong> ${reservationData.selectedClass}</p>
        
    `;
    const passengerList = document.createElement('ul');
    if (Array.isArray(reservationData.passengerDetails)) {
        reservationData.passengerDetails.forEach((passenger, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = `Passenger Name: ${index + 1}: ${passenger.name}, Age: ${passenger.age}`;
            passengerList.appendChild(listItem);
            
        });
    } else {
        console.error('Invalid passenger details format:', reservationData.passengerDetails);
    }
    
    upcomingJourneysContainer.innerHTML = ''; // Clear previous content
    upcomingJourneysContainer.appendChild(document.createElement('hr')); // Add a horizontal line for separation
    upcomingJourneysContainer.innerHTML = journeyDetails;
    upcomingJourneysContainer.appendChild(passengerList);
}
function getPassengerDetails() {
    const passengerCount = document.getElementById('passengerCount').value;
    const passengerDetails = [];

    for (let i = 1; i <= passengerCount; i++) {
        const nameInput = document.getElementById(`passenger${i}Name`);
        const ageInput = document.getElementById(`passenger${i}Age`);

        if (nameInput && ageInput) {
            passengerDetails.push({
                name: nameInput.value,
                age: ageInput.value
            });
        }
    }

    return passengerDetails;
}
// script.js - Updated to connect to the backend API

document.addEventListener('DOMContentLoaded', function() {
    // Set today's date as the default value
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    document.getElementById('travelDate').value = formattedDate;
    
    // Search form submission
    document.getElementById('busSearchForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const startPoint = document.getElementById('startPoint').value.trim();
        const destination = document.getElementById('destination').value.trim();
        const travelDate = document.getElementById('travelDate').value;
        
        // Show loading indicator
        document.getElementById('loadingIndicator').style.display = 'block';
        document.getElementById('resultsContainer').style.display = 'none';
        document.getElementById('noResults').style.display = 'none';
        
        // Fetch buses from the API
        fetchBuses(startPoint, destination, travelDate);
    });
    
    // Function to fetch buses from the API
    async function fetchBuses(startPoint, destination, date) {
        try {
            const response = await fetch(`/api/buses/search?startPoint=${encodeURIComponent(startPoint)}&destination=${encodeURIComponent(destination)}&date=${encodeURIComponent(date)}`);
            
            // Hide loading indicator
            document.getElementById('loadingIndicator').style.display = 'none';
            
            if (!response.ok) {
                throw new Error('No buses found');
            }
            
            const buses = await response.json();
            
            // Clear previous results
            document.getElementById('busList').innerHTML = '';
            
            if (buses && buses.length > 0) {
                // Update route title
                document.getElementById('routeTitle').textContent = 
                    `Buses from ${capitalize(startPoint)} to ${capitalize(destination)}`;
                
                // Create bus items
                buses.forEach(bus => {
                    const busItem = createBusItem(bus);
                    document.getElementById('busList').appendChild(busItem);
                });
                
                // Show results
                document.getElementById('resultsContainer').style.display = 'block';
            } else {
                // Show no results message
                document.getElementById('noResults').style.display = 'block';
            }
        } catch (error) {
            console.error('Error fetching buses:', error);
            document.getElementById('noResults').style.display = 'block';
        }
    }
    
    // Function to create a bus item element
    function createBusItem(bus) {
        const busItem = document.createElement('div');
        busItem.className = 'bus-item';
        
        const busIcon = document.createElement('div');
        busIcon.className = 'bus-icon';
        busIcon.textContent = bus.name.charAt(0);
        
        const busDetails = document.createElement('div');
        busDetails.className = 'bus-details';
        
        const busName = document.createElement('h3');
        busName.className = 'bus-name';
        busName.textContent = bus.name;
        
        const busInfo = document.createElement('div');
        busInfo.className = 'bus-info';
        
        const departureTime = document.createElement('div');
        departureTime.innerHTML = `<i>🕒</i> Departs: ${bus.departureTime}`;
        
        const arrivalTime = document.createElement('div');
        arrivalTime.innerHTML = `<i>🕒</i> Arrives: ${bus.arrivalTime}`;
        
        const duration = document.createElement('div');
        duration.innerHTML = `<i>⏱️</i> Duration: ${bus.duration}`;
        
        busInfo.appendChild(departureTime);
        busInfo.appendChild(arrivalTime);
        busInfo.appendChild(duration);
        
        busDetails.appendChild(busName);
        busDetails.appendChild(busInfo);
        
        const busActions = document.createElement('div');
        busActions.className = 'bus-actions';
        
        const selectButton = document.createElement('button');
        selectButton.className = 'select-btn';
        selectButton.textContent = 'Select';
        selectButton.addEventListener('click', () => {
            alert(`You selected ${bus.name} departing at ${bus.departureTime}`);
            // Here you could implement ticket booking functionality
        });
        
        busActions.appendChild(selectButton);
        
        busItem.appendChild(busIcon);
        busItem.appendChild(busDetails);
        busItem.appendChild(busActions);
        
        return busItem;
    }
    
    // Helper function to capitalize first letter
    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
});
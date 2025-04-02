// Set today's date as the default value for the date input
document.addEventListener('DOMContentLoaded', function() {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    document.getElementById('travelDate').value = formattedDate;
    
    // Mock data for demonstration
    const busRoutes = [
        {
            startPoint: "downtown",
            destination: "airport",
            buses: [
                { id: 1, name: "Express X1", departureTime: "07:30", arrivalTime: "08:15", duration: "45 min" },
                { id: 2, name: "Airport Shuttle", departureTime: "08:00", arrivalTime: "08:55", duration: "55 min" },
                { id: 3, name: "Express X1", departureTime: "08:30", arrivalTime: "09:15", duration: "45 min" }
            ]
        },
        {
            startPoint: "downtown",
            destination: "university",
            buses: [
                { id: 4, name: "Route 42", departureTime: "07:15", arrivalTime: "07:45", duration: "30 min" },
                { id: 5, name: "Campus Express", departureTime: "07:45", arrivalTime: "08:10", duration: "25 min" }
            ]
        },
        {
            startPoint: "suburb",
            destination: "downtown",
            buses: [
                { id: 6, name: "City Link", departureTime: "06:30", arrivalTime: "07:15", duration: "45 min" },
                { id: 7, name: "Commuter 99", departureTime: "07:00", arrivalTime: "07:40", duration: "40 min" },
                { id: 8, name: "Commuter 99", departureTime: "07:30", arrivalTime: "08:10", duration: "40 min" }
            ]
        },
        {
            startPoint: "mall",
            destination: "beach",
            buses: [
                { id: 9, name: "Coastal Line", departureTime: "09:00", arrivalTime: "09:45", duration: "45 min" },
                { id: 10, name: "Beach Express", departureTime: "10:30", arrivalTime: "11:05", duration: "35 min" }
            ]
        }
    ];
    
    // Search form submission
    document.getElementById('busSearchForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const startPoint = document.getElementById('startPoint').value.trim().toLowerCase();
        const destination = document.getElementById('destination').value.trim().toLowerCase();
        
        // Show loading indicator
        document.getElementById('loadingIndicator').style.display = 'block';
        document.getElementById('resultsContainer').style.display = 'none';
        document.getElementById('noResults').style.display = 'none';
        
        // Simulate API call delay
        setTimeout(() => {
            // Find matching route
            const foundRoute = busRoutes.find(route => 
                route.startPoint.includes(startPoint) && 
                route.destination.includes(destination)
            );
            
            // Clear previous results
            document.getElementById('busList').innerHTML = '';
            
            // Hide loading indicator
            document.getElementById('loadingIndicator').style.display = 'none';
            
            if (foundRoute && foundRoute.buses.length > 0) {
                // Update route title
                document.getElementById('routeTitle').textContent = 
                    `Buses from ${capitalize(startPoint)} to ${capitalize(destination)}`;
                
                // Create bus items
                foundRoute.buses.forEach(bus => {
                    const busItem = createBusItem(bus);
                    document.getElementById('busList').appendChild(busItem);
                });
                
                // Show results
                document.getElementById('resultsContainer').style.display = 'block';
            } else {
                // Show no results message
                document.getElementById('noResults').style.display = 'block';
            }
        }, 1500); // Simulate 1.5 second API delay
    });
    
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
/* // Initialize Leaflet map
const map = L.map('map').setView([20.5937, 78.9629], 5);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
}).addTo(map);

// Add marker with pop-up
const marker = L.marker([20.5937, 78.9629]).addTo(map);
marker.bindPopup("Welcome to India!").openPopup();

// Add custom interaction
map.on('click', function (e) {
    const { lat, lng } = e.latlng;
    L.marker([lat, lng]).addTo(map)
        .bindPopup(`Latitude: ${lat.toFixed(2)}, Longitude: ${lng.toFixed(2)}`)
        .openPopup();
}); */

// Initialize Leaflet map with India as the main location
const map = L.map('map').setView([20.5937, 78.9629], 5);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
}).addTo(map);

// Add a marker for India with a pop-up
const indiaMarker = L.marker([20.5937, 78.9629]).addTo(map);
indiaMarker.bindPopup("Welcome to India!").openPopup();

// Add custom interaction to fetch place names on click
map.on('click', async function (e) {
    const { lat, lng } = e.latlng;

    // Fetch the place name using the Nominatim API
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
    const data = await response.json();

    const placeName = data.display_name || "Unknown location";

    // Add a new marker with the place name
    const newMarker = L.marker([lat, lng]).addTo(map)
        .bindPopup(`<b>Place:</b> ${placeName}<br><b>Coordinates:</b> ${lat.toFixed(2)}, ${lng.toFixed(2)}`)
        .openPopup();
        console.log(`Marked place : ${placeName}`)

    // Automatically delete the marker after 30 seconds
    setTimeout(() => {
        map.removeLayer(newMarker); // Remove the new marker
        console.log("Marker deleted after 30 seconds");
    }, 30000);
});


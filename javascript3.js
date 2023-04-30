// Create a Leaflet map centered on Paris
var map = L.map('map').setView([48.864716, 2.349014], 12);

// Add a base layer to the map using OpenStreetMap
var osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Load the neighborhoods GeoJSON data and add it to the map
var neighborhoodsLayer = L.geoJSON(null, {
  style: {
    color: 'blue',
    weight: 2
  }
}).addTo(map);
fetch('quartier_paris.geojson')
  .then(response => response.json())
  .then(data => neighborhoodsLayer.addData(data));

// Load the shops GeoJSON data and add it to the map
var shopsLayer = L.geoJSON(null, {
  pointToLayer: function (feature, latlng) {
    var color;
    
    return L.circleMarker(latlng, {
      radius: 5,
      fillColor: color,
      fillOpacity: 1,
      stroke: false
    });
  }
});
fetch('commerces.geojson')
  .then(response => response.json())
  .then(data => shopsLayer.addData(data))

// Define a variable to store the selected shop type
let selectedShopType = 'all';

// Add an event listener to the dropdown list
document.getElementById('shop-type').addEventListener('change', function (event) {
  // Update the selected shop type variable
  selectedShopType = event.target.value;

  // Recalculate the statistics for the selected shops
  updateStatistics();
});
// Define the URLs for the GeoJSON files
const geoJsonUrl1 = "commerces.json";
const geoJsonUrl2 = "quartier_paris.json";

// Load the GeoJSON data using AJAX requests
const xhr1 = new XMLHttpRequest();
xhr1.open("GET", geoJsonUrl1);
xhr1.responseType = "json";
xhr1.onreadystatechange = function () {
  if (xhr1.readyState === XMLHttpRequest.DONE) {
    if (xhr1.status === 200) {
      const geoJsonData1 = xhr1.response;
      // Process the first GeoJSON data here
      console.log(geoJsonData1);
    } else {
      console.error("Error loading GeoJSON 1:", xhr1.status);
    }
  }
};
xhr1.send();

const xhr2 = new XMLHttpRequest();
xhr2.open("GET", geoJsonUrl2);
xhr2.responseType = "json";
xhr2.onreadystatechange = function () {
  if (xhr2.readyState === XMLHttpRequest.DONE) {
    if (xhr2.status === 200) {
      const geoJsonData2 = xhr2.response;
      // Process the second GeoJSON data here
      console.log(geoJsonData2);
    } else {
      console.error("Error loading GeoJSON 2:", xhr2.status);
    }
  }
};
xhr2.send();

// Define a function to make an AJAX request to the PHP file and update the statistics
function updateStatistics() {
  // Make an AJAX request to the PHP file
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'mydata.php', true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // Parse the JSON response
      var response = JSON.parse(xhr.responseText);

      // Update the HTML elements with the calculated statistics
      document.getElementById('websiteDensity').textContent = 'Website density: ' + response.websiteDensity;
      document.getElementById('deliveryShops').textContent = 'Delivery shops: ' + response.deliveryShops;
      document.getElementById('parisianShops').textContent = 'Parisian shops: ' + response.parisianShops;
      document.getElementById('pickupShops').textContent = 'Pickup shops: ' + response.pickupShops;
    }
  };
  xhr.send();
}

// Call the function to update the statistics
updateStatistics();



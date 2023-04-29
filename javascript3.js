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
    switch (feature.properties.type_de_commerce) {
      case 'Épicerie fine':
        color = 'blue';
        break;
      case 'Primeure':
        color = 'brown';
        break;
      case 'Fleuriste':
        color = 'green';
        break;
      case 'Alimentation générale et produits de première nécessité':
        color = 'purple';
        break;
      case 'Articles médicaux et orthopédiques':
        color = 'pink';
        break;
      case "Artisanat d'art":
        color = 'red';
        break;
      case "Blanchisserie-teinturerie":
        color = 'orange';
        break;
      case "Boucherie - charcuterie - rôtisserie":
        color = 'black';
        break;
      case "Boulangerie - pâtisserie":
        color = 'grey';
        break;
      case "Bricolage":
        color = 'white';
        break;
      case "Caviste - Brasserie":
        color = 'yellow';
        break;
      case "Chocolaterie - Pâtisserie":
        color = 'gold';
        break;
      case "Cosmétique":
        color = 'teal';
        break;
      case "Disquaire":
        color = 'lime';
        break;
      case "Equipement informatique":
        color = 'Navy';
        break;
      case "Fromagerie":
        color = 'Chocolate';
        break;
      case "Jouets - Jeux":
        color = 'DarkRed';
        break;
      case "Librairie":
        color = 'LightCoral';
        break;
      case "Matériels de télécommunication":
        color = 'lightsalmon';
      case "Pharamacies et parapharmacies":
        color = 'DarkKhaki';
        break;
      case "Poissonerie":
        color = 'PaleTurquoise';
        break;
      case "Presse et papeterie":
        color = 'Tan';
        break;
      case "Restaurant ou traiteur":
        color = 'MistyRose';
        break;
      case "Librairie":
        color = 'Maroon';
        break;
      case "Autre":
        color = 'MistyRose';
        break;
      default:
        color = 'Olive';
    }
    return L.circleMarker(latlng, {
      radius: 5,
      fillColor: color,
      fillOpacity: 1,
      stroke: false
    });
  }
}).addTo(map);
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
  const selectedShops = calculateStatistics();

  // Calculate the statistics for the selected shops
  const surfaceDensity = calculateSurfaceDensity(selectedShops, neighborhoodsLayer);
  const websiteDensity = calculateWebsiteDensity(selectedShops);

  // Update the HTML elements with the calculated statistics
  surfaceDensityElement.textContent = `Surface density: ${surfaceDensity}`;
  websiteDensityElement.textContent = `Website density: ${websiteDensity}`;
});

// Modify the calculateStatistics() function to only include shops of the selected type
function calculateStatistics() {
  // Get the selected shops from the GeoJSON data
  const selectedShops = shopsLayer.getLayers().filter(function (layer) {
    if (selectedShopType === 'all') {
      // Include all shops if 'All' is selected
      return true;
    } else {
      // Only include shops of the selected type
      return layer.feature.properties.type_de_commerce === selectedShopType;
    }
  });

  return selectedShops;
}

// Define functions to calculate the statistics
function calculateSurfaceDensity(selectedShops, neighborhoodsLayer) {
  if (!Array.isArray(neighborhoodsLayer)) {
    return 0; // or some other default value
  }
  const totalArea = neighborhoodsLayer.reduce((sum, neighborhood) => sum + neighborhood.properties.area, 0);
  const totalSelectedArea = selectedShops.reduce((sum, shop) => sum + turf.area(shop), 0);
  return totalSelectedArea / totalArea;
}

function calculateWebsiteDensity(selectedShops) {
  const totalSelectedShops = selectedShops.length;
  console.log("___", selectedShops);
  const totalSelectedShopsWithoutWebsite = selectedShops.reduce((sum, shop) => sum + (shop.properties.website ?? false ? 0 : 1), 0);
  return totalSelectedShopsWithoutWebsite / totalSelectedShops;
} // test

// Get references to the HTML elements
const surfaceDensityElement = document.getElementById("surfaceDensity");
const websiteDensityElement = document.getElementById("websiteDensity");

// Define a function to update the HTML elements with the calculated statistics
function updateStatistics() {
  // Recalculate the statistics for the selected shops
  const selectedShops = calculateStatistics();

  // Calculate the statistics for the selected shops
  const surfaceDensity = calculateSurfaceDensity(selectedShops, neighborhoodsLayer);
  const websiteDensity = calculateWebsiteDensity(selectedShops);

  // Update the HTML elements with the calculated statistics
  surfaceDensityElement.textContent = `Surface density: ${surfaceDensity}`;
  websiteDensityElement.textContent = `Website density: ${websiteDensity}`;
}

function updateStatistics() {
  // Recalculate the statistics for the selected shops
  const selectedShops = calculateStatistics();

  // Calculate the statistics for the selected shops
  const surfaceDensity = calculateSurfaceDensity(selectedShops, neighborhoodsLayer);
  const websiteDensity = calculateWebsiteDensity(selectedShops);

  // Get references to the HTML elements
  const surfaceDensityElement = document.getElementById("surfaceDensity");
  const websiteDensityElement = document.getElementById("websiteDensity");

  // Update the HTML elements with the calculated statistics
  surfaceDensityElement.textContent = `Surface density: ${surfaceDensity}`;
  websiteDensityElement.textContent = `Website density: ${websiteDensity}`;
}




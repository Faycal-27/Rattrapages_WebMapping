<?php
// Database connection parameters
$host = 'localhost';
$username = 'postgres';
$password = 'usercode';
$database = 'postgres';

$conn_string = "host=$host dbname=$database user=$username password=$password";

$conn = pg_connect($conn_string);

// Check connection
if (!$conn) {
    echo "Failed to connect to database";
} else {
    echo "Connected successfully";
}

// Create the shops table
pg_query($conn, "CREATE TABLE shops (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    address VARCHAR(255),
    postal_code VARCHAR(5),
    type VARCHAR(255),
    made_in_paris BOOLEAN,
    services VARCHAR(255),
    description TEXT,
    website VARCHAR(255),
    phone VARCHAR(20),
    email VARCHAR(255),
    latitude FLOAT,
    longitude FLOAT
)");

// Load the GeoJSON data for shops
$shops_data = json_decode(file_get_contents('commerces.geojson'), true);

// Insert each shop into the database
foreach ($shops_data['features'] as $shop) {
    $name = pg_escape_string($shop['properties']['nom_du_commerce']);
    $address = pg_escape_string($shop['properties']['adresse']);
    $postal_code = pg_escape_string($shop['properties']['code_postal']);
    $type = pg_escape_string($shop['properties']['type_de_commerce']);
    $made_in_paris = ($shop['properties']['fabrique_a_paris'] == 'oui') ? 'true' : 'false';
    $services = pg_escape_string($shop['properties']['services']);
    $description = pg_escape_string($shop['properties']['description']);
    $website = pg_escape_string($shop['properties']['site_internet']);
    $phone = pg_escape_string($shop['properties']['telephone']);
    $email = pg_escape_string($shop['properties']['mail']);
    $latitude = $shop['geometry']['coordinates'][1];
    $longitude = $shop['geometry']['coordinates'][0];
    $query = "INSERT INTO shops (name, address, postal_code, type, made_in_paris, services, description, website, phone, email, latitude, longitude)
          VALUES ('$name', '$address', '$postal_code', '$type', $made_in_paris, '$services', '$description', '$website', '$phone', '$email', '$latitude', '$longitude')";
    pg_query($conn, $query);
}

// Ensure the PostGIS extension is available
pg_query($conn, "CREATE EXTENSION IF NOT EXISTS postgis");

// Create the neighbors table
pg_query($conn, "CREATE TABLE neighbors (
    id SERIAL PRIMARY KEY,
    geometry GEOMETRY(Polygon, 4326)
)");

// Load the GeoJSON data for neighbors
$neighbors_data = json_decode(file_get_contents('quartier_paris.geojson'), true);

// Insert each neighbor into the database
foreach ($neighbors_data['features'] as $neighbor) {
    $geometry = json_encode($neighbor['geometry']);
    $query = "INSERT INTO neighbors (geometry)
              VALUES (ST_SetSRID(ST_GeomFromGeoJSON('$geometry'), 4326))";
    pg_query($conn, $query);
}

// Query to retrieve neighborhoods data
$neighborhoodsQuery = "SELECT * FROM neighbors";
$neighborhoodsResult = pg_query($conn, $neighborhoodsQuery);
$neighborhoodsData = pg_fetch_all($neighborhoodsResult, PGSQL_ASSOC);

// Query to retrieve shops data
$shopsQuery = "SELECT * FROM shops";
$shopsResult = pg_query($conn, $shopsQuery);
$shopsData = pg_fetch_all($shopsResult, PGSQL_ASSOC);

// Close the database connection
pg_close($conn);

// Calculate the statistics
$websiteDensity = calculateWebsiteDensity($shopsData);
$deliveryShops = calculateDeliveryShops($shopsData);
$parisianShops = calculateParisianShops($shopsData);
$pickupShops = calculatePickupShops($shopsData);

// Prepare the response as an associative array
$response = array(
    'websiteDensity' => $websiteDensity,
    'deliveryShops' => $deliveryShops,
    'parisianShops' => $parisianShops,
    'pickupShops' => $pickupShops
);

// Convert the response to JSON format
$jsonResponse = json_encode($response);

// Send the JSON response
header('Content-Type: application/json');
echo $jsonResponse;

// Function to calculate website density
function calculateWebsiteDensity($shops) {
    $totalShops = count($shops);
    $totalShopsWithoutWebsite = 0;

    foreach ($shops as $shop) {
        if (empty($shop['website'])) {
            $totalShopsWithoutWebsite++;
        }
    }

    return $totalShopsWithoutWebsite / $totalShops;
}

// Function to calculate the number of delivery shops
function calculateDeliveryShops($shops) {
    $totalDeliveryShops = 0;

    foreach ($shops as $shop) {
        if (stripos($shop['services'], 'Livraisons') !== false) {
            $totalDeliveryShops++;
        }
    }

    return $totalDeliveryShops;
}

// Function to calculate the number of Parisian shops
function calculateParisianShops($shops) {
    $totalParisianShops = 0;

    foreach ($shops as $shop) {
        if ($shop['made_in_paris'] == true) {
            $totalParisianShops++;
        }
    }

    return $totalParisianShops;
}

// Function to calculate the number of pickup shops
function calculatePickupShops($shops) {
    $totalPickupShops = 0;

    foreach ($shops as $shop) {
        if (stripos($shop['services'], 'Retrait') !== false) {
            $totalPickupShops++;
        }
    }

    return $totalPickupShops;
}
?>


<?php
// Database connection parameters
$host = 'localhost';
$username = 'postgres';
$password = 'postgres';
$database = 'paris';

// Connect to PostgreSQL database
$conn = pg_connect("host=$host dbname=$database user=$username password=$password");

// Check connection
if (!$conn) {
    die("Connection failed: " . pg_last_error());
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


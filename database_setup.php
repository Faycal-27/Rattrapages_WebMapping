<?php

// Connect to the database
$dbconn = pg_connect("host=localhost dbname=postgres user=postgres");

// Check connection and display error message if applicable
if (!$dbconn) {
    $errorMessage = pg_last_error();
    die("Connection failed: $errorMessage");
}

// Create the shops table
pg_query($dbconn, "CREATE TABLE shops (
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
    $made_in_paris = $shop['properties']['fabrique_a_paris'] == 'oui' ? true : false;
    $services = pg_escape_string($shop['properties']['services']);
    $description = pg_escape_string($shop['properties']['description']);
    $website = pg_escape_string($shop['properties']['site_internet']);
    $phone = pg_escape_string($shop['properties']['telephone']);
    $email = pg_escape_string($shop['properties']['mail']);
    $latitude = $shop['geometry']['coordinates'][1];
    $longitude = $shop['geometry']['coordinates'][0];
    $query = "INSERT INTO shops (name, address, postal_code, type, made_in_paris, services, description, website, phone, email, latitude, longitude)
              VALUES ('$name', '$address', '$postal_code', '$type', '$made_in_paris', '$services', '$description', '$website', '$phone', '$email', '$latitude', '$longitude')";
    pg_query($dbconn, $query);
}

// Create the neighbors table
pg_query($dbconn, "CREATE TABLE neighbors (
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
    pg_query($dbconn, $query);
}

// Close the database connection
pg_close($dbconn);

?>

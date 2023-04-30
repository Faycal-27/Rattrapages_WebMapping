<?php

// Database connection parameters
$host = 'localhost';
$username = 'postgres';
$database = 'WebMapping';
$password = "postgres";

// Connect to PostgreSQL database
$conn = pg_connect("host=$host dbname=$database user=$username password=$password");

// Check connection and display error message if applicable
if (!$conn) {
    $errorMessage = pg_last_error();
    die("Connection failed: $errorMessage");
}

// Test the connection by querying the database for the current date
$query = "SELECT CURRENT_DATE";
$result = pg_query($conn, $query);

// Display error message if query failed
if (!$result) {
    $errorMessage = pg_last_error($conn);
    die("Query failed: $errorMessage");
}

// Fetch the results of the query and display them
$row = pg_fetch_row($result);
$currentDate = $row[0];
echo "Connected successfully! Current date: $currentDate";

// Close the database connection
pg_close($conn);
?>


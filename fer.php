<?php
// Database connection parameters
$host = 'localhost';
$username = 'root';
$password = 'usercode';
;

// Connect to MySQL database
$conn = mysqli_connect($host, $username, $password);

// Check connection
if (!$conn) {
    echo "Failed to connect to database";
}
?>
<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "adoption portal";
// Create connection
$connection = mysqli_connect($servername, $username, $password, $dbname);
$dbconfig = mysqli_select_db($connection,$dbname);

// Check connection
if (!$connection) {
  die("Connection failed: " . mysqli_connect_error());
  }
  $sql = "SELECT id, breed, name, life span, image, details FROM pets";
  $check_pets = $connection->query($sql);
?>
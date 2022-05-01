<?php

$server="localhost";
$username="root";
$password="";
$database="hospital_management_system"; 

$conn=mysqli_connect($server, $username, $password, $database);
if(!$conn){
    echo "<script>alert('Connection failed')</script>";
}
?>
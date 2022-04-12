<?php

$server="localhost";
$username="root";
$password="";
$database="ems"; 

$conn=mysqli_connect($server, $username, $password, $database);
if(!$conn){
    echo "<script>alert('Connection failed')</script>";
}
?>
                                                    
<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "travel";

$conn = mysqli_connect($servername,$username,$password,$dbname);

if($conn)
{
	echo "";
}
else
{
	echo "Connection Failed";
}
?>
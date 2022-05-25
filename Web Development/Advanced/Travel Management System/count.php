<style>
	h1
	{
		padding: 40px;
	}
	td,th
	{
		padding: 10px;
	}
</style>
<!DOCTYPE html>
<html>
<title>Display Agents</title>
	<!-- CSS only -->
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
	<meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- Bootstrap CSS Files -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="anonymous">
    <!-- FontAwesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <meta name="port" content="width=device-width, initial-scale=1.0">
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.gstatic.com"> 
    <link href="https://fonts.googleapis.com/css2?family=Nunito&display=swap" rel="stylesheet">
    <script defer src="https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js"></script>
<body background="blue.jpg">
	<center>
<div class="text-center py-2">
<a href="index.html"><h4>Go Back To Home Page</h4></a>
</div>
	<h1>
		The Database Count Is As Follows
	</h1>
<?php
include("connection.php");
$query = "SELECT * FROM BUS";

$query1 = "SELECT * FROM PASSENGER";

$query2 = "SELECT * FROM AGENT";

$query3 = "SELECT * FROM OWNER";

$query4 = "SELECT * FROM GOVERNMENT";

$data = mysqli_query($conn,$query);

$data1 = mysqli_query($conn,$query1);

$data2 = mysqli_query($conn,$query2);

$data3 = mysqli_query($conn,$query3);

$data4 = mysqli_query($conn,$query4);

$total = mysqli_num_rows($data);

$total1 = mysqli_num_rows($data1);

$total2 = mysqli_num_rows($data2);

$total3 = mysqli_num_rows($data3);

$total4 = mysqli_num_rows($data4);

if($total!=0)
{
	echo "<br>The total number of buses currently registered in the system are : ";
	echo $total;
	echo "<br><br>The total number of passengers currently registered in the system are : ";
	echo $total1;
	echo "<br><br>The total number of agents currently registered in the system are : ";
	echo $total2;
	echo "<br><br>The total number of owners currently registered in the system are : ";
	echo $total3;
	echo "<br><br>The total number of government departments currently registered in the system are : ";
	echo $total4;
}
else{
		echo "No record found";
	}	
?>
</table>
<script >
	function checkdelete()
	{
		return confirm('Are you sure you want to delete?')
	}
</script>
</center>
</body>
</html>
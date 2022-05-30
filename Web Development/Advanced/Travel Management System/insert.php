<!DOCTYPE html>
<?php
include 'connection.php';
error_reporting(0);
?>
<html>

<head>
	<title>Agent Insert</title>
	<!-- CSS only -->
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="routenamenymous">
	<meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- Bootstrap CSS Files -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="routenamenymous">
    <!-- FontAwesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <meta name="port" content="width=device-width, initial-scale=1.0">
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.gstatic.com"> 
    <link href="https://fonts.googleapis.com/css2?family=Nunito&display=swap" rel="stylesheet">
    <script defer src="https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js"></script>
    <link rel="stylesheet" href="style.css"/>
    <script src="index.js"></script>
	<style>
		
	body{
		background-color: #57afeb;
	}
	.contact{
		padding: 2%;
		height: 100px;
	}
	.col-md-3{
		background: #001ca8;
		color:white;
		padding: 4%;
		border-top-left-radius: 0.5rem;
		border-bottom-left-radius: 0.5rem;
	}
	.contact-info{
		margin-top:10%;
	}
	.contact-info img{
		margin-bottom: 15%;
	}
	.contact-info h2{
		margin-bottom: 10%;
	}
	.col-md-9{
		background: #fff;
		padding: 3%;
		border-top-right-radius: 0.5rem;
		border-bottom-right-radius: 0.5rem;
	}
	.button{
		background: #001ca8;
		color:white;
	}
	.button:hover{
		color: #001ca8;
		background:white;
	}

	</style>
</head>
<body>
<div class="text-center py-5">
<a href="index.html"><h4>Go Back To Home Page</h4></a>
</div>
<div class="container contact">
	<div class="row">
		<div class="col-md-3">
			<div class="contact-info text-center">
				<img src="female.svg" class="img-fluid" height="100px" width="100px" alt="image">
				<h5>Bus Details</h5>
				<h6>Please enter the details!</h6>
			</div>
		</div>
		<div class="col-md-9">
		<form action="" method="GET">
			<!-- <div class="contact-form" method="GET" action=""> -->
				<div class="form-group py-2">
				  <label class="control-label col-sm-2" for="busno">BUS NO:</label>
				  <div class="col-sm-10">          
					<input type="text" class="form-control" id="busno" placeholder="Enter BUS NO" name="busno">
				  </div>
				</div>
				<div class="form-group py-2">
				  <label class="control-label col-sm-2" for="bodyno">BODY NO:</label>
				  <div class="col-sm-10">
					<input type="text" class="form-control" id="bodyno" placeholder="Enter BODY NO" name="bodyno">
				  </div>
				</div>
				<div class="form-group py-2"> 
				  <label class="control-label col-sm-2" for="routename">ROUTE NAME:</label>
				  <div class="col-sm-10">          
					<input type="text" class="form-control" id="routename" placeholder="Enter ROUTE NAME" name="routename">
				  </div>
				</div>
				<input type="submit" name="Submit" class="button" value="Submit">
			</div>
		</div>
	</div>
</form>
<!-- <form action="" method="GET">
	BUS NO <input type="text" name="busno" value=""/><br><br>
	BODY NO <input type="text" name="bodyno" value=""/><br><br>
	ROUTE NAME <input type="text" name="routename" value=""/><br><br>
	<input type="submit" name="Submit" value="Submit">
	
</form> -->

<?php

if($_GET['Submit'])
{
	$bn = $_GET['busno'];
	$bon = $_GET['bodyno'];
    $rn = $_GET['routename'];
	if($bn != "" && $bon != "" && $rn != "")
	{
		$query = "INSERT INTO BUS VALUES ('$bn','$bon','$rn')";
		$data = mysqli_query($conn,$query);

		if($data)
		{
			echo "Data inserted successfully";
		}

	}
	else
	{
		echo "All Fields Are Required";
	}
}
?>
</center>
</body>
</html>
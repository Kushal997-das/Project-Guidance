<?php
include 'connection.php';
error_reporting(0);
?>
<html>
<head>
	<title>Agent Insert</title>
	<!-- CSS only -->
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="taxnonymous">
	<meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- Bootstrap CSS Files -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x" crossorigin="taxnonymous">
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
				<img src="info1.svg" class="img-fluid" height="150px" width="150px" alt="image">
				<h5>Government Department Details</h5>
				<h6>Please enter the details!</h6>
			</div>
		</div>
		<div class="col-md-9">
		<form action="" method="GET">
				<div class="form-group py-2">
				  <label class="control-label col-sm-2" for="deptname">Dept Name:</label>
				  <div class="col-sm-10">          
					<input type="text" class="form-control" id="deptname" placeholder="Enter Department Name" name="deptname">
				  </div>
				</div>
				<div class="form-group py-2">
				  <label class="control-label col-sm-2" for="ownerno">Owner Number:</label>
				  <div class="col-sm-10">
					<input type="text" class="form-control" id="ownerno" placeholder="Enter Owner Number" name="ownerno">
				  </div>
				</div>
				<div class="form-group py-2"> 
				  <label class="control-label col-sm-2" for="taxno">Tax Number</label>
				  <div class="col-sm-10">          
					<input type="text" class="form-control" id="taxno" placeholder="Enter Tax Number" name="taxno">
				  </div>
				</div>
				<input type="submit" name="Submit" class="button" value="Submit">
			</div>
		</div>
	</div>
</form>

<?php

if($_GET['Submit'])
{
	$dn = $_GET['deptname'];
	$on = $_GET['ownerno'];
    $tn = $_GET['taxno'];
	if($dn != "" && $on != "" && $tn != "")
	{
		$query = "INSERT INTO government VALUES ('$dn','$on','$tn')";
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
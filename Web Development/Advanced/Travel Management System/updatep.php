<!DOCTYPE html>
<?php
include 'connection.php';
error_reporting(0);
?>
<html>
<head>
	<title>Passenger Update</title>
 	<style>
 		h1
 		{
 			padding: 40px;
 		}
 		form
		{
			padding: 40px;
		}
		input
		{
			margin: 10px;
		}
 	</style>
</head>
<body background="red-yellow-lines-wave-shape-beautiful-background-web-texture-use-website-ui-ux-designs-best-mobile-application-145059904.jpg">
		<a href="index.html"><h4>Go Back To Home Page</h4></a>
	<center>
		<h1>
			Enter The Updated Passenger Details
		</h1>
<form action="" method="GET">
	PASSENGER NUMBER <input type="number" name="pnum" value="<?php echo $_GET['pn'];?>"/><br><br>
	PASSENGER NAME <input type="text" name="pname" value="<?php echo $_GET['nm'];?>"/><br><br>
	PASSENGER ADDRESS <input type="text" name="paddr" value="<?php echo $_GET['ad'];?>"/><br><br>
	PASSENGER MOBILE <input type="text" name="pmobile" value="<?php echo $_GET['mn'];?>"/><br><br>
	BUS NUMBER <input type="number" name="busno" value="<?php echo $_GET['bn'];?>"/><br><br>
	ROUTE NAME <input type="text" name="rname" value="<?php echo $_GET['r'];?>"/><br><br>
	
	<input type="submit" name="Update" value="Update">
	
</form>

<?php

if($_GET['Update'])
{
	$pno = $_GET['pnum'];
	$nma = $_GET['pname'];
	$add = $_GET['paddr'];
	$mno = $_GET['pmobile'];
	$bno = $_GET['busno'];
	$rna = $_GET['rname'];

	$query = "UPDATE passenger SET PNAME='$nma',ADDRESS='$add',MOBILENO='$mno',BUSNO='$bno',ROUTENAME='$rna' WHERE PNO='$pno'";
	$data = mysqli_query($conn,$query);
	if($data)
	{
		echo "<font color='green'>Record Updated Successfully <a href='displayp.php'>Check Updated List Here</a>";
	}
	else
	{
		echo "<font color='red'>Not Updated <a href='displayp.php'>Check List Here</a>";
	}
}
else
{
	echo "<font color='blue'>Click update to save changes";
}
?>
</center>
</body>
</html>
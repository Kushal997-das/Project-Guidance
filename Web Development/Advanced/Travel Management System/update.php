<!DOCTYPE html>
<?php
include 'connection.php';
error_reporting(0);
?>
<html>
<head>
<title>Bus Update</title>
	<style>
		input
		{
			margin: 10px;
		}
		form
		{
			padding: 40px;
		}
		h1
		{
			padding: 40px;
		}
	</style>
</head>
<body background="red-yellow-lines-wave-shape-beautiful-background-web-texture-use-website-ui-ux-designs-best-mobile-application-145059904.jpg">
		<a href="index.html"><h4>Go Back To Home Page</h4></a>
<center>
	<h1>
			Enter The Updated Bus Details
		</h1>
<form action="" method="GET">
	BUS NO <input type="number" name="busno" value="<?php echo $_GET['bn'];?>"/><br><br>
	BODY NO <input type="number" name="bodyno" value="<?php echo $_GET['bon'];?>"/><br><br>
	ROUTE NAME <input type="text" name="routename" value="<?php echo $_GET['rn'];?>"/><br><br>
	<input type="submit" name="Update" value="Update">
	
</form>

<?php

if($_GET['Update'])
{
	$bno = $_GET['busno'];
	$bono = $_GET['bodyno'];
	$rna = $_GET['routename'];	
	$query = "UPDATE BUS SET BODYNO='$bono',ROUTENAME='$rna' WHERE BUSNO='$bno'";
	$data = mysqli_query($conn,$query);
	if($data)
	{
		echo "<font color='green'>Record Updated Successfully <a href='display.php'>Check Updated List Here</a>";
	}
	else
	{
		echo "<font color='red'>Not Updated <a href='display.php'>Check List Here</a>";
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
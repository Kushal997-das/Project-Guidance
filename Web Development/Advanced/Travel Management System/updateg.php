<!DOCTYPE html>
<?php
include 'connection.php';
error_reporting(0);
?>
<html>
<head>
	<title>Government Update</title>
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
			Enter The Updated Government Details
		</h1>
<form action="" method="GET">
	Department Name <input type="text" name="deptname" value="<?php echo $_GET['dn'];?>"/><br><br>
	Owner Number <input type="number" name="ownerno" value="<?php echo $_GET['on'];?>"/><br><br>
	Tax Number <input type="text" name="taxno" value="<?php echo $_GET['tn'];?>"/><br><br>
	<input type="submit" name="Update" value="Update">
	
</form>

<?php

if($_GET['Update'])
{
	$dna = $_GET['deptname'];
	$ono = $_GET['ownerno'];
	$tno = $_GET['taxno'];	
	$query = "UPDATE government SET DEPTNAME='$dna',OWNERNO='$ono' WHERE TAXNO='$tno'";
	$data = mysqli_query($conn,$query);
	if($data)
	{
		echo "<font color='green'>Record Updated Successfully <a href='displayg.php'>Check Updated List Here</a>";
	}
	else
	{
		echo "<font color='red'>Not Updated <a href='displayg.php'>Check List Here</a>";
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
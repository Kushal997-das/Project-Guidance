<!DOCTYPE html>
<?php
include 'connection.php';
error_reporting(0);
?>
<html>
<head>
	<title>Owner Update</title>
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
		Enter The Updated Owner Details
	</h1>
<form action="" method="GET">
	OWNER NUMBER <input type="number" name="onum" value="<?php echo $_GET['on'];?>"/><br><br>
	OWNER ADDRESS <input type="text" name="oaddr" value="<?php echo $_GET['ad'];?>"/><br><br>
	OWNER MOBILE <input type="text" name="omobile" value="<?php echo $_GET['mn'];?>"/><br><br>
	BUS NUMBER <input type="number" name="busno" value="<?php echo $_GET['bn'];?>"/><br><br>

	<input type="submit" name="Update" value="Update">
	
</form>

<?php

if($_GET['Update'])
{
	$ono = $_GET['onum'];
	$add = $_GET['oaddr'];
	$mno = $_GET['omobile'];
	$bno = $_GET['busno'];

	$query = "UPDATE owner ADDRESS='$add',MOBILENO='$mno',BUSNO='$bno' WHERE OWNERNO='$ono'";
	$data = mysqli_query($conn,$query);
	if($data)
	{
		echo "<font color='green'>Record Updated Successfully <a href='displayo.php'>Check Updated List Here</a>";
	}
	else
	{
		echo "<font color='red'>Not Updated <a href='displayo.php'>Check List Here</a>";
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
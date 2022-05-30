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
			Enter The Updated Agent Details
		</h1>
<form action="" method="GET">
	Agent Name <input type="text" name="aname" value="<?php echo $_GET['ana'];?>"/><br><br>
	Agent Address <input type="text" name="aadr" value="<?php echo $_GET['ad'];?>"/><br><br>
	Agent Number <input type="number" name="agno" value="<?php echo $_GET['ano'];?>"/><br><br>
	<input type="submit" name="Update" value="Update">
	
</form>

<?php

if($_GET['Update'])
{
	$ana = $_GET['aname'];
	$add = $_GET['aadr'];
	$agn = $_GET['agno'];	
	$query = "UPDATE agent SET ANAME='$ana',ADDRESS='$add' WHERE ANO='$agn'";
	$data = mysqli_query($conn,$query);
	if($data)
	{
		echo "<font color='green'>Record Updated Successfully <a href='displaya.php'>Check Updated List Here</a>";
	}
	else
	{
		echo "<font color='red'>Not Updated <a href='displaya.php'>Check List Here</a>";
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
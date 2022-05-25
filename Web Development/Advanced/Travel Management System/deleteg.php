<!DOCTYPE html>
<html>
<head>
	<title>Government</title>
</head>
<body background="background=red-yellow-lines-wave-shape-beautiful-background-web-texture-use-website-ui-ux-designs-best-mobile-application-145059904.jpg">
<?php
include("connection.php");
$taxno = $_GET['tn'];
$query = "DELETE FROM government WHERE TAXNO='$taxno'";
$data = mysqli_query($conn,$query);
if($data)
{
	echo "<script>alert('Record Deleted')</script>";
	?>
	<META HTTP-EQUIV="Refresh" CONTENT="1; URL=http://localhost/dbms/displayg.php">
	<?php
}
else
{
	echo "<font color='red>Data not deleted!";
}
?>
</body>
</html>

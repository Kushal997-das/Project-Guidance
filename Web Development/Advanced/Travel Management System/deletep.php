<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body background="red-yellow-lines-wave-shape-beautiful-background-web-texture-use-website-ui-ux-designs-best-mobile-application-145059904.jpg">
<?php
include("connection.php");
$pno = $_GET['pn'];
$query = "DELETE FROM passenger WHERE PNO='$pno'";
$data = mysqli_query($conn,$query);
if($data)
{
	echo "<script>alert('Record Deleted')</script>";
	?>
	<META HTTP-EQUIV="Refresh" CONTENT="1; URL=http://localhost/dbms/displayp.php">
	<?php
}
else
{
	echo "<font color='red>Data not deleted!";
}
?>
</body>
</html>
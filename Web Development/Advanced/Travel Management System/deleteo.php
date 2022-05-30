<!DOCTYPE html>
<html>
<head>
	<title>Owners</title>
</head>
<body background="red-yellow-lines-wave-shape-beautiful-background-web-texture-use-website-ui-ux-designs-best-mobile-application-145059904.jpg">
>
<?php
include("connection.php");
$ono = $_GET['on'];
$query = "DELETE FROM owner WHERE OWNERNO='$ono'";
$data = mysqli_query($conn,$query);
if($data)
{
	echo "<script>alert('Record Deleted')</script>";
	?>
	<META HTTP-EQUIV="Refresh" CONTENT="1; URL=http://localhost/dbms/displayo.php">
	<?php
}
else
{
	echo "<font color='red>Data not deleted!";
}
?>
</body>
</html>
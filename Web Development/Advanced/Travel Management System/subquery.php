<style>
	h1
	{
		padding: 10px;
	}
	td
	{
		padding: 10px;
	}
</style>
<!DOCTYPE html>
<html>
<head>
<title>Bus</title>
	<style>
		table
		{
			padding: 0px;
		}
	</style>
</head>
<body background="red-yellow-lines-wave-shape-beautiful-background-web-texture-use-website-ui-ux-designs-best-mobile-application-145059904.jpg">
		<a href="index.html"><h4>Go Back To Home Page</h4></a>
<center>
	<h1>
		BUSES WITH LICENSE PLATE NUMBER MORE THAN 2000
	</h1>
<?php
include("connection.php");
$query = "SELECT * FROM BUS WHERE BUSNO IN (SELECT BUSNO FROM GOVERNMENT WHERE BUSNO>2000)";

$data = mysqli_query($conn,$query);

$total = mysqli_num_rows($data);

if($total!=0)
{
	?>
	<table>
		<tr>
			<th>Bus No</th>
			<th>Body No</th>
			<th>Route Name</th>
		</tr>

	<?php
	while($result = mysqli_fetch_assoc($data))
	{
		echo "<tr>
				 <td>".$result['BUSNO']."</td>
				 <td>".$result['BODYNO']."</td>
				 <td>".$result['ROUTENAME']."</td>
			 </tr>";
	}
}
else{
		echo "No record found";
	}	
?>
</table>
<script >
	function checkdelete()
	{
		return confirm('Are you sure you want to delete?')
	}
</script>
</center>
</body>
</html>
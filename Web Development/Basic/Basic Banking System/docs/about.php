<!DOCTYPE html>
<html>
<head>
	<title>Bootstrap Example</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" type ="text/css" href="css/style">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
  
</head>
<body>
 <nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="index.php">All customers</a>
    </div>
    <ul class="nav navbar-nav">
      <li ><a href="index.php">Homepage</a></li>
      <li class="active"><a href="about.php">All customers</a></li>
      
    </ul>
  </div>
</nav>
<head>
	<title>View all customers</title>
</head>
<body>
<table>
	<tr>
		<th>Name</th>
		<th>View</th>
	</tr>
			<?php
			$conn = mysqli_connect("localhost","root","","banking");
			if($conn -> connect_error){
				die("connection failed:".$conn->connect_error);
			}
			$sql = "SELECT * from customers";
			$result = $conn -> query($sql);
			if($result-> num_rows>0)
			{
				while($row = $result-> fetch_assoc())
				{
				?>
					<tr>
						<td><?php echo $row["Name"]; ?></td>
						<td>
							<button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal<?php echo $row["id"]; ?>">View Details</button>
						</td>
					</tr>

					<!-- Modal -->
					<div id="myModal<?php echo $row["id"]; ?>" class="modal fade" role="dialog">
					  <div class="modal-dialog">

					    <!-- Modal content-->
					    <div class="modal-content">
					      <div class="modal-header">
					        <button type="button" class="close" data-dismiss="modal">&times;</button>
					        <h4 class="modal-title">Details of <?php echo $row["Name"]; ?></h4>
					      </div>
					      <div class="modal-body">
					      	  <div class="row">
							    <div class="col-sm-4" style="background-color:lavender;">Email:</div>
							    <div class="col-sm-8" style="background-color:lavenderblush;"><?php echo $row["Email"]; ?></div>
							  </div> 
					        <div class="row">
							    <div class="col-sm-4" style="background-color:lavender;">Mobile:</div>
							    <div class="col-sm-8" style="background-color:lavenderblush;"><?php echo $row["Mobile"]; ?></div>
							  </div> 
					        <div class="row">
							    <div class="col-sm-4" style="background-color:lavender;">Balance:</div>
							    <div class="col-sm-8" style="background-color:lavenderblush;"><?php echo $row["Current Balance"]; ?></div>
							  </div> 
					        </div>
					      </div>
					      <!--<div class="modal-footer">
					        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					      </div>-->
					    </div>

					  </div>
					</div>
				<?php
				}
			}	
			else{
				echo "0 result";	
			}

			$conn -> close();
			?>
</table>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
</body>
</html>
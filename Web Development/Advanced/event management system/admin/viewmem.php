<?php 
include 'db.php';
session_start();

if (!isset($_SESSION['username'])) {
  header("Location: adminlogin.php");
}

?>
<!doctype html>
<html lang="en">
  <head>
  	<title></title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800,900" rel="stylesheet">
		
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
		<link rel="stylesheet" href="css/style.css">
  </head>
  <body style="background-color:#F3F6F9">
		
		<div class="wrapper d-flex align-items-stretch">
			<nav id="sidebar">
				<?php require 'nav.php'; ?>

        <!-- Page Content  -->
      <div id="content" class="p-4 p-md-5 pt-5">
        <div class="bd" >
        <?php 
$id = $_GET["id"];
$sql= "SELECT *from comitees where id=$id ";
$details_query = mysqli_query($conn,$sql);
    if($details_query){
        if(mysqli_num_rows($details_query) > 0){
          while($row = mysqli_fetch_array($details_query)){
    ?>
    <h2 class="mb-4"><?php echo $row['name']; ?></h2>
    <p style="font-size:18px;"><?php echo $row['details']; ?></p>
    <?php

	}
}
    }
	?>
        <?php 
$id = $_GET["id"];
$sql= "SELECT *from members where comm in(select name from  comitees where id=$id ) ";
$details_query = mysqli_query($conn,$sql);
    if($details_query){
        if(mysqli_num_rows($details_query) > 0){
          while($row = mysqli_fetch_array($details_query)){
    ?>
        <h4 class="mb-4">All Members of <?php echo $row['comm'];break; ?></h4>
        <?php

	}
}
    }
	?>
        <table class="table" style="margin-top:40px;">
  <thead>
    <tr style="font-size:17px;">
      <th scope="col">Member id</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Committee</th>
      <th scope="col">Role</th>
    </tr>
  </thead>
  <tbody>
  <?php 
$id = $_GET["id"];
$sql= "SELECT *from members where comm in(select name from  comitees where id=$id ) ";
$details_query = mysqli_query($conn,$sql);
    if($details_query){
        if(mysqli_num_rows($details_query) > 0){
          while($row = mysqli_fetch_array($details_query)){
    ?>
    <tr style="font-size:17px;">
      <td scope="row"><?php echo $row['mem_id']; ?></td>
      <td><?php echo $row['name']; ?></td>
      <td><?php echo $row['email']; ?></td>
      <td><?php echo $row['comm']; ?></td>
      <td><?php echo $row['role']; ?></td>
      
      
    </tr>
  </tbody>
  <?php

	}
}
    }
	?>
</table>
      </div>
		</div>
</div>
    <script src="js/jquery.min.js"></script>
    <script src="js/popper.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/main.js"></script>
  </body>
</html>
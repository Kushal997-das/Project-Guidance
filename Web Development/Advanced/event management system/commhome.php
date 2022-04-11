<?php 
include 'db.php';
session_start();

if (!isset($_SESSION['name'])) {
  header("Location: login.php");}
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
  <body>
		
		<div class="wrapper d-flex align-items-stretch">
			<nav id="sidebar">
				<?php require 'nav.php'; ?>	

        <!-- Page Content  -->
      <div id="content" class="p-4 p-md-5 pt-5">
      <h2 class="mb-4" style="marggin-bottom:20px;"> Your Committe members</h2>
      <div class="container" style="margin-top:60px;width:96%;">
<table class="table" style="background:#fff;">
  <thead class="table-dark">
    <tr>
      <th scope="col">Member id</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Role</th>
    </tr>
  </thead>
  <tbody>
        <?php
      $currentuser = $_SESSION['name'];
          $sql= "SELECT *from members WHERE name='$currentuser'";
          $gotresults=mysqli_query($conn, $sql);
          if($gotresults){
          if(mysqli_num_rows($gotresults) > 0){
            while($row = mysqli_fetch_array($gotresults)){
              $code=$row['code'];
              $sqli= "SELECT * FROM members WHERE code = '".$code."' ";
              $details_query = mysqli_query($conn,$sqli);
              if($details_query){
                  if(mysqli_num_rows($details_query) > 0){
                    while($row = mysqli_fetch_array($details_query)){
              ?>
              <tr>
      <td><?php echo $row['mem_id']; ?></td>
      <td><?php echo $row['name']; ?></td>
      <td><?php echo $row['email']; ?></td>
      <td><?php echo $row['role']; ?></td>
                    </tr>
                  
<?php
                    }}}
	}
        }
    }
	?>
  </tbody>
  </div>
      </div>
    </div>

    <script src="js/jquery.min.js"></script>
    <script src="js/popper.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/main.js"></script>
  </body>
</html>
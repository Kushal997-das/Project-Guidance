<?php 
include 'db.php';
session_start();

if (!isset($_SESSION['name'])) {
  header("Location: login.php");
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
        <h2 class="mb-4">Request a Meeting</h2>
        <div class="container" style="width:60%;border: 3px solid #b3b3b3;height:400PX;padding:30px;border-radius:20px;">
        <form class="row g-3" style="font-size:18px;" action="" method="POST">
  <div class="col-md-6" >
    <label for="inputEmail4" class="form-label" >Name</label>
    <input type="text" class="form-control" name="name" id="inputEmail4" style="border:1px solid #bfbfbf">
  </div>
  <div class="col-md-6" >
    <label for="inputEmail4" class="form-label" >email</label>
    <input type="email" class="form-control" name="email" id="inputEmail4" style="border:1px solid #bfbfbf">
  </div>
  <div class="col-12">
    <label for="inputAddress" class="form-label">Subject</label>
    <input type="text" class="form-control" name="subject" id="inputAddress" placeholder="1234 Main St" style="border:1px solid #bfbfbf;">
  </div>
  <div class="col-12">
    <label for="inputAddress2" class="form-label" >Message</label>
    <input type="text" class="form-control" name="message" id="inputAddress" placeholder="1234 Main St" style="border:1px solid #bfbfbf;">
  
  <div class="col-12" style="margin-top:30px;">
    <button type="submit" name="submit" class="btn btn-primary">Submit</button>
  </div>
</form>
</div>
      </div>
      
		</div>
</div>
    <script src="js/jquery.min.js"></script>
    <script src="js/popper.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/main.js"></script>
  </body>
</html>
<?php
    if((isset($_POST['submit']))){
      $name = $_POST["name"]; 
      $email = $_POST["email"];
      $subject = $_POST["subject"];
      $message = $_POST["message"];
        //Query to insert data to the database
        $sql="INSERT INTO requests (name, email, subject, message) VALUES ('".$name."','".$email."','".$subject."', '".$message."')";
        //Execute the query and returning a message
        if(!$result = $conn->query($sql)){
            die('Error occured [' . $conn->error . ']');
        }
        else
            echo '<script> alert("Data inserted successfully")</script>';
        }
?>
<script>
        if ( window.history.replaceState ) {
            window.history.replaceState( null, null, window.location.href );
    }
</script>
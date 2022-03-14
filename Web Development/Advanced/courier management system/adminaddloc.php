<?php 
include 'db.php';
session_start();
if (!isset($_SESSION['username'])) {
  header("Location: index.php");
}?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="style.css">
    <title>Document</title>
</head>
<body style="background:#cccfcf;">
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <?php require 'nav2.php'; ?>
  <h1 style="text-align:center;margin-top:20px;">ADD NEW BRANCH</h1>
    <div class="container" style="width:40%;margin-left:30%;margin-top:50px;height:450px;background:#fff;padding:30px;">
      <form class="row g-3" action="" method="POST">
        <div class="col-6">
          <label for="inputAddress" class="form-label">Branch code </label>
          <input type="text" name="branch_code" class="form-control" id="inputAddress" placeholder="Enter Branch Code">
        </div>
        <div class="col-6">
          <label for="inputAddress" class="form-label">Branch Name </label>
          <input type="text" name="branch_name" class="form-control" id="inputAddress" placeholder="Enter Branch Name">
        </div>
        <div class="col-12">
         <label for="inputAddress2" class="form-label">Address</label>
          <input type="text" name="address"class="form-control" id="inputAddress2" placeholder="Enter Address">
        </div>
        <div class="col-md-12">
          <label for="inputCity" class="form-label">Phone number</label>
          <input type="text" name="phone" class="form-control" id="inputCity" placeholder="Enter Phone Number">
        </div>
        <div class="col-md-4">
          <label for="inputCity" class="form-label">City</label>
          <input type="text" name="city" class="form-control" id="inputCity" placeholder="Enter City">
        </div>
        <div class="col-md-4">
          <label for="inputState" class="form-label">State</label>
          <input type="text" name="state" class="form-control" id="inputCity" placeholder="Enter State">
        </div>
        <div class="col-md-4">
          <label for="inputZip" class="form-label">Pin code</label>
          <input type="text" name="pin" class="form-control" id="inputZip" placeholder="Enter Pin-code">
        </div>
        <div class="col-12">
          <button type="submit" name="submit" class="btn btn-primary">Submit</button>
        </div>
      </form>
	  </div>
  </body>
</html>
<?php
    if((isset($_POST['submit']))){
      $branch_code = $_POST["branch_code"]; 
      $branch_name = $_POST["branch_name"];
      $address = $_POST["address"];
      $phone = $_POST["phone"];
      $city = $_POST["city"];
      $state = $_POST["state"];
      $pin = $_POST["pin"];
        //Query to insert data to the database
        $sql="INSERT INTO centers (branch_code, branch_name, address, phn_no, city, state, zip) VALUES ('".$branch_code."','".$branch_name."','".$address."','".$phone."','".$city."','".$state."','".$pin."')";
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
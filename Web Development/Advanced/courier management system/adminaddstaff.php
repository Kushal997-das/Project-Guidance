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
<h1 style="text-align:center;margin-top:20px;">ADD NEW STAFF</h1>
<div class="container" style="width:40%;margin-left:30%;margin-top30px;height:480px;background:#fff;padding:30px">
        <form action="" method="POST" class="row g-3">
            <div class="col-12">
                <label for="inputEmail" class="form-label">Username</label>
                <input type="text" name="username" class="form-control" id="inputEmail" placeholder="Enter username" required>
            </div>
            <div class="col-12">
                <label for="inputAddress2" class="form-label">Email</label>
                <input type="email" name="email" class="form-control" id="inputpassword" placeholder="Enter Email" required>
            </div>
            <div class="col-md-12">
                <label for="inputState" class="form-label">Choose Branch code</label>
                <select id="inputState" class="form-select" name="branch_code">
                    <option selected>Choose...</option>
                    <?php $sql= "SELECT *from centers";
                    $details_query = mysqli_query($conn,$sql);
                    if($details_query){
                        if(mysqli_num_rows($details_query) > 0){
                            while($row = mysqli_fetch_array($details_query)){
                                $branch_code = $row['branch_code'];
                    ?>
                    <option><?php echo $branch_code ?></option>
                    <?php
                    }
                }
            }
            ?>
                </select>
            </div>
            <div class="col-12">
                <label for="inputAddress2" class="form-label">Password</label>
                <input type="password" name="password" class="form-control" id="inputpassword" placeholder="Enter password" required>
            </div>
            <div class=" d-grid gap-2 col-12">
                <button type="submit" name="submit" class="btn btn-primary" >Add Staff</button>
            </div>
        </form>
	</div>
</body>
</html>
<?php
    if((isset($_POST['submit']))){
      $name = $_POST["username"]; 
      $email = $_POST["email"];
      $password = $_POST["password"];
      $branch_id = $_POST["branch_code"];
        //Query to insert data to the database
        $sql="INSERT INTO users (username, email, branch_code, password) VALUES ('".$name."','".$email."','".$branch_id."', '".$password."')";
        //Execute the query and returning a message
        if(!$result = $conn->query($sql)){
            die('Error occured [' . $conn->error . ']');
        }
        else
            echo '<script> alert("Thank you! We will get in touch with you soon")</script>';
        }
?>
<script>
        if ( window.history.replaceState ) {
            window.history.replaceState( null, null, window.location.href );
    }
</script>
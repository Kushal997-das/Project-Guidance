<?php 
include 'db.php';
session_start();

if (!isset($_SESSION['username'])) {
    header("Location: home1.php");
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!----------------bootstrap-css--------------->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <!----------------bootstrap-js--------------->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <script defer src="https://use.fontawesome.com/releases/v5.0.2/js/all.js"></script>
    <title>Document</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<nav class="navbar navbar-custom navbar-expand-lg navbar-light" >
    <?php require 'nav.php'; ?>
  <div class="container">
    <img src="images/profile.png" style="width:130px; height:110px;margin-left:33.5%;border:solid #000 3px">
    <table class="table table-striped table-hover" style="margin-left:15%; width:75%;border:solid:rgb(51, 50, 50);margin-top:20px;">
    <form class="row g-3" method="POST" action="">
    <?php 
          $currentuser = $_SESSION['username'];
          $sql= "SELECT *from users WHERE username='$currentuser'";
          $gotresults=mysqli_query($conn, $sql);
          if($gotresults){
          if(mysqli_num_rows($gotresults) > 0){
            while($row = mysqli_fetch_array($gotresults)){
              ?>
  <div class="col-12">
    <label class="form-label">Name</label>
    <input type="text" name="name" class="form-control" id="inputAddress" value="<?php echo $row['username'];?>">
  </div>
  <div class="col-12">
    <label class="form-label">Email</label>
    <input type="text" name="email" class="form-control" id="inputAddress2" value="<?php echo $row['email'];?>">
  </div>
</form>
              <?php 
              }
            }
          }
        ?>
        </div>
        </table>
        <div class="col-12">
    <button type="submit" name="submit" class="btn btn-primary">Update profile</button>
  </div>
        </div>
  </body>
</html>
<?php
    if((isset($_POST['submit']))){
      $name = $_POST["name"]; 
      $email = $_POST["email"];
        //Query to insert data to the database
        $sql="UPDATE users set (name, email) VALUES ('".$name."','".$email."')";
        $result=mysqli_mysqli_query($conn, $sql);
        //Execute the query and returning a message
        if(!$result = $conn->query($sql)){
            die('could not update profile [' . $conn->error . ']');
        }
        else
            echo '<script> alert("profile updated")</script>';
        }
?>
<script>
        if ( window.history.replaceState ) {
            window.history.replaceState( null, null, window.location.href );
    }
</script>
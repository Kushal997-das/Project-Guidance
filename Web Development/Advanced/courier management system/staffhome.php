<?php 
include 'db.php';
session_start();
$currentuser = "Admin";
if($_SESSION['username']!=$currentuser){

if (!isset($_SESSION['username'])) {
  header("Location: index.php");
}
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
<body>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <?php require 'nav3.php'; ?>
    <div class="bod" style="background-image:url(images/c1.png);background-size: cover;background-repeat:no-repeat;background-size: cover;background-position: center;width:100%;height:600px;padding-top:140px;">
      <div class="container" style="">
        <div class="row align-items-start">
          <div class="col">
            <div class="card">
              <div class="card-body" style="align-items:center;justify-content:center;border:3px solid;">
                <img src="images/staff.png" style="width:130px; height:120px;margin-left:23.5%;">
                    <?php
                      $sql =" SELECT * from users ";
                      $result=mysqli_query($conn,$sql) or die("query failed.");
                      $row=mysqli_num_rows($result);

                    ?>
                  <h2 class="card-text"><?php echo $row?></h2>
                  <h5 class="card-title">TOTAL STAFF</h5>
                  <a href="staffallstaff.php" class="btn btn-primary">VIEW ALL STAFF</a>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card">
              <div class="card-body" style="align-items:center;justify-content:center;border:3px solid;">
                <img src="images/location.png" style="width:130px; height:120px;margin-left:23.5%;">
                    <?php
                      $sql =" SELECT * from centers ";
                      $result=mysqli_query($conn,$sql) or die("query failed.");
                      $row=mysqli_num_rows($result);

                    ?>
                  <h2 class="card-text"><?php echo $row?></h2>
                  <h5 class="card-title">TOTAL CENTERS</h5>
                  <a href="staffallcenters.php" class="btn btn-primary">VIEW ALL CENTERS</a>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card">
              <div class="card-body" style="align-items:center;justify-content:center;border:3px solid;">
                <img src="images/courier.jpg" style="width:130px; height:120px;margin-left:23.5%;">
                    <?php
                      $sql =" SELECT * from couriers ";
                      $result=mysqli_query($conn,$sql) or die("query failed.");
                      $row=mysqli_num_rows($result);

                    ?>
                  <h2 class="card-text"><?php echo $row?></h2>
                  <h5 class="card-title">TOTAL COURIERS</h5>
                  <a href="staffallcou.php" class="btn btn-primary">VIEW ALL COURIERS</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
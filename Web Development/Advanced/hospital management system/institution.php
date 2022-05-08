<?php 
include 'db.php';
session_start();

if (!isset($_SESSION['username'])) {
    header("Location: index.php");
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
    <img src="images/profile.png" style="width:130px; height:110px;margin-left:33.5%;border:solid #000 3px">
    <form method="post" action="updateprofile.php">
    <table class="table table-striped table-hover" style="margin-left:15%; width:75%;border:solid:rgb(51, 50, 50);margin-top:20px;">
    <div class="tbody">
    <?php 
    
          $currentuser = $_SESSION['username'];
          $sql= "SELECT *from $currentuser";
          $gotresults=mysqli_query($conn, $sql);
          if($gotresults){
          if(mysqli_num_rows($gotresults) > 0){
            while($row = mysqli_fetch_array($gotresults)){
                $colname=$row['colname'];
                if($currentuser==$colname){
              ?>
              <tbody >
                 <tr>
                    <th scope="row" >Name</th>
                     <td><?php echo $row['name'];?></td>
                    </tr>
                    <tr>
                    <th scope="row" >Email</th>
                     <td><?php echo $row['email'];?></td>
                    </tr>
                    <tr>
                    <th scope="row" >Phone Number</th>
                     <td><?php echo $row['phone'];?></td>
                    </tr>
              <?php 
                }
              }
            }
          }
        ?>
        </div>
        </table>
        <button type="submit" href="http://localhost/hospital%20management%20system/updateprofile.php"  class="btn btn-primary">Update profile</button>
        </form>
  </body>
</html>

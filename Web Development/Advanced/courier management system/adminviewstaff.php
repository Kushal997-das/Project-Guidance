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
<h1 style="text-align:center;margin-top:20px;"> STAFF DETAILS</h1>
<div class="container" style="width:40%;margin-left:30%;margin-top30px;height:300px;background:#fff;padding:30px">
<table class="table table-striped table-hover" style="margin-left:15%; width:75%;border:solid:rgb(51, 50, 50);margin-top:20px;">
    <div class="tbody">
<?php
$id = $_GET["id"];
    $sql= "SELECT *from users WHERE id='$id'";
    $details_query = mysqli_query($conn,$sql);
    if($details_query){
        if(mysqli_num_rows($details_query) > 0){
          while($row = mysqli_fetch_array($details_query)){
            $name=$row['username'];
            $email=$row['email'];
            $city=$row['city'];
            $branchcode=$row['branch_code'];
              ?>
              <tbody >
                 <tr>
                    <th scope="row" >Name</th>
                     <td><?php echo $name;?></td>
                    </tr>
                    <tr>
                    <th scope="row" >Email</th>
                     <td><?php echo $email;?></td>
                    </tr>
                    <tr>
                    <th scope="row" >city</th>
                     <td><?php echo $city;?></td>
                    </tr>
                    <tr>
                    <th scope="row" >Branch code</th>
                     <td><?php echo $branchcode;?></td>
                    </tr>
        
        <?php
          }
        }
    }
        ?>
        </div>
        </table>
	</div>
</body>
</html>
<script>
        if ( window.history.replaceState ) {
            window.history.replaceState( null, null, window.location.href );
    }
</script>
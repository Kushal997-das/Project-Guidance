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
<body style="background:#f2f2f2;">
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
<?php require 'nav3.php'; ?>

<div class="container" style="margin-top:90px;width:96%;">
<table class="table" style="background:#fff;">
  <thead class="table-dark">
    <tr>
      <th scope="col">Sl no</th>
      <th scope="col">Courier id</th>
      <th scope="col">Sender Name</th>
      <th scope="col">Reciever Name</th>
      <th scope="col">Reciever Number</th>
      <th scope="col">Reciever Address</th>
      <th scope="col">Source Branch</th>
      <th scope="col">Destination Branch</th>
      <th scope="col">Total Fee</th>
      <th scope="col">Status</th>
      <th scope="col">Edit Details</th>
    </tr>
  </thead>
  <tbody>
  <?php 
          $currentuser = $_SESSION['username'];
          $sql= "SELECT *from users WHERE username='$currentuser'";
          $gotresults=mysqli_query($conn, $sql);
          if($gotresults){
          if(mysqli_num_rows($gotresults) > 0){
            while($row = mysqli_fetch_array($gotresults)){
              $branchcode=$row['branch_code'];
              $city=$row['city'];
              $branch= $branchcode.$city;
              $sqli= "SELECT * FROM couriers WHERE srcbranch = '".$branch."' or dstbranch ='".$branch."'";
              $details_query = mysqli_query($conn,$sqli);
              if($details_query){
                  if(mysqli_num_rows($details_query) > 0){
                    while($row = mysqli_fetch_array($details_query)){
              ?>
            
    <tr>
      <th scope="row"><?php echo $row['id']; ?></th>
      <td><?php echo $row['courier_id']; ?></td>
      <td><?php echo $row['send_name']; ?></td>
      <td><?php echo $row['rec_name']; ?></td>
      <td><?php echo $row['rec_no']; ?></td>
      <td><?php echo $row['rec_address']; ?></td>
      <td><?php echo $row['srcbranch']; ?></td>
      <td><?php echo $row['dstbranch']; ?></td>
      <td><?php echo $row['cou_fee']; ?></td>
      <td><?php echo $row['status']; ?></td>
      <form method="POST" action="">
      <td><button type="button" class="btn btn-secondary" ><a href="updatecou.php?id=<?php echo $row["id"]; ?>" style="color:#fff;">Update</a> </button></td></form>

    </tr>
  </tbody>
  <?php
                    }}}
	}
        }
    }
	?>
</table>
</div>
</body>
</html>
<script>
        if ( window.history.replaceState ) {
            window.history.replaceState( null, null, window.location.href );
    }
</script>
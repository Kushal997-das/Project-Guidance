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
<div class="container" style="margin-top:90px;width:90%;">
<table class="table" style="background:#fff;">
  <thead class="table-dark">
    <tr>
      <th scope="col">Sl no</th>
      <th scope="col">Branch code</th>
      <th scope="col">Branch name</th>
      <th scope="col">Address</th>
      <th scope="col">Phone</th>
      <th scope="col">City</th>
      <th scope="col">Pincode</th>
      <th scope="col">View Details</th>
    </tr>
  </thead>
  <tbody>
      <?php
      $i=0;
  $sql= "SELECT *from centers";
    $details_query = mysqli_query($conn,$sql);
    if($details_query){
        if(mysqli_num_rows($details_query) > 0){
          while($row = mysqli_fetch_array($details_query)){
    ?>
    <tr>
      <th scope="row"><?php echo $row['id']; ?></th>
      <td><?php echo $row['branch_code']; ?></td>
      <td><?php echo $row['branch_name']; ?></td>
      <td><?php echo $row['address']; ?></td>
      <td><?php echo $row['phn_no']; ?></td>
      <td><?php echo $row['city']; ?></td>
      <td><?php echo $row['zip']; ?></td>
      <td><button type="button" class="btn btn-secondary" ><a href="staffviewcenter.php?id=<?php echo $row["id"]; ?>" style="color:#fff;">View details</a> </button></td>
    </tr>
  </tbody>
  <?php
  $i++;
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
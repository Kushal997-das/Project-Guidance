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
<body>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
<?php require 'nav3.php'; ?>
<div class="container" style="margin-top:90px;width:60%;">
<table class="table">
  <thead class="table-secondary">
    <tr>
      <th scope="col">Sl no</th>
      <th scope="col">User name</th>
      <th scope="col">Email</th>
      <th scope="col">Branch code</th>
      <th scope="col">City</th>
      <th scope="col">View </th>
    </tr>
  </thead>
  <tbody>
      <?php
  $sql= "SELECT *from users";
    $details_query = mysqli_query($conn,$sql);
    if($details_query){
        if(mysqli_num_rows($details_query) > 0){
          while($row = mysqli_fetch_array($details_query)){
		      $id = $row['id'];
        $username = $row['username'];
        $email= $row['email'];
        $branch_code=$row['branch_code'];
        $city=$row['city'];
    ?>
    <tr>
      <th scope="row"><?php echo $id; ?></th>
      <td><?php echo $username; ?></td>
      <td><?php echo $email; ?></td>
      <td><?php echo $branch_code; ?></td>
      <td><?php echo $city; ?></td>
      <td><button type="button" class="btn btn-secondary" ><a href="staffviewstaff.php?id=<?php echo $row["id"]; ?>" style="color:#fff;">View details</a> </button></td>
    </tr>
  </tbody>
  <?php
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
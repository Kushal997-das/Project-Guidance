<?php 
include 'db.php';
session_start();

if (!isset($_SESSION['username'])) {
  header("Location: index.php");
}
if (isset($_GET['id'])){
  $id=$_GET['id'];
  $delete= mysqli_query($conn,"DELETE FROM couriers WHERE id=$id");
}
?>
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
<?php require 'nav2.php'; ?>

<div class="staff">
<a href="adminnewcourier.php" class="btn" style="font-size: 1em;color: #fff;background: #737373;display: inline-block;
        padding: 10px 20px;margin-top: 20px;text-transform: uppercase;text-decoration: none;letter-spacing: 2px;height: 7.3%;float:right;margin-right:30px;">Add New </a>
</div>
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
      <th scope="col">Fee</th>
      <th scope="col">View</th>
      <th scope="col">Edit</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  <tbody>
      <?php
      $i=0;
  $sql= "SELECT *from couriers";
    $details_query = mysqli_query($conn,$sql);
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
      <td><button type="button" class="btn btn-secondary" ><a href="adminviewcou.php?id=<?php echo $row["id"]; ?>" style="color:#fff;">View</a> </button></td>
      <td><button type="button" class="btn btn-primary" ><a href="updatecou.php?id=<?php echo $row["id"]; ?>" style="color:#fff;">Update</a> </button></td>
      <td><button type="button" class="btn btn-danger" ><a href="adminallcou.php?id=<?php echo $row["id"]; ?>" style="color:#fff;">Delete</a> </button></td></form>
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
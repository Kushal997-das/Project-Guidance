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
<h1 style="text-align:center;margin-top:20px;"> COURIER DETAILS</h1>
<div class="container" style="margin-top:40px;width:50%;">
<table class="table" style="background:#fff;">
  <thead class="table-dark">
  </thead>
  <tbody>
      <?php
      $i=0;
      $id = $_GET["id"];
      $sql= "SELECT *from couriers WHERE id='$id'";
    $details_query = mysqli_query($conn,$sql);
    if($details_query){
        if(mysqli_num_rows($details_query) > 0){
          while($row = mysqli_fetch_array($details_query)){
    ?>
    <tbody >
                 <tr>
                    <th scope="row" >Courier id</th>
                     <td><?php echo $row['courier_id'];?></td>
                    </tr>
                    <tr>
                    <th scope="row" >Sender name</th>
                     <td><?php echo $row['send_name'];?></td>
                    </tr>
                    <tr>
                    <th scope="row" >Sender Phone</th>
                     <td><?php echo $row['send_no'];?></td>
                    </tr>
                    <tr>
                    <th scope="row" >Sender Address</th>
                     <td><?php echo $row['send_address'];?></td>
                    </tr>
                    <tr>
                    <th scope="row" >Reciever Name</th>
                     <td><?php echo $row['rec_name'];?></td>
                    </tr>
                    <tr>
                    <th scope="row" >Reciever Phone</th>
                     <td><?php echo $row['rec_no'];?></td>
                    </tr>
                    <tr>
                    <th scope="row" >Reciever Address</th>
                     <td><?php echo $row['rec_address'];?></td>
                    </tr>
                    <tr>
                    <th scope="row" >Source Branch</th>
                     <td><?php echo $row['srcbranch'];?></td>
                    </tr>
                    <tr>
                    <th scope="row" >Destination Branch</th>
                     <td><?php echo $row['dstbranch'];?></td>
                    </tr>
                    <tr>
                    <th scope="row" >Courier Weight</th>
                     <td><?php echo $row['cou_weight'];?></td>
                    </tr>
                    <tr>
                    <tr>
                    <th scope="row" >Courier Height</th>
                     <td><?php echo $row['height'];?></td>
                    </tr>
                    <tr>
                    <th scope="row" >Courier Length</th>
                     <td><?php echo $row['length'];?></td>
                    </tr>
                    <tr>
                    <th scope="row" >Courier Width</th>
                     <td><?php echo $row['width'];?></td>
                    </tr>
                    <tr>
                    <th scope="row" >Courier Fee</th>
                     <td><?php echo $row['cou_fee'];?></td>
                    </tr>
                    <tr>
                    <th scope="row" >Status</th>
                     <td><?php echo $row['status'];?></td>
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
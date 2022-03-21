
<?php
include_once 'db.php';
$id = $_GET['id'];
if(isset($_POST['submit'])){
$sql="UPDATE couriers set courier_id='". $_POST['courierid'] ."', send_name='". $_POST['senname'] ."', send_no='". $_POST['senphone'] ."', send_address='". $_POST['senaddress'] ."', rec_name='". $_POST['recname'] ."', rec_no='". $_POST['recphone'] ."', rec_address='". $_POST['recaddress'] ."', cou_weight='". $_POST['weight'] ."', height='". $_POST['height'] ."', length='". $_POST['length'] ."', width='". $_POST['width'] ."', cou_fee='". $_POST['fees'] ."', status='". $_POST['status'] ."'  WHERE id=$id";
$result= mysqli_query($conn,$sql);
$message = "Record Modified Successfully";
}
$res = mysqli_query($conn,"SELECT * FROM couriers WHERE id=$id");
$row= mysqli_fetch_array($res);
?>
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
<?php require 'nav3.php'; ?>
<h1 style="text-align:center;margin-top:20px;">EDIT COURIER DETAILS</h1>
<form class="row g-3" style="width:60%;margin-left:21%;margin-top:10px;height:850px;background:#fff;padding:30px;" method="POST" action="">
<div><?php if(isset($message)) { echo $message; } ?></div>
  <div class="col-md-12">
    <label for="inputEmail4" class="form-label">Courier id</label>
    <input type="text" name="courierid" class="form-control" id="inputEmail4" value="<?php echo $row['courier_id'];?>">
  </div>
  <div class="col-md-6">
    <label for="inputPassword4" class="form-label">Sender Name</label>
    <input type="text" name="senname" class="form-control" id="inputPassword4" value="<?php echo $row['send_name'];?>">
  </div>
  <div class="col-md-6">
    <label for="inputPassword4" class="form-label">Sender Phone </label>
    <input type="text" name="senphone" class="form-control" id="inputPassword4" value="<?php echo $row['send_no'];?>">
  </div>
  <div class="col-md-12">
    <label for="inputPassword4" class="form-label">Sender Address</label>
    <input type="text" name="senaddress" class="form-control" id="inputPassword4" value="<?php echo $row['send_address'];?>">
  </div>
  <div class="col-md-6">
    <label for="inputPassword4" class="form-label">Reciever Name</label>
    <input type="text" name="recname" class="form-control" id="inputPassword4" value="<?php echo $row['rec_name'];?>">
  </div>
  <div class="col-md-6">
    <label for="inputPassword4" class="form-label">Reciever Phone </label>
    <input type="text" name="recphone" class="form-control" id="inputPassword4" value="<?php echo $row['rec_no'];?>" >
  </div>
  <div class="col-md-12">
    <label for="inputPassword4" class="form-label">Reciever Address</label>
    <input type="text" name="recaddress" class="form-control" id="inputPassword4" value="<?php echo $row['rec_address'];?>">
  </div>
            <h4>Courier Details</h4>
            <div class="col-md-3">
    <label for="inputPassword4" class="form-label">Weight</label>
    <input type="text" name="weight" class="form-control" id="inputPassword4" value="<?php echo $row['cou_weight'];?>">
  </div>
  <div class="col-md-3">
    <label for="inputPassword4" class="form-label">Height</label>
    <input type="text" name="height" class="form-control" id="inputPassword4" value="<?php echo $row['height'];?>">
  </div>
  <div class="col-md-3">
    <label for="inputPassword4" class="form-label">Length</label>
    <input type="text" name="length" class="form-control" id="inputPassword4" value="<?php echo $row['length'];?>">
  </div>
  <div class="col-md-3">
    <label for="inputPassword4" class="form-label">Width</label>
    <input type="text" name="width" class="form-control" id="inputPassword4" value="<?php echo $row['width'];?>">
  </div>
  <div class="col-md-4">
    <label for="inputPassword4" class="form-label">Fees</label>
    <input type="text" name="fees" class="form-control" id="inputPassword4" value="<?php echo $row['cou_fee'];?>">
  </div>
  <div class="col-md-4">
    <label for="inputState" class="form-label">Status</label>
    <select id="inputState" class="form-select" name="status" >
      <option selected>Registered</option>
      <option>Shipped</option>
      <option>Out for delivery</option>
      <option>Delivered</option>
    </select>
  </div>
  <div class="col-12">
    <button type="submit" name="submit" class="btn btn-primary">SUBMIT</button>
  </div>
</form>
	</div>
</body>
</html>

<script>
        if ( window.history.replaceState ) {
            window.history.replaceState( null, null, window.location.href );
    }
</script>

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
<h1 style="text-align:center;margin-top:20px;">ADD NEW COURIER DETAILS</h1>
<form class="row g-3" style="width:60%;margin-left:21%;margin-top:10px;height:850px;background:#fff;padding:30px;" method="POST" action="">
  <div class="col-md-12">
    <label for="inputEmail4" class="form-label">Courier id</label>
    <input type="text" name="courierid" class="form-control" id="inputEmail4">
  </div>
  <div class="col-md-6">
    <label for="inputPassword4" class="form-label">Sender Name</label>
    <input type="text" name="senname" class="form-control" id="inputPassword4">
  </div>
  <div class="col-md-6">
    <label for="inputPassword4" class="form-label">Sender Phone </label>
    <input type="text" name="senphone" class="form-control" id="inputPassword4">
  </div>
  <div class="col-md-12">
    <label for="inputPassword4" class="form-label">Sender Address</label>
    <input type="text" name="senaddress" class="form-control" id="inputPassword4">
  </div>
  <div class="col-md-6">
    <label for="inputPassword4" class="form-label">Reciever Name</label>
    <input type="text" name="recname" class="form-control" id="inputPassword4">
  </div>
  <div class="col-md-6">
    <label for="inputPassword4" class="form-label">Reciever Phone </label>
    <input type="text" name="recphone" class="form-control" id="inputPassword4">
  </div>
  <div class="col-md-12">
    <label for="inputPassword4" class="form-label">Reciever Address</label>
    <input type="text" name="recaddress" class="form-control" id="inputPassword4">
  </div>
  <div class="col-md-6">
    <label for="inputState" class="form-label">Select Source branch</label>
    <select id="inputState" class="form-select" name="srcbranch_code">
      <option selected>Choose...</option>
      <?php 
      $sql= "SELECT *from centers";
      $details_query = mysqli_query($conn,$sql);
      if($details_query){
        if(mysqli_num_rows($details_query) > 0){
          while($row = mysqli_fetch_array($details_query)){
		        $branch_code = $row['branch_code'];
            $city = $row['city'];
      ?>
      <option><?php echo $branch_code, $city;?></option>
    <?php
	  } 
      }
        }
    ?>
    </select>
  </div>
  <div class="col-md-6">
    <label for="inputState" class="form-label">Select Pick up branch</label>
      <select id="inputState" class="form-select" name="dstbranch_code">
        <option selected>Choose...</option>
        <?php $sql= "SELECT *from centers";
          $details_query = mysqli_query($conn,$sql);
          if($details_query){
            if(mysqli_num_rows($details_query) > 0){
              while($row = mysqli_fetch_array($details_query)){
		            $branch_code = $row['branch_code'];
                $city = $row['city'];
        ?>
        <option><?php echo $branch_code, $city;?></option>
        <?php
	            }
            }
          }
	      ?>
      </select>
  </div>
  <h4>Courier Details</h4>
  <div class="col-md-3">
    <label for="inputPassword4" class="form-label">Weight</label>
    <input type="text" name="weight" class="form-control" id="inputPassword4">
  </div>
  <div class="col-md-3">
    <label for="inputPassword4" class="form-label">Height</label>
    <input type="text" name="height" class="form-control" id="inputPassword4">
  </div>
  <div class="col-md-3">
    <label for="inputPassword4" class="form-label">Length</label>
    <input type="text" name="length" class="form-control" id="inputPassword4">
  </div>
  <div class="col-md-3">
    <label for="inputPassword4" class="form-label">Width</label>
    <input type="text" name="width" class="form-control" id="inputPassword4">
  </div>
  <div class="col-md-12">
    <label for="inputPassword4" class="form-label">Fees</label>
    <input type="text" name="fees" class="form-control" id="inputPassword4">
  </div>
  <div class="col-12">
    <button type="submit" name="submit" class="btn btn-primary">SUBMIT</button>
  </div>
</form>
	</div>
</body>
</html>
<?php
    if((isset($_POST['submit']))){
      $courier = $_POST["courierid"]; 
      $sendername = $_POST["senname"];
      $senderphone = $_POST["senphone"];
      $senderaddress = $_POST["senaddress"];
      $recievername = $_POST["recname"];
      $recieverphone = $_POST["recphone"];
      $recieveraddress = $_POST["recaddress"];
      $srcbranch = $_POST["srcbranch_code"];
      $dstbranch = $_POST["dstbranch_code"];
      $weight = $_POST["weight"];
      $height = $_POST["height"];
      $length = $_POST["length"];
      $width = $_POST["width"];
      $fees = $_POST["fees"];
      $sql="INSERT INTO couriers (courier_id, send_name, send_no, send_address, rec_name, rec_no, rec_address, srcbranch, dstbranch, cou_weight, height, length, width, cou_fee) VALUES ('".$courier."','".$sendername."', '".$senderphone."','".$senderaddress."','".$recievername."','".$recieverphone."','".$recieveraddress."','".$srcbranch."','".$dstbranch."','".$weight."','".$height."','".$length."','".$width."','".$fees."')";
        //Execute the query and returning a message
        if(!$result = $conn->query($sql)){
            die('Error occured [' . $conn->error . ']');
        }
        else
            echo '<script> alert("Data added successfully")</script>';
        }
?>
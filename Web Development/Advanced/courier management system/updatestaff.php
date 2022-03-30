<?php
include_once 'db.php';
$id = $_GET['id'];
if(count($_POST)>0) {
mysqli_query($conn,"UPDATE users set username='" . $_POST['username'] . "', email='" . $_POST['email'] . "', branch_code='" . $_POST['branchcode'] . "' WHERE id=$id");
$message = "Record Modified Successfully";
}
$result = mysqli_query($conn,"SELECT * FROM users WHERE id=$id");
$row= mysqli_fetch_array($result);
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
<?php require 'nav2.php'; ?>
<h1 style="text-align:center;margin-top:20px;">UPDATE THE STAFF DETAILS</h1>
<div class="container" style="width:40%;margin-left:30%;margin-top:60px;height:380px;background:#fff;padding:30px;">
        <form action="" method="POST" class="row g-3">
        <div><?php if(isset($message)) { echo $message; } ?></div>
            <div class="col-12">
                <label for="inputEmail" class="form-label">Username</label>
                <input type="text" name="username" class="form-control" id="inputEmail" value="<?php echo $row['username'];?>">
            </div>
            <div class="col-12">
                <label for="inputAddress2" class="form-label">Email</label>
                <input type="email" name="email" class="form-control" id="inputpassword" value="<?php echo $row['email'];?>">
            </div>
            <div class="col-12">
                <label for="inputAddress2" class="form-label">Branch code</label>
                <input type="text" name="branchcode" class="form-control" id="inputpassword" value="<?php echo $row['branch_code'];?>">
            </div>
            <div class=" d-grid gap-2 col-12">
                <button type="submit" name="submit" class="btn btn-primary" >Update</button>
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
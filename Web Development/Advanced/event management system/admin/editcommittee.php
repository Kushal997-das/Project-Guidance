<?php 
include 'db.php';
$id = $_GET['id'];
if(count($_POST)>0) {
mysqli_query($conn,"UPDATE comitees set comitee_id='" . $_POST['comittee_id'] . "', name='" . $_POST['comittee_name'] . "', email='" . $_POST['email'] . "'  WHERE id=$id");
$message = "Record Modified Successfully";
}
$result = mysqli_query($conn,"SELECT * FROM comitees WHERE id=$id");
$row= mysqli_fetch_array($result);
?>
<!doctype html>
<html lang="en">
  <head>
  	<title></title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800,900" rel="stylesheet">
		
		<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
		<link rel="stylesheet" href="css/style.css">
  </head>
  <body style="background-color:#F3F6F9">
		
		<div class="wrapper d-flex align-items-stretch">
			<nav id="sidebar">
				<?php require 'nav.php'; ?>

        <!-- Page Content  -->
      <div id="content" class="p-4 p-md-5 pt-5">
        <div class="bd" >
        <h2 class="mb-4">EDIT DETAILS</h2>
        <div class="container" style="width:90%;border: 3px solid #b3b3b3;height:450PX;padding:30px;border-radius:20px;">
        <div><?php if(isset($message)) { echo $message; } ?></div>
        <form class="row g-3" style="font-size:18px;" action="" method="POST">
        
  <div class="col-md-6" >
    <label for="inputEmail4" class="form-label" >Comittee id</label>
    <input type="text" class="form-control" name="comittee_id" id="inputEmail4" value="<?php echo $row['comitee_id'];?>" style="border:1px solid #bfbfbf;font-size:17px;">
  </div>
  <div class="col-md-6">
    <label for="inputPassword4" class="form-label">Comittee name</label>
    <input type="text" class="form-control" name="comittee_name" id="inputPassword4" value="<?php echo $row['name'];?>"style="border:1px solid #bfbfbf;font-size:17px;">
  </div>
  <div class="col-12">
    <label for="inputAddress" class="form-label">Email</label>
    <input type="email" class="form-control" name="email" id="inputAddress" value="<?php echo $row['email'];?>" style="border:1px solid #bfbfbf;font-size:17px;">
  </div>
  
  <div class="col-12" style="margin-top:30px;">
    <button type="submit" name="submit" class="btn btn-primary">Submit</button>
  </div>
</form>
</div>
      </div>
      
		</div>
</div>
    <script src="js/jquery.min.js"></script>
    <script src="js/popper.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/main.js"></script>
  </body>
</html>

<script>
        if ( window.history.replaceState ) {
            window.history.replaceState( null, null, window.location.href );
    }
</script>
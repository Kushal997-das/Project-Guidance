<?php 
include 'db.php';
session_start();

if (!isset($_SESSION['username'])) {
  header("Location: adminlogin.php");
}
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
        <h2 class="mb-4">ALL COMITTEES</h2>
        <button type="button" class="btn btn-primary" style="float:right;margin-bottom:20px;"> <a href="addcomitee.php" style="color:#fff;">New Committee</a></button>
        <table class="table">
  <thead>
    <tr style="font-size:16px;">
      <th scope="col">Code</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Details</th>
      <th scope="col">Edit </th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  <tbody>
  <?php
  $sql= "SELECT *from comitees";
    $details_query = mysqli_query($conn,$sql);
    if($details_query){
        if(mysqli_num_rows($details_query) > 0){
          while($row = mysqli_fetch_array($details_query)){
    ?>
    <tr style="font-size:15px;">
      <td scope="row"><?php echo $row['comitee_id']; ?></td>
      <td><?php echo $row['name']; ?></td>
      <td><?php echo $row['email']; ?></td>
      <td><button type="button" class="btn btn-secondary" ><a href="viewmem.php?id=<?php echo $row["id"]; ?>" style="color:#fff;">Details</a> </button></td>
      <!-- Button trigger modal -->
          <td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter<?php echo $row["id"]; ?>">
  Edit
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModalCenter<?php echo $row["id"]; ?>" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <form class="row g-3" style="font-size:18px;" action="" method="POST">
      <div class="col-md-12" >
          <label for="inputEmail4" class="form-label" style="display:none;" >SL no</label>
          <input type="text" class="form-control" name="id" id="inputEmail4" value="<?php echo $row['id'];?>" style="border:1px solid #bfbfbf;font-size:17px;display:none;">
        </div>
        <div class="col-md-12" >
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
      //footer

    </div>
  </div>
</div></td>
      <td><button type="button" class="btn btn-danger" ><a href="#" style="color:#fff;">Delete</a> </button></td>
      
    </tr>
  </tbody>
  <?php

	}
}
    }
	?>
</table>
      </div>
		</div>
</div>
    <script src="js/jquery.min.js"></script>
    <script src="js/popper.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/main.js"></script>
  </body>
</html>
<?php 
if(isset($_POST['submit'])) {
  $comittee_id = $_POST["comittee_id"]; 
      $comittee_name = $_POST["comittee_name"];
      $email = $_POST["email"];
      $password = $_POST["password"];
$id=$_POST["id"];
$sql="UPDATE comitees set comitee_id='" . $comittee_id . "', name='" . $comittee_name . "', email='" . $email . "'  WHERE id=$id";
mysqli_query($conn,$sql);
$message = "Record Modified Successfully";
}

?>


<script>
        if ( window.history.replaceState ) {
            window.history.replaceState( null, null, window.location.href );
    }
</script>


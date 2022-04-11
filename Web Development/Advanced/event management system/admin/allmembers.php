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
        <h2 class="mb-4">All members</h2>
        <button type="button" class="btn btn-primary" style="float:right;margin-bottom:20px;"> <a href="addmember.php" style="color:#fff;">New Member</a></button>
        <table class="table">
  <thead>
    <tr style="font-size:16px;">
      <th scope="col">Members  id</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Committee</th>
      <th scope="col">Role</th>
      <th scope="col">Edit</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  <tbody>
  <?php
  $sql= "SELECT *from members order by mem_id ";
    $details_query = mysqli_query($conn,$sql);
    if($details_query){
        if(mysqli_num_rows($details_query) > 0){
          while($row = mysqli_fetch_array($details_query)){
    ?>
    <tr style="font-size:14px;">
      <td scope="row"><?php echo $row['mem_id']; ?></td>
      <td><?php echo $row['name']; ?></td>
      <td><?php echo $row['email']; ?></td>
      <td><?php echo $row['comm']; ?></td>
      <td><?php echo $row['role']; ?></td>
      <!-- Button trigger modal -->
          <td><button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter<?php echo $row["id"]; ?>">
  Edit
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModalCenter<?php echo $row["id"]; ?>" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Edit Details</h5>
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
          <label for="inputEmail4" class="form-label" >Member id</label>
          <input type="text" class="form-control" name="member_id" id="inputEmail4" value="<?php echo $row['mem_id'];?>" style="border:1px solid #bfbfbf;font-size:17px;">
        </div>
        <div class="col-md-12">
          <label for="inputPassword4" class="form-label">Member name</label>
          <input type="text" class="form-control" name="member_name" id="inputPassword4" value="<?php echo $row['name'];?>"style="border:1px solid #bfbfbf;font-size:17px;">
        </div>
        <div class="col-12">
          <label for="inputAddress" class="form-label">Email</label>
          <input type="email" class="form-control" name="email" id="inputAddress" value="<?php echo $row['email'];?>" style="border:1px solid #bfbfbf;font-size:17px;">
        </div>
        <div class="col-md-12" style="margin-bottom:12%;height:22px;">
                <label for="inputState" class="form-label">Role</label>
                <div></div>
                <select id="inputState" class="form-select" name="role" style="border:1px solid #bfbfbf;padding:9px;width:100%;">
                    <option selected style="border:1px solid #bfbfbf;border-radius:20px;font-size:15px;color:#333333;padding:13px;">Choose...</option>
                    
                    <option style="border:1px solid #bfbfbf;font-size:15px;color:#333333">Chairman</option>
                    <option style="border:1px solid #bfbfbf;font-size:15px;color:#333333">Vice Chairman</option>
                    <option style="border:1px solid #bfbfbf;font-size:15px;color:#333333">Secretary</option>
                    <option style="border:1px solid #bfbfbf;font-size:15px;color:#333333">Director</option>
                    <option style="border:1px solid #bfbfbf;font-size:15px;color:#333333">Member</option>
                    
                </select>
            </div>
        <div class="col-12" style="margin-top:30px;">
          <button type="submit" name="submit1" class="btn btn-primary">Submit</button>
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
if(isset($_POST['submit1'])) {
  $member_id = $_POST["member_id"]; 
      $email = $_POST["email"];
      $name = $_POST["member_name"];
      $password = $_POST["password"];
      $committee = $_POST["committee"];
      $role = $_POST["role"];
      $code = $_POST["code"];
$id=$_POST["id"];
$sql="UPDATE members set mem_id='" . $member_id . "', name='" . $name . "', email='" . $email . "', role='" . $role . "'  WHERE id=$id";
mysqli_query($conn,$sql);
$message = "Record Modified Successfully";
}

?>


<script>
        if ( window.history.replaceState ) {
            window.history.replaceState( null, null, window.location.href );
    }
</script>


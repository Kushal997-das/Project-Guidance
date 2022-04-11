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
        <h2 class="mb-4" style="text-align:center;">ADD MEMBER</h2>
        <div class="container" style="width:55%;border: 3px solid #b3b3b3;height:490PX;padding:40px;border-radius:20px;">
        <form class="row g-3" style="font-size:18px;" action="" method="POST">
  <div class="col-md-6" >
    <label for="inputEmail4" class="form-label" >Member id</label>
    <input type="text" class="form-control" name="member_id" id="inputEmail4" style="border:1px solid #bfbfbf;font-size:15px;color:#333333">
  </div>
  <div class="col-md-6">
    <label for="inputAddress" class="form-label">Email</label>
    <input type="email" class="form-control" name="email" id="inputAddress" placeholder="1234 Main St" style="border:1px solid #bfbfbf;font-size:15px;color:#333333">
  </div>
  <div class="col-md-12">
    <label for="inputPassword4" class="form-label">Name</label>
    <input type="text" class="form-control" name="member_name" id="inputPassword4" style="border:1px solid #bfbfbf;font-size:15px;color:#333333">
  </div>
  <div class="col-md-12" >
    <label for="inputAddress2" class="form-label">Password</label>
    <input type="password" class="form-control" name="password" id="inputAddress2" placeholder="Apartment, studio, or floor" style="border:1px solid #bfbfbf">
  </div>
  <div class="col-md-6" style="margin-top:4%;margin-bottom:12%;height:22px;">
                <label for="inputState" class="form-label">Choose Committee</label>
                <div></div>
                <select id="inputState" class="form-select" name="committee" style="border:1px solid #bfbfbf;padding:9px;width:100%;">
                    <option selected style="border:1px solid #bfbfbf;border-radius:20px;font-size:15px;color:#333333;padding:13px;">Choose...</option>
                    <?php $sql= "SELECT *from comitees";
                    $details_query = mysqli_query($conn,$sql);
                    if($details_query){
                        if(mysqli_num_rows($details_query) > 0){
                            while($row = mysqli_fetch_array($details_query)){
                                $name = $row['name'];
                    ?>
                    <option style="border:1px solid #bfbfbf;font-size:15px;color:#333333"><?php echo $name ?></option>
                    <?php
                    }
                }
            }
            ?>
                </select>
            </div>
            <div class="col-md-6" style="margin-top:4%;margin-bottom:12%;height:22px;">
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
<?php
    if((isset($_POST['submit']))){
      $member_id = $_POST["member_id"]; 
      $email = $_POST["email"];
      $name = $_POST["member_name"];
      $password = $_POST["password"];
      $committee = $_POST["committee"];
      $role = $_POST["role"];
      $code = $_POST["code"];
        //Query to insert data to the database
        $sql="INSERT INTO members (mem_id, email, name, password, comm, role, code) VALUES ('".$member_id."','".$email."','".$name."', '".$password."', '".$committee."',  '".$role."',  '".$code."')";
        //Execute the query and returning a message
        if(!$result = $conn->query($sql)){
            die('Error occured [' . $conn->error . ']');
        }
        else
            echo '<script> alert("Data inserted successfully")</script>';
        }
?>
<script>
        if ( window.history.replaceState ) {
            window.history.replaceState( null, null, window.location.href );
    }
</script>
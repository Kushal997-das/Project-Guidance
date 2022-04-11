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
        <h2 class="mb-4" style="text-align:center;">Add Meeting center</h2>
        <div class="container" style="width:50%;border: 3px solid #b3b3b3;height:490PX;padding:40px;border-radius:20px;">
        <form class="row g-3" style="font-size:18px;" action="" method="POST" enctype="multipart/form-data">
  <div class="col-md-12" >
    <label for="inputEmail4" class="form-label" >Room no</label>
    <input type="text" class="form-control" name="room_no" id="inputEmail4" style="border:1px solid #bfbfbf;font-size:15px;color:#333333">
  </div>
  <div class="col-md-12" >
    <label for="inputEmail4" class="form-label" >Select Image</label>
    <input type="file" class="form-control" name="image" accept="image/*" id="inputEmail4" style="border:1px solid #bfbfbf;font-size:15px;color:#333333">
  </div>
  <div class="col-md-12">
    <label for="inputAddress" class="form-label">No of seats</label>
    <input type="text" class="form-control" name="seat_no" id="inputAddress" placeholder="1234 Main St" style="border:1px solid #bfbfbf;font-size:15px;color:#333333">
  </div>
  
            <div class="col-md-12" style="margin-top:4%;margin-bottom:12%;height:22px;">
                <label for="inputState" class="form-label">Select center type</label>
                <div></div>
                <select id="inputState" class="form-select" name="type" style="border:1px solid #bfbfbf;padding:9px;width:100%;">
                    <option selected style="border:1px solid #bfbfbf;border-radius:20px;font-size:15px;color:#333333;padding:13px;">Choose...</option>
                    
                    <option style="border:1px solid #bfbfbf;font-size:15px;color:#333333">Meeting Room</option>
                    <option style="border:1px solid #bfbfbf;font-size:15px;color:#333333">Auditorium</option>
                    
                </select>
            </div>
            
  
  
  <div class="col-12" style="margin-top:30px;">
    <button type="submit" name="submit" class="btn btn-primary" value="Upload">Submit</button>
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
$status = $statusMsg = '';
    if((isset($_POST['submit']))){

      $room_no = $_POST["room_no"]; 
      $seat_no = $_POST["seat_no"];
      $type = $_POST["type"];
      $status = 'error'; 
    if(!empty($_FILES["image"]["name"])) { 
        // Get file info 
        $fileName = basename($_FILES["image"]["name"]); 
        $fileType = pathinfo($fileName, PATHINFO_EXTENSION); 
         $folder="images/".$fileName;
        // Allow certain file formats 
       
        //Query to insert data to the database
        $sql="INSERT INTO meet_centers (room_no, image, seat_no, center_type) VALUES ('".$room_no."','".$folder."','".$seat_no."', '".$type."')";
        //Execute the query and returning a message
        if(!$result = $conn->query($sql)){
            die('Error occured [' . $conn->error . ']');
        }
        else
            echo '<script> alert("Data inserted successfully")</script>';
        }
} 

// Display status message 
echo $statusMsg;
     
?>
<script>
        if ( window.history.replaceState ) {
            window.history.replaceState( null, null, window.location.href );
    }
</script>
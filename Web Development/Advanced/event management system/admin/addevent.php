<?php 
include 'db.php';
session_start();

if (!isset($_SESSION['username'])) {
  header("Location: adminlogin.php");}
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
  <body>
		
		<div class="wrapper d-flex align-items-stretch">
			<nav id="sidebar">
				<?php require 'nav.php'; ?>	

        <!-- Page Content  -->
        <div id="content" class="p-4 p-md-5 pt-5">
        <div class="bd" >
        <h2 class="mb-4">ADD Event</h2>
        <div class="container" style="width:75%;border: 3px solid #b3b3b3;height:860PX;padding:30px;border-radius:20px;">
        <form class="row g-3" style="font-size:18px;" action="" method="POST">
  <div class="col-md-12" >
    <label for="inputEmail4" class="form-label" >Event id</label>
    <input type="text" class="form-control" name="event_id" id="inputEmail4" style="border:1px solid #bfbfbf">
  </div>
  <div class="col-md-12">
    <label for="inputPassword4" class="form-label">Event name</label>
    <input type="text" class="form-control" name="event_name" id="inputPassword4" style="border:1px solid #bfbfbf">
  </div>
  <div class="col-md-4">
    <label for="inputAddress" class="form-label">Date</label>
    <input type="date" class="form-control" name="date" id="inputAddress" placeholder="1234 Main St" style="border:1px solid #bfbfbf;">
  </div>
  <div class="col-md-4">
    <label for="inputPassword4" class="form-label">No of attendees</label>
    <input type="text" class="form-control" name="attendees" id="inputPassword4" style="border:1px solid #bfbfbf">
  </div>
  <div class="col-md-4">
    <label for="inputPassword4" class="form-label">Food arrangements</label>
    <input type="text" class="form-control" name="food" id="inputPassword4" style="border:1px solid #bfbfbf">
  </div>
  <div class="col-md-12" >
    <label for="inputEmail4" class="form-label" >Event Poster</label>
    <input type="file" class="form-control" name="image" accept="image/*" id="inputEmail4" style="border:1px solid #bfbfbf;font-size:15px;color:#333333">
  </div>
  <div class="col-md-6">
    <label for="inputAddress2" class="form-label">Start time</label>
    <input type="time" class="form-control" name="starttime" id="inputAddress2" placeholder="Apartment, studio, or floor" style="border:1px solid #bfbfbf">
  </div>
  <div class="col-md-6">
    <label for="inputAddress2" class="form-label">End time</label>
    <input type="time" class="form-control" name="endtime" id="inputAddress2" placeholder="Apartment, studio, or floor" style="border:1px solid #bfbfbf">
  </div>
  <div class="col-md-12" style="margin-top:4%;margin-bottom:12%;height:22px;">
                <label for="inputState" class="form-label">Event Type</label>
                <div></div>
                <select id="inputState" class="form-select" name="eventtype" style="border:1px solid #bfbfbf;padding:9px;width:100%;">
                    <option selected style="border:1px solid #bfbfbf;border-radius:20px;font-size:15px;color:#333333;padding:13px;">Choose...</option>
                    
                    <option style="border:1px solid #bfbfbf;font-size:15px;color:#333333">Announcements</option>
                    <option style="border:1px solid #bfbfbf;font-size:15px;color:#333333">Workshops</option>
                    <option style="border:1px solid #bfbfbf;font-size:15px;color:#333333">Conference</option>
                    
                </select>
            </div>
            <div class="col-md-4" style="margin-top:4%;margin-bottom:12%;height:22px;">
                <label for="inputState" class="form-label">Meeting center</label>
                <div></div>
                <select id="inputState" class="form-select" name="meetcenter" style="border:1px solid #bfbfbf;padding:9px;width:100%;">
                    <option selected style="border:1px solid #bfbfbf;border-radius:20px;font-size:15px;color:#333333;padding:13px;">Choose...</option>
                    <?php $sql= "SELECT *from meet_centers";
                    $details_query = mysqli_query($conn,$sql);
                    if($details_query){
                        if(mysqli_num_rows($details_query) > 0){
                            while($row = mysqli_fetch_array($details_query)){
                                $name = $row['room_no'];
                    ?>
                    <option style="border:1px solid #bfbfbf;font-size:15px;color:#333333"><?php echo $name ?></option>
                    <?php
                    }
                }
            }
            ?>
            </select>
            </div>
            <div class="col-md-4" style="margin-top:4%;margin-bottom:12%;height:22px;">
                <label for="inputState" class="form-label">Choose Committee</label>
                <div></div>
                <select id="inputState" class="form-select" name="committee1" style="border:1px solid #bfbfbf;padding:9px;width:100%;">
                    <option selected style="border:1px solid #bfbfbf;border-radius:20px;font-size:15px;color:#333333;padding:13px;">Choose...</option>
                    <?php $sql= "SELECT *from comitees";
                    $details_query = mysqli_query($conn,$sql);
                    if($details_query){
                        if(mysqli_num_rows($details_query) > 0){
                            while($row = mysqli_fetch_array($details_query)){
                                $name = $row['comitee_id'];
                    ?>
                    <option style="border:1px solid #bfbfbf;font-size:15px;color:#333333"><?php echo $name ?></option>
                    <?php
                    }
                }
            }
            ?>
                </select>
            </div>
            <div class="col-md-4" style="margin-top:4%;margin-bottom:12%;height:22px;">
                <label for="inputState" class="form-label">Choose Committee</label>
                <div></div>
                <select id="inputState" class="form-select" name="committee2" style="border:1px solid #bfbfbf;padding:9px;width:100%;">
                    <option selected style="border:1px solid #bfbfbf;border-radius:20px;font-size:15px;color:#333333;padding:13px;">Choose...</option>
                    <?php $sql= "SELECT *from comitees";
                    $details_query = mysqli_query($conn,$sql);
                    if($details_query){
                        if(mysqli_num_rows($details_query) > 0){
                            while($row = mysqli_fetch_array($details_query)){
                                $name = $row['comitee_id'];
                    ?>
                    <option style="border:1px solid #bfbfbf;font-size:15px;color:#333333"><?php echo $name ?></option>
                    <?php
                    }
                }
            }
            ?>
                </select>
            </div>
            <div class="col-md-6">
    <label for="inputPassword4" class="form-label">Additional information</label>
    <input type="text" class="form-control" name="info" id="inputPassword4" style="border:1px solid #bfbfbf">
  </div>
  <div class="col-md-6" style="margin-top:%;margin-bottom:12%;height:22px;">
                <label for="inputState" class="form-label">Event Status</label>
                <div></div>
                <select id="inputState" class="form-select" name="status" style="border:1px solid #bfbfbf;padding:9px;width:100%;">
                    <option selected style="border:1px solid #bfbfbf;border-radius:20px;font-size:15px;color:#333333;padding:13px;">Choose...</option>
                    
                    <option style="border:1px solid #bfbfbf;font-size:15px;color:#333333">Scheduled</option>
                    <option style="border:1px solid #bfbfbf;font-size:15px;color:#333333">Completed</option>
                    
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
      $event_id = $_POST["event_id"]; 
      $event_name = $_POST["event_name"];
      $date = $_POST["date"];
      $attendees = $_POST["attendees"];
      $food = $_POST["food"];
      $image = $_POST["image"];
      $starttime = $_POST["starttime"];
      $endtime = $_POST["endtime"];
      $type = $_POST["eventtype"];
      $meetcenter = $_POST["meetcenter"];
      $committee1 = $_POST["committee1"];
      $committee2 = $_POST["committee2"];
      $info = $_POST["info"];
      $status= $_POST["status"];
        //Query to insert data to the database
        $sql="INSERT INTO events (eventid, eventname, date, attendees, food, image, starttime, endtime, eventype, meetcenter, comitee1, comitee2, info, status) VALUES ('".$event_id."','".$event_name."','".$date."', '".$attendees."', '".$food."',  '".$image."',  '".$starttime."',  '".$endtime."',  '".$type."',  '".$meetcenter."',  '".$committee1."',  '".$committee2."',  '".$info."',  '".$status."')";
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
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
      <h2 class="mb-4" style="margin-bottom:20px;">AICTE Overview</h2>
      <div class="row">
      <div class="col-md-3" style="margin-left:10px;margin-right:70px;" >
        <div class="card" style="width: 18rem;border: 2px solid #b3b3b3;">
  <div class="card-body">
  <img src="images/committee.jpg" style="width:130px; height:120px;margin-left:21.5%;">
    <h5 class="card-title" style="font-size:23px;">	Committees</h5>
    <div style="margin-top:10px;"></div>
    <h6 class="card-subtitle mb-2 text-muted" style="margin-top:10px;font-size:20px;">Total committees</h6>
    <?php
                $sql =" SELECT * from comitees";
               
                $result=mysqli_query($conn,$sql);
                $row=mysqli_num_rows($result);
              ?>
    <p class="card-text" style="font-size:16px;"><?php echo $row;?></p>
    <button type="button" class="btn btn-secondary" style="display:none"><a href="viemem.php?code=<?php echo 'EXEC';?>" style="color:#fff;display:none" >Members</a> </button></td>
  </div>
</div>
      </div>
      <div></div>
      <div class="col-md-3" >
        <div class="card" style="width: 18rem;border: 2px solid #b3b3b3;">
  <div class="card-body">
  <img src="images/members.png" style="width:130px; height:120px;margin-left:23.5%;">
    <h5 class="card-title" style="font-size:23px;">	Members</h5>
    <div style="margin-top:10px;"></div>
    <h6 class="card-subtitle mb-2 text-muted" style="margin-top:10px;font-size:20px;">Total members</h6>
    <?php
                $sql =" SELECT * from members";
               
                $result=mysqli_query($conn,$sql);
                $row=mysqli_num_rows($result);
              ?>
    <p class="card-text" style="font-size:16px;"><?php echo $row;?></p>
    <button type="button" class="btn btn-secondary" style="display:none"><a href="viemem.php?code=<?php echo 'EXEC';?>" style="color:#fff;display:none" >Members</a> </button></td>
  </div>
</div>
      </div>
</div>
        <h2 class="mb-4">Committees</h2>
        <div class="row">
        <?php
                $sql =" SELECT * from  comitees";
               
                $details_query = mysqli_query($conn,$sql);
    if($details_query){
        if(mysqli_num_rows($details_query) > 0){
          while($rows = mysqli_fetch_array($details_query)){
    ?>
            
          <div class="col-md-3" style="margin:35px;">
        <div class="card" style="width: 18rem;border: 2px solid #b3b3b3;">
  <div class="card-body">
    <h5 class="card-title" style="font-size:23px;"><?php echo $rows['name'];?></h5>
    <div style="margin-top:10px;"></div>
    <h6 class="card-subtitle mb-2 text-muted" style="margin-top:10px;font-size:20px;">Total Members</h6>
    <?php
    $name=$rows['name'];
                $sqli =" SELECT * from members where comm=$name ";
               
                $details_quer = mysqli_query($conn,$sqli);
                $result=mysqli_query($conn,$sql);
                $row=mysqli_num_rows($result);
    ?>
              
    <p class="card-text" style="font-size:16px;"><?php echo $row;?></p>
    
    <button type="button" class="btn btn-secondary" style="display:none"><a href="viemem.php?code=<?php echo 'EXEC';?>" style="color:#fff;display:none" >Members</a> </button></td>
  </div>
</div>
      </div>

	
        <?php

}
}
}
?>
    </div>
    </div>
    <script src="js/jquery.min.js"></script>
    <script src="js/popper.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/main.js"></script>
  </body>
</html>
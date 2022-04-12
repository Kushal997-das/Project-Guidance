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
    <style>
      .container .row{
        margin-top:30px;
      }
      .card-img-top {
    width: 100%;
    height: 200px;
    object-fit: cover;
}
      </style>
  </head>
  <body>
		
		<div class="wrapper d-flex align-items-stretch">
			<nav id="sidebar">
				<?php require 'nav.php'; ?>	

        <!-- Page Content  -->
      <div id="content" class="p-4 p-md-5 pt-5">
      <h2 class="mb-4" style="marggin-bottom:20px;">All Events</h2>
      <div class="row ">
            <div class="col" style="float:right;">
                <form method="POST" style="width:50%:" >
                    <div class="col-6">
                        <label for="inputsearch" class="form-label">Search here</label>
                        <input type="text" name="str" class="form-control" id="inputsearch" style="border:1px solid #bfbfbf">
                    </div>
                    <div class="col-6" style="margin-top:20px;margin-left:0%" class="form-label">
                        <button type="submit" name="submit" value="Search" class="btn btn-primary">Search</button>
                    </div>
                    
                </form>
            </div>
        </div>
      
      <div class="container" style="margin-bottom:30px;">
     <?php if(isset($_POST['submit'])){
                            $str1=$_POST['str'];
                            ?>
      <h2 style="text-align:center;"> <?php echo $str1; ?></h2>
      <?php
     }
      ?>
        <div class="row" style="margin:30px;">
        <?php
                        if(isset($_POST['submit'])){
                            $str1=$_POST['str'];
                            $str=mysqli_real_escape_string($conn,$_POST['str']);
                            $sql="SELECT * FROM events where eventype like '%$str%'  ";
                            $result=mysqli_query($conn,$sql);
                            if(mysqli_num_rows($result)>0){
                            while($row=mysqli_fetch_assoc($result)){
                                $image = $row['image'];
                               
                    ?>
            
            <div class="col-md-6" style="margin-top:20px;margin-bottom:20px;width:100%">
                    <div class="card" style="width: 100%;border:1px solid ;width:100%;">
              <div class="card-body">
                <h5 class="card-title">Event name:  <?php  echo $row['eventname'];?></h5>
              
                <p class="card-text" style="font-size:16px;">Event type :- <?php echo $row['eventype'];?></br> Event center :- <?php echo $row['meetcenter'];?></br>Date :- <?php echo $row['date'];?></br>Time :- <?php echo $row['starttime'];?>- <?php echo $row['endtime'];?></br></p>
                </div>
              </div>
            </div>
              <?php
        }
    }
}
else{
            
            
            $query = "SELECT * FROM events where eventype!='Workshops'";
            $query_run = mysqli_query($conn,$query);
            $number = mysqli_num_rows($query_run);
            $check_pets = mysqli_num_rows($query_run)>0;
            if($check_pets){
              
              while($row = mysqli_fetch_assoc($query_run))
              {
                $image = $row['image'];
                ?>
                <div class="col-md-6" style="margin-top:20px;margin-bottom:20px;width:100%">
                    <div class="card" style="width: 100%;border:1px solid ;width:100%;">
              <div class="card-body">
                <h5 class="card-title">Event name:  <?php  echo $row['eventname'];?></h5>
              
                <p class="card-text" style="font-size:16px;">Event type :- <?php echo $row['eventype'];?></br> Event center :- <?php echo $row['meetcenter'];?></br>Date :- <?php echo $row['date'];?></br>Time :- <?php echo $row['starttime'];?>- <?php echo $row['endtime'];?></br></p>
                </div>
              </div>
                            </div>
                <?php
                  
              }
            }
         }
          ?>
          </div>
          <div class="row">
<h2 style="float:center;">Workshops</h2>
        </div>
        <div class="row">
        
        <?php
        $query = "SELECT * FROM events where eventype='Workshops'";
            $query_run = mysqli_query($conn,$query);
            $number = mysqli_num_rows($query_run);
            $check_pets = mysqli_num_rows($query_run)>0;
            if($check_pets){
              
              while($row = mysqli_fetch_assoc($query_run))
              {
                $image = $row['image'];
                ?>
                <div class="col-md-4" style="margin-top:10px;margin-bottom:10px;width:100%">
                
            <div class="card" style="width: 100%;border:1px solid ;width:100%;">
            <img src="<?php echo $image; ?>" class="card-img-top" id="pet" alt="Card image cap" >
              <div class="card-body">
                <h5 class="card-title">Event name:  <?php  echo $row['eventname'];?></h5>
              
              <ul class="list-group list-group-flush">
              <li class="list-group-item"  name="id" > Event Date  <?php echo $row['date'];?></li>
                <li class="list-group-item">Time : <?php echo $row['starttime'];?>-<?php echo $row['endtime'];?></li>
    
              </ul>
                </div>
              </div>
              </div>
              <?php
              }}
              ?>
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
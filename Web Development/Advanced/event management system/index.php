<?php 

include 'db.php';

session_start();
if (isset($_SESSION['name'])){
    header("Location: commhome.php");
  }

error_reporting(0);
if (isset($_POST['submit'])) {
	$email = $_POST['email'];
	$password = ($_POST['password']);

	$sql = "SELECT * FROM members WHERE email='$email' AND password='$password'";
	$result = mysqli_query($conn, $sql);
	if ($result->num_rows > 0) {
		$row = mysqli_fetch_assoc($result);
		$_SESSION['name'] = $row['name'];
		header("Location: commhome.php");
        echo "<script>alert('Woops! Email or Password is Wrong.')</script>";
	} else {
		echo "<script>alert('Woops! Email or Password is Wrong.')</script>";
	}
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js" integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js" integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13" crossorigin="anonymous"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.4/css/fontawesome.min.css" integrity="sha384-jLKHWM3JRmfMU0A5x5AkjWkw/EYfGUAGagvnfryNV3F9VqM98XiIH7VBGVoxVSc7" crossorigin="anonymous">
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossorigin="anonymous">
    <title>Document</title>
    </head>
    <body style="background-image: url(images/bg.jpg);background-size: cover;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;height:440px;">
    <div class="register" style="height:50%;margin-top:7.5%;">
    <div class="container" style="width:70%;;border:1px solid #a6a6a6;border-radius: 2%;">
        <div class="row" style="background-color:#fff;height:420px;">
        <div class="col-md-6" style="background-image: linear-gradient(rgba(4,9,30,0.7),rgba(4,9,30,0.7)),url(images/login.jpg);background-size: cover;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;">
        <h1 style="padding-left:16%;padding-top:36%;color:#fff;font-family: Times New Roman, Times, serif;font-size: 40px;" > WELCOME BACK</h1>
            
        </div>
        <div class="col-md-6" >
            <form action="" method="POST" class="row g-3" style="margin-left:8%;margin-right:7%;width:90%;padding:4%;">
                <h3 style="text-align:center;font-family: Times New Roman, Times, serif;font-size:40px;">Login Here</h3>
                <div class="col-12">
                    <label for="inputFullname" >Email</label>
                    <input type="email" name="email" class="form-control" id="inputUsername" placeholder="Username" required>
                </div>
                <div class="col-12">
                    <label for="inputAddress2" class="form-label">Password</label>
                    <input type="password" name="password" class="form-control" id="inputpassword" placeholder="Enter password" required>
                </div>
                <div class=" d-grid gap-2 col-12">
                    <button type="submit" name="submit" class="btn " style="height:50px;background-color: #EEA412;font-family: Times New Roman, Times, serif;margin-top:12px;">Login </button>
                </div>
                
            </form>
            </div>
	</div>
    </div>
</div>

</body>
</html>
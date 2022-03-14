<?php
include 'db.php';
?>
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
<body style="background:#fff;">
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
<?php require 'nav1.php'; ?>
<section class="banner" id="banner">
    <div class="row" >
        <div class="col-7">
        <h1 style="font-size:70px;color:#737373;padding-left:30px;font-family: Times New Roman, Times, serif;">Ensure Intelligent and Fastest Delivery and Accelerate Business Growth</h1>
        </div>
    </div>
</section>
<div class="row" style="margin-top:px;">
    <div class="col-7">
    <img src="images/courier1.png" style="width:100%; height:600px;">
    </div>
    <div class="col-5" style="background:#4d4d4d;padding:60px;font-family: Arial, Helvetica, serif;">
    <h1 style="font-size:50px;color:#fff;padding-left:30px;font-weight:500;text-align:center;font-family: Times New Roman, Times, serif;">ABOUT </h1>
        <h2 style="font-size:30px;margin-top:40px;color:#fff;text-align:center;font-family: Times New Roman, Times, serif;">Easy couriers helps Courier, Express, and Parcel companies bring operational efficiency by ensuring on-time and accurate pick-ups and deliveries with complete visibility into operationsany time, anywhere.</h2>
    </div>
    <div class="row" style="margin-top:30px;background-image: linear-gradient(rgba(4,9,30,0.7),rgba(4,9,30,0.7)),url(images/courier2.jpg);background-size: cover;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;width:100%;height:400px;">
        <div class="content" style="margin-left:28%;">
        <h2 style="color:#fff;font-size:50px;font-family: Times New Roman, Times, serif;">FOR MORE INFORMATION</h2>
        <h4 style="color:#fff;font-size:30px;margin-left:17%;font-family: Times New Roman, Times, serif;">STAY IN TOUCH</h4>
    </div>
</div>
<div class="row">
<div class="col-6" style="height:500px;padding-left:200px;padding-top:80px;background:#d9d9d9;">
    <h3 style="font-family: Times New Roman, Times, serif;">GET IN TOUCH</h3>
    <div class="info" style="padding-left:60px;padding-top:20px;">
        <h5 style="font-family: Times New Roman, Times, serif;">Email</h5>
        <p style="font-family: Times New Roman, Times, serif;">easycouriers@gmail.com</p>
        <h5 style="font-family: Times New Roman, Times, serif;">Phone</h5>
        <p style="font-family: Times New Roman, Times, serif;">9695342879</p>
        <h5 style="font-family: Times New Roman, Times, serif;">Address</h5>
        <p style="font-family: Times New Roman, Times, serif;">Vishweshwaraya Building, 5th street, JP nagar, Bangalore-560073</p>
    </div>
</div>
<div class="col-6" style="height:500px;">
    <h1 style="text-align: center;font-family: Times New Roman, Times, serif;font-size:40px;font-weight:500;">CONTACT US</h1>
        <form method="post" action="" class="row g-3" style="width:70%; margin-left: 15%;margin-top:0px;">
            <div>
                <label for="inputName" class="form-label" style="font-family: Times New Roman, Times, serif;font-size:20px;">Name</label>
                <input type="text" name="Name" class="form-control" id="inputName" placeholder="Enter Name">
            </div>
            <div>
                <label for="inputEmail4" class="form-label" style="font-family: Times New Roman, Times, serif;font-size:20px;">Email</label>
                <input type="email" name="Email" class="form-control" id="inputEmail4" placeholder="Enter Mail id">
            </div>
            <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label" style="font-family: Times New Roman, Times, serif;font-size:20px;">Message</label>
                <textarea name="Message" class="form-control" id="exampleFormControlTextarea1" placeholder="Enter Message" rows="3"></textarea>
            </div>
            <div class="col-12">
                <button type="submit" name="submit" class="btn btn-primary" style="padding:5px; width:100%; align-items:center;font-family: Times New Roman, Times, serif;font-size:20px;">Submit</button>
            </div>
        </form> 
</div>
</div>
         <!-- To avoid resubmission on reload -->
    <script>
        if ( window.history.replaceState ) {
            window.history.replaceState( null, null, window.location.href );
    }
    </script>
</body>
</html>
<?php
    if((isset($_POST['submit']))){
      $name = $_POST["Name"]; 
      $email = $_POST["Email"];
      $message = $_POST["Message"];
        //Query to insert data to the database
        $sql="INSERT INTO contact_form (name, email, message) VALUES ('".$name."','".$email."', '".$message."')";
        //Execute the query and returning a message
        if(!$result = $conn->query($sql)){
            die('Error occured [' . $conn->error . ']');
        }
        else
            echo '<script> alert("Thank you! We will get in touch with you soon")</script>';
        }
?>
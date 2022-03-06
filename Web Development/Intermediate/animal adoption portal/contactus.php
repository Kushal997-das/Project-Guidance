<?php
    include('dbconfig.php'); //Database connection
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact form</title>
    <!---------bootstrap---->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-wEmeIV1mKuiNpC+IOBjI7aAzPcEZeedi5yW5f2yOq55WWLwNGmvvx4Um1vskeMj0" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-p34f1UUtsS3wqzfto5wAAmdvj+osOnFyQFpp4Ua3gs/ZVWx6oOypYoCJhGGScy+8" crossorigin="anonymous"></script>
    <style>
    *{
      margin: 0px;
      padding: 0px;
      box-sizing: border-box;
      font-family: 'poppins', sans-serif;
      
    }
    body{
      background-image: linear-gradient(rgba(4,9,30,0.7),rgba(4,9,30,0.7)),url(images/bg2.jpeg);
    background-repeat: no-repeat;
	background-size: cover;
    background-position: center;
    }
    .navbar-custom {
    background-color: #fff;
    color: #da214f;
}
.navbar-custom .navbar-brand,
.navbar-custom .navbar-text {
    color: #da214f
}
.navbar-custom .navbar-nav .nav-link {
    color: #da214f;
}
nav .navbar-nav{
  background: transparent;
  padding: 10px 8px;
}
    .navbar-nav {
      margin-left: auto;
      color: #da214f;
      font-size: 20px;
       font-weight: 550;
}
    nav .sticky{
      background: rgb(175, 166, 166);
      color: #da214f;
}
    .nav-item{
      margin-left: 7px;
      margin-right: 7px;
}
    .navbar-brand{
      font-size: 33px;
      font-weight: 660;
}
  .container .row{
      padding-top: 5px;
  }

  .card-img-top {
    width: 100%;
    height: 200px;
    object-fit: cover;
}
.btn{
    font-size: 1em;
    color: #fff;
    background: #da214f;
    display: inline-block;
    }
.btn:hover{
 color:#000;
 border-color: #000;
}
form{
  margin-bottom:30px;
}
h1{
    color:#fff;
}
label{
    color:#fff;
    font-weight:200;
    font-size:20px;
}

    </style>
</head>
<body>
<nav class="navbar navbar-custom navbar-expand-lg navbar-light sticky-top" style="color: red;">
      <div class="container">
        <a class="navbar-brand" href="#">PetKit</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item">
            <a class="nav-link" href="http://localhost/adoption%20portal/index.php">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="http://localhost/adoption%20portal/adopt.php">Adopt</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="http://localhost/adoption%20portal/faq.php">FAQs</a>
             </li>
                
                <li class="nav-item">
                  <a class="nav-link" href="http://localhost/adoption%20portal/contactus.php">Contact Us</a>
              </li>
            </li>
          </ul>
        </div>
      </div>
    </nav>
        <form method="post" action="" class="row g-3" style="width:40%; margin-left: 30%;margin-top:0px">
            <h1 style="text-align: center;">Contact us</h1>
            <div>
            <label for="inputName" class="form-label">Name</label>
            <input type="text" name="Name" class="form-control" id="inputName" placeholder="Enter Name">
        </div>
        <div>
            <label for="inputEmail4" class="form-label">Email</label>
            <input type="email" name="Email" class="form-control" id="inputEmail4" placeholder="Enter Mail id">
        </div>
        
        <div>
            <label for="inputPhone" class="form-label">Phone Number</label>
            <input type="text" name="Phone" class="form-control" id="inputPhone" placeholder="Phone">
        </div>
        <div class="mb-3">
  <label for="exampleFormControlTextarea1" class="form-label">Message</label>
  <textarea name="Message" class="form-control" id="exampleFormControlTextarea1" placeholder="Enter Message" rows="3"></textarea>
</div>
    <div class="col-12">
            <button type="submit" name="submit" class="btn btn-primary" style="padding:5px; width:100%; align-items:center;">Submit</button>
        </div>
        </form> 
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
      $phone = $_POST["Phone"];
      $message = $_POST["Message"];
        //Query to insert data to the database
        $sql="INSERT INTO contact_form (Name, Email, Phone, Message) VALUES ('".$name."','".$email."', '".$phone."', '".$message."')";
        //Execute the query and returning a message
        if(!$result = $connection->query($sql)){
            die('Error occured [' . $conn->error . ']');
        }
        else
            echo '<script> alert("Thank you! We will get in touch with you soon")</script>';
        }
?>
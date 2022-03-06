<?php
    include('dbconfig.php'); //Database connection
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <!---------bootstrao css------------>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" 
  integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
  <!----------------bootstrap jss-->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js" 
  integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf" crossorigin="anonymous"></script>
  <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css">
  <style>
    *{
      margin: 0px;
      padding: 0px;
      box-sizing: border-box;
      font-family: 'poppins', sans-serif;
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
.container .row .card{
  margin-top:10px;
  margin-bottom:20px;
}
button{
  float:right;
 color:#fff;
}
button:hover{
 color:#fff;
}
p{
 padding:5px;
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

    <div class="container">
        <div class="row">
          <?php
            require 'dbconfig.php';
            
            $query = "SELECT * FROM pets";
            $query_run = mysqli_query($connection,$query);
            $number = mysqli_num_rows($query_run);
            $check_pets = mysqli_num_rows($query_run)>0;
            if($check_pets){
              
              while($row = mysqli_fetch_assoc($query_run))
              {
                $image = $row['image'];
                $desc = $row['details'];
                $name = $row['name']  
                ?>
                <div class="col-sm-4">
                
            <div class="card" style="width: 100%">
            <img src="images/<?php echo $image;?>" class="card-img-top" id="pet" alt="Card image cap">
              <div class="card-body">
                <h5 class="card-title">Breed:- <?php  echo $row['breed'];?></h5>
              </div>
              <ul class="list-group list-group-flush">
              <li class="list-group-item"  name="id" >id: <?php echo $row['id'];?></li>
                <li class="list-group-item">Name: <?php echo $row['name'];?></li>
                <li class="list-group-item">Life span: <?php echo $row['life span'];?></li>
              </ul>
              <div class="card-body">
                <a class="btn bg-dark" style="color: #fff;"href="http://localhost/adoption%20portal/contact.php" role="button">Adopt</a>
  <!-- Button trigger modal -->
  <button type="button" class="btn bg-dark" data-bs-toggle="modal" data-bs-target="#exampleModal<?php echo $row['id']; ?>">More details </button>
<!-- Modal -->


<div class="modal fade" id="exampleModal<?php echo $row['id']; ?>" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">

  <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel"><?php echo $name;?></h5>
        
         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      
        <div class="modal-body">
          <img class="card-img-top" style="width: 100%;
    height: 200;
    object-fit: cover;"src="images/<?php echo $image;?>" class="img-fluid" alt="...">
       <p><?php echo $desc;?></p>
      </div>
      
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
       </div>
     </div>
  </div>
</div>

</div>
</div>
</div>
<?php
                  
               
        }
         }
            else{
              echo "No data  Found";
            }
          ?>
</div>
</div>
<footer class="bg-dark text-center text-white" >
        <div class="container p-4 pb-0">
          <section class="mb-4">
            <a class="btn btn-outline-light btn-floating m-1" style=" padding: 10px 20px;
            width: 6%;
            border-radius: 25px;" href="#!" role="button"
              ><i class="fab fa-facebook-f"></i
            ></a>
            <a class="btn btn-outline-light btn-floating m-1" style=" padding: 10px 20px;
            border-radius: 25px;
            width: 6%; "href="#!" role="button"
              ><i class="fab fa-twitter"></i
            ></a>
            <a class="btn btn-outline-light btn-floating m-1" style=" padding: 10px 20px;
            width: 6%;
            border-radius: 25px;"href="#!" role="button"
              ><i class="fab fa-instagram"></i
            ></a>
            <a class="btn btn-outline-light btn-floating m-1" style=" padding: 10px 20px;
            width: 6%;
            border-radius: 25px;" href="#!" role="button"
              ><i class="fab fa-linkedin-in"></i
            ></a>
            <a class="btn btn-outline-light btn-floating m-1" style="
            width: 6%;
            border-radius: 25px;
            size: 20px; padding: 10px 20px;"href="#!" role="button"
              ><i class="fab fa-github"></i
            ></a>
          </section>
        </div>
        <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
        © 2021 Copyright:
        <a class="text-white" href="http://localhost/adoption%20portal/index.php">PetKit</a>
        </div>
      </footer>

</body>
</html>
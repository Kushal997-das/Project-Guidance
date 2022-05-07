<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <!----------------bootstrap-js--------------->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <script defer src="https://use.fontawesome.com/releases/v5.0.2/js/all.js"></script>
    <link rel="stylesheet" href="style.css">
</head>
<body>
<nav class="navbar navbar-custom navbar-expand-lg navbar-light" >
    <?php 
    require 'nav.php';
    include 'db.php'; 
    ?>
    <?php
    $id = $_GET["myid"];
    $sql= "SELECT *from doctors WHERE id='$id'";
    $details_query = mysqli_query($conn,$sql);
    if($details_query){
        if(mysqli_num_rows($details_query) > 0){
          while($rows = mysqli_fetch_array($details_query)){
            $id = $rows['id'];
		$name = $rows['name'];
		$time = $rows['time'];
    ?>
    <p><strong><?php echo $name; ?></strong></p>
    <p><strong><?php echo $id; ?></strong></p>
    <!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <form class="row g-3" method="POST" action="
      ">
      <?php
    $id = $_GET["myid"];
    $sql= "SELECT *from doctors WHERE id='$id'";
    $details_query = mysqli_query($conn,$sql);
    if($details_query){
        if(mysqli_num_rows($details_query) > 0){
          while($rows = mysqli_fetch_array($details_query)){
            $id = $rows['id'];
		$name = $rows['name'];
		$time = $rows['time'];
    ?>
  <div class="col-md-6">
    <label for="inputName" class="form-label">Name</label>
    <input type="text" name="name" class="form-control" id="inputEmail4">
  </div>
  <div class="col-md-6">
    <label for="inputPhone" class="form-label">Email</label>
    <input type="email" name="email" class="form-control" id="inputPassword4">
  </div>
  <div class="col-6">
    <label for="inputPhone" class="form-label">Phone</label>
    <input type="text" name="phone" class="form-control" id="inputAddress" value="<?php echo $rows['name'];?>">
  </div>
  <div class="col-6">
    <label for="input" class="form-label">Course</label>
    <input type="text" class="form-control" id="inputAddress2" placeholder="">
  </div>
  <div class="col-md-4">
    <label for="inputCity" class="form-label">10th cgpa</label>
    <input type="text" class="form-control" id="inputCity" placeholder="">
  </div>
  <div class="col-md-4">
    <label for="inputCity" class="form-label">12th cgpa</label>
    <input type="text" class="form-control" id="inputCity" placeholder="If required">
  </div>
  <div class="col-md-4">
    <label for="inputCity" class="form-label">degree cgpa</label>
    <input type="text" class="form-control" id="inputCity" placeholder="If required">
  </div>
  <div class="col-md-6">
    <label for="inputCity" class="form-label">Upload file</label>
    <input type="file" class="form-control" id="inputCity" >
  </div>
  <div class="col-12">
    <button type="submit" name="submit" class="btn btn-primary">Sign in</button>
  </div>
</form>
<?php 
              }
            }
          }
        ?>
      </div>
    </div>
  </div>
</div>
    <?php
	}
}
    }
	?>
    <script>
        if ( window.history.replaceState ) {
            window.history.replaceState( null, null, window.location.href );
    }
</script>
</body>
</html>
<?php
    if((isset($_POST['submit']))){
      $name = $_POST["name"]; 
      $email = $_POST["email"];
      $phone = $_POST["phone"];
        //Query to insert data to the database
        $sql="INSERT INTO $phone (name, email, phone) VALUES ('".$name."','".$email."', '".$phone."')";
        //Execute the query and returning a message
        if(!$result = $conn->query($sql)){
            die('Error occured [' . $conn->error . ']');
        }
        else
            echo '<script> alert("Thank you! We will get in touch with you soon")</script>';
        }
?>


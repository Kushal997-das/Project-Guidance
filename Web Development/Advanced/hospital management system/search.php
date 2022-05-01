<?php
include 'db.php'
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <!----------------bootstrap-css--------------->
     <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <!----------------bootstrap-js--------------->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
    <script defer src="https://use.fontawesome.com/releases/v5.0.2/js/all.js"></script>
    <title>Document</title>
</head>
<body>
<form class="row g-3" method="POST">
  <div class="col-md-2">
    <label for="inputsearch" class="form-label">Email</label>
    <input type="text" name="str" class="form-control" id="inputsearch">
  </div>
  <div class="col-12">
    <button type="submit" name="submit" value="Search" class="btn btn-primary">Search</button>
  </div>
</form>
    
</body>
</html>
<script>
        if ( window.history.replaceState ) {
            window.history.replaceState( null, null, window.location.href );
    }
</script>
<?php
if(isset($_POST['submit'])){
    $str=mysqli_real_escape_string($conn,$_POST['str']);
    $sql="SELECT * FROM doctors where specialists like '%$str%' or
    name like '%$str%'";
    $res=mysqli_query($conn,$sql);
    if(mysqli_num_rows($res)>0){
        while($row=mysqli_fetch_assoc($res)){
            $id = $row['id'];
					                $name = $row['name'];
					                $designation = $row['designation'];
                                    $time = $row['time'];
            ?>
            <div class="col-md-4 mt-3" style="margin:20px;">
                                    <div class="border p-2">
                                        <h6><?php  echo $row['name'];?></h6>
                                        <?php  echo $row['designation'];?>
                                        <?php  echo $row['time'];?>
                                        <button><a name="submit"  href = "details.php?myid=<?php echo $id; ?>">Results</a></button>
                                    </div>
                                </div>
            <?php
        }
    }
}

?>
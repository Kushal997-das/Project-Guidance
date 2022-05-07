<?php 
include 'db.php';
session_start();

if (!isset($_SESSION['username'])) {
    header("Location: index.php");
}

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
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <nav class="navbar navbar-custom navbar-expand-lg navbar-light" >
    <?php require 'nav.php'; ?>
    <div class="appointments">
        <div class="col-md-12">
            <div class="card mt-3">
                <div class="card-header">
                    <?php
                    if(!isset($_SESSION['username'])){
                        ?>
                        <h3> login to access data</h3>
                        <?php
                    }else{
                        ?>
                        <h3 style="text-align:center;"> Welcome  <?php echo ucfirst($_SESSION['username']);?></h3>
                        <?php
    
                    }
                    ?>
                    <h4 style="text-align:center;">Book an appointment</h4>
                </div>
            </div>
        </div>
        <div class="row">
        <div class="col-md-3">
            <form action="" method="GET">
            <div class="card shadow mt-3">
                <div class="card-header">
                    <h5>Filter
                        <button type="submit"  class="btn btn-primary btn-sm float-end">Search</button>
                    </h5>
                </div>
                <div class="card-body">
                    <h6>Specilaists</h6>
                    <hr>
                    <?php
                    $specialists_query = "SELECT * from specialists";
                    $result = mysqli_query($conn, $specialists_query);
                    if(mysqli_num_rows($result) > 0)
                                {
                                    foreach($result as $list)
                                    {
                                        $checked = [];
                                        if(isset($_GET['list']))
                                        {
                                            $checked = $_GET['list'];
                                        }
                                        ?>
                                            <div>
                                                <input type="checkbox" name="list[]" value="<?= $list['id']; ?>" 
                                                    <?php if(in_array($list['id'], $checked)){ echo "checked"; } ?>
                                                 />
                                                <?= $list['lists']; ?>
                                            </div>
                                        <?php
                                    }
                                }
                                else
                                {
                                    echo "No Brands Found";
                                }
                            ?>

                </div>
            </div>
            </form>
        </div>
        <div class="col-md-9 mt-3">
            <div class="card">
                <div class="card-body row">
                    <?php
                    if(isset($_GET['list']))
                    {
                        $doctorchecked = [];
                        $doctorchecked = $_GET['list'];
                        foreach($doctorchecked as $rowdoctor)
                        {
                            $query= "SELECT * from doctors WHERE list_id IN ($rowdoctor)";
                            $result = mysqli_query($conn, $query);
                            $number = mysqli_num_rows($result);
                            $check_availability = mysqli_num_rows($result)>0;
                            if($check_availability){
                                while($row = mysqli_fetch_assoc($result)){
                                    $id = $row['id'];
					                $name = $row['name'];
					                $designation = $row['designation'];
                                    $time = $row['time'];
                                ?>
                                <div class="col-md-4 mt-3">
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
                    }
                    else{
                        $query= "SELECT * from doctors";
                            $result = mysqli_query($conn, $query);
                            $number = mysqli_num_rows($result);
                            $check_availability = mysqli_num_rows($result)>0;
                            if($check_availability){
                                while($row = mysqli_fetch_assoc($result)){
                                    $id = $row['id'];
					                $name = $row['name'];
					                $designation = $row['designation'];
                                    $time = $row['time'];
                                ?>
                                <div class="col-md-4 mt-3">
                                    <div class="border p-2">
                                        <form method="POST">
                                        <h4><?php  echo $name;?></h4>
                                        <?php echo "</br>"; ?>
                                        <?php  echo $designation;?>
                                        <?php echo "</br>"; ?>
                                        <?php echo "</br>"; ?>
                                        <?php  echo $row['specialists'];?>
                                        <?php echo "</br>"; ?>
                                        <?php echo "</br>"; ?>
                                        <?php  echo $time;?></br>
                                        <a href="details.php?myid=<?php echo $id; ?>" class="btn" style="width:120px;background-color:#002966;color:#fff;margin-top:20px;">Appointment</a>
                                        <form>
                                    </div>
                                </div>
                                <?php
                                }
                            }
                    }
                    ?>
                </div>
            </div>
        </div>
    </div>
    </div>
    </div>
    <script>
        if ( window.history.replaceState ) {
            window.history.replaceState( null, null, window.location.href );
    }
</script>
</body>
</html>
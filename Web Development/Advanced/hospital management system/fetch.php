<?php
include 'db.php';
if(isset($_POST['request'])){
    $request = $_POST['request'];
    $requet_query = "SELECT * FROM doctors where specialists= '$request'";
    $result = mysqli_query($conn,$request_query);
    $count = mysqli_num_rows($result);
    ?>
    <div class="row">
        <?php
        if($count){
            while($row = mysqli_fetch_assoc($count)){
                $id = $row['id'];
					                $name = $row['name'];
					                $designation = $row['designation'];
                                    $time = $row['time'];
?>
<div class="col-md-4 mt-3">
                                    <div class="border p-2">
                                        <form method="POST">
                                        <h6><?php  echo $name;?></h6>
                                        <?php echo "</br>"; ?>
                                        <?php  echo $designation;?>
                                        <?php  echo $time;?></br>
                                        <button><a name="submit"  href = "details.php?myid=<?php echo $id; ?>">Results</a></button>
                                        <form>
                                    </div>
                                </div>
            <?php
            }
        }
}
?>
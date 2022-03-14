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
<div class="content" style="margin-left:26%;">
        <h2 style="color:#000;">TRACE OR TRACK YOUR COURIER</h2>
<div class="row align-items-center">
            <div class="col">
                <form method="POST" style="margin-left:10%;" >
                    <div class="col" style="width:80%;">
                        <label for="inputsearch" class="form-label">Search here</label>
                        <input type="text" name="str" class="form-control" id="inputsearch" placeholder="Entter courier id">
                    </div>
                    <div class="col-6" style="margin-top:20px;margin-left:15%" class="form-label">
                        <button type="submit" name="submit" value="Search" class="btn btn-primary">Search</button>
                    </div>
                    </div>
                </form>
            </div>
            <?php
if(isset($_POST['submit'])){
    $str=mysqli_real_escape_string($conn,$_POST['str']);
    $sql="SELECT * FROM couriers where courier_id like '%$str%'";
    $res=mysqli_query($conn,$sql);
    if(mysqli_num_rows($res)>0){
        while($row=mysqli_fetch_assoc($res)){
            $id = $row['id'];
					                $sendername = $row['send_name'];
					                $recievername = $row['rec_name'];
            ?>
            <h4 style="text-align:center;margin-top:20px;"> COURIER DETAILS</h4>
<div class="container" style="margin-top:40px;width:100%;">
<table class="table" style="background:#fff;">
            <tbody >
                 <tr>
                    <th scope="row" >Courier id</th>
                     <td><?php echo $row['courier_id'];?></td>
                    </tr>
                    <tr>
                    <th scope="row" >Sender name</th>
                     <td><?php echo $row['send_name'];?></td>
                    </tr>
                    <tr>
                    <th scope="row" >Sender Phone</th>
                     <td><?php echo $row['send_no'];?></td>
                    </tr>
                    <tr>
                    <th scope="row" >Sender Address</th>
                     <td><?php echo $row['send_address'];?></td>
                    </tr>
                    <tr>
                    <th scope="row" >Reciever Name</th>
                     <td><?php echo $row['rec_name'];?></td>
                    </tr>
                    <tr>
                    <th scope="row" >Reciever Phone</th>
                     <td><?php echo $row['rec_no'];?></td>
                    </tr>
                    <tr>
                    <th scope="row" >Reciever Address</th>
                     <td><?php echo $row['rec_address'];?></td>
                    </tr>
                    <tr>
                    <th scope="row" >Source Branch</th>
                     <td><?php echo $row['srcbranch'];?></td>
                    </tr>
                    <tr>
                    <th scope="row" >Destination Branch</th>
                     <td><?php echo $row['dstbranch'];?></td>
                    </tr>
                    <tr>
                    <th scope="row" >Courier Weight</th>
                     <td><?php echo $row['cou_weight'];?></td>
                    </tr>
                    <tr>
                    <tr>
                    <th scope="row" >Courier Height</th>
                     <td><?php echo $row['height'];?></td>
                    </tr>
                    <tr>
                    <th scope="row" >Courier Length</th>
                     <td><?php echo $row['length'];?></td>
                    </tr>
                    <tr>
                    <th scope="row" >Courier Width</th>
                     <td><?php echo $row['width'];?></td>
                    </tr>
                    <tr>
                    <th scope="row" >Courier Fee</th>
                     <td><?php echo $row['cou_fee'];?></td>
                    </tr>
                    <tr>
                    <th scope="row" >Status</th>
                     <td><?php echo $row['status'];?></td>
                    </tr>
  </tbody>
        </table>
        </div>
            <?php
        }
    }
}

?>
        </div>
</section>
</body>
<script>
        if ( window.history.replaceState ) {
            window.history.replaceState( null, null, window.location.href );
    }
</script>
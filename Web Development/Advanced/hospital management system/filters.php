<?php 
include 'db.php';
?>
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
    <?php require 'nav.php'; ?>
    <div id="filters">
    <span>Fetch results &nbsp;</span>
    <select  name="fetchval" id="fetchval" >
    <option value="" disabled="" selected="">select filter</option>
      <option value="Cardiologists" >cardiologists</option>
      <option value="Pulmonologist" >Pulmonologist</option>
      <option value="Pediatrician" >Pediatrician</option>
    </select>
</div>
<div class="row">
<?php $query= "SELECT * from doctors";
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
                                        <h6><?php  echo $name;?></h6>
                                        <?php echo "</br>"; ?>
                                        <?php  echo $designation;?>
                                        <?php  echo $time;?></br>
                                        
                                        <form>
                                    </div>
                                </div>
                                <?php
                                }
                            }
                    ?>
                    </div>
                    <script type="text/javascript">
                        $(document).ready(function(){
                            $("#fetchval").on('change',function(){
                                var value = $(this).val();
                                alert(value);
                                $.ajax({
                                    url:"fetch.php",
                                    type:"POST",
                                    data:'request='+ value;
                                    beforeSend:function(){
                                        $(".row").html("<span>Loading..</span>");
                                    },
                                    success:function(){
                                        $(".row").html(data);
                                    }
                                });
                            });
                        });

                    </script>
</body>
</html>
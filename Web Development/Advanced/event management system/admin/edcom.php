<?php 
include 'db.php';
$id = $_GET['id'];
if(count($_POST)>0) {
mysqli_query($conn,"UPDATE comitees set comitee_id='" . $_POST['comittee_id'] . "', name='" . $_POST['comittee_name'] . "', email='" . $_POST['email'] . "'  WHERE id=$id");
$message = "Record Modified Successfully";
}
$result = mysqli_query($conn,"SELECT * FROM comitees WHERE id=$id");
$row= mysqli_fetch_array($result);
?>

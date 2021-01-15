<?php
$conn = mysqli_connect("localhost","root","","banking");
				if($conn -> connect_error){
					die("connection failed:".$conn->connect_error);
				}
$sender = $_POST['sender'];
$receiver = $_POST['receiver'];
$amount = $_POST['amount'];

$q1="SELECT EXISTS(SELECT * from customers WHERE id=$sender)" ;
$q2="SELECT EXISTS(SELECT * from customers WHERE id=$receiver)";
$res1 = $conn -> query($q1);
$row1 = $res1-> fetch_assoc();
$res2 = $conn -> query($q2);
$row2 = $res2-> fetch_assoc();
if ($row1["EXISTS(SELECT * from customers WHERE id=$sender)"]==1 && $row2["EXISTS(SELECT * from customers WHERE id=$receiver)"]==1)
{

$q6= "select Balance from customers where id= '$sender'";
		$res6 = $conn -> query($q6);
		$row6 = $res6-> fetch_assoc();
    if ($row6["Balance"] < $amount)
    {
		header( "refresh:5 ;url=details.php");
		echo "Transaction failed!! Can't transfer the amount to transfer";
		echo "\nPlease wait... Redirecting to the site";
    }
    else
 {
$q3 = "UPDATE customers
		  set Balance = Balance - '$amount'
		  where id = '$sender';";
mysqli_query($conn,$q3);

$q4 = "UPDATE customers
		  set Balance = Balance + '$amount'
		  where id = '$receiver';";
mysqli_query($conn,$q4);



$q5 = "insert into transfers (Sender , Receiver , Amount) values ('$sender','$receiver','$amount')";
mysqli_query($conn,$q5);


header( "refresh:5 ;url=details.php");
echo"\n";
echo "<h1>Transaction  Completed  Successfully !!!!!</h1>";
echo"\n";
echo "\n<h1>Please wait...Redirecting to the view all customer page..</h1>";
echo "\n"; 

}
}
else
{
	header( "refresh:5 ;url=details.php");
	echo "Transaction failed!!";
	echo "\nPlease wait...Redirecting to the site";
}
?>
<!DOCTYPE html>
<html>
<head>
	<title>Banking - Website</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" type ="text/css" href="css/style">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
  <style>
  	.align1{
	border: 2px solid black;
  background-color: lightgreen;
  margin-top: 100px;
  margin-right: 30px;
  margin-bottom: 50px;
  margin-left: 30px;
}
  </style>
</head>
<body>
  <nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" >Banking-System</a>
    </div>
    <ul class="nav navbar-nav">
      <li class="active"><a href="index.php">Homepage</a></li>
      <li><a href="details.php">View customers</a></li>
    </ul>
  </div>
</nav><br>
<h1 class="text-center" style="background-color: lightblue; border:5px solid black; color: black">
Created by ::)) Chetan Vasant Sawant</h1>
<div class="align1">
<h1 class="text-center ">*************Welcome to My banking website*************</h1>
<h2 class="text-center">> Steps to transfer money between two customers :)</h2>
<p class="text-center">1. Go to 'view all customers'</p>
<p class="text-center">2. you can view the details of the customers</p>
<p class="text-center">3. At the bottom of the page click the tranfer button for transferring amount</p>
<p class="text-center">4. Enter the Sender's and receiver's id along with the amount to be transferred</p>
<p class="text-center">5. If the details are correct as well as the user have enough balance to transfer the amount, The page will show the 'successful' message</p>
<p class="text-center">6. If Id's are incorrect or amount is not possible to be transferred then 'transaction failed' message will be displayed</p>
<p class="text-center">7. After the end of transaction the user will be redirected to the 'view all customers' page</p>
</div>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
</body>
</html>
<!DOCTYPE html>
<html>
<head>
	<title>Banking Website</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" type ="text/css" href="css/style">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
  
</head>
<body>
  <nav class="navbar navbar-inverse">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" >Transfer money</a>
    </div>
    <ul class="nav navbar-nav">
      <li ><a href="index.php">Homepage</a></li>
    </ul>
  </div>
</nav>
<div class="container">
  <h2>Money Transfer</h2>
  <form class="form-horizontal" action="config.php" method="post">
    <div class="form-group">
      <label class="control-label col-sm-2" >Sender's id:</label>
      <div class="col-sm-10">
        <input type="text" class="form-control" placeholder="Enter sender's id" name="sender" autocomplete="off" required>
      </div>
    </div>
    <div class="form-group">
      <label class="control-label col-sm-2" >Receiver's id:</label>
      <div class="col-sm-10">          
        <input type="text" class="form-control" placeholder="Enter receiver's id" name="receiver" autocomplete="off" required>
      </div>
    </div>
    <div class="form-group">
      <label class="control-label col-sm-2" >Amount:</label>
      <div class="col-sm-10">          
        <input type="text" class="form-control" placeholder="Enter Amount" name="amount" autocomplete="off" required>
      </div>
    </div>
    <div class="form-group">        
      <div class="col-sm-offset-2 col-sm-10">
        <button type="submit" class="btn btn-default">Submit</button>
      </div>
    </div>
  </form>
</div>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
</body>
</html>

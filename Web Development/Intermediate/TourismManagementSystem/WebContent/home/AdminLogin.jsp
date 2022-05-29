<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

<link rel="stylesheet" type="text/css" href="Login.css">
<link rel="stylesheet" type="text/css" href="Home.css">

<!-- jQuery library -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

<!-- Latest compiled JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<meta name="viewport" content="width=device-width, initial-scale=1">

<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>

<title>Admin Login</title>
</head>
<body>
<script type="text/javascript">
$(document).ready(function(){
	$('#button').click(function(){
		var name = $('#username').val();
		var pass =$('#password').val();
		$.ajax({
			type:'POST',
			data:{ email:name, password:pass},
			url:'../AdminLogin',
			success: function(result){
				if(result!= "invalid"){
					window.location.href ="../Admin/Admin.jsp";
				}else{
				$('#validation').html(result);}
			}
		});	
	});
});
</script>
<%@ include file ="Header.jsp" %>
<div id="login">
<div class="container">
    	<div class="row">
			<div class="col-md-6 col-md-offset-3">
				<div class="panel panel-login">
					<div class="panel-heading">
						<div class="row">
							<div class="col-xs-12">
								<a class="active" >Admin Login</a>
							</div>
						</div>
					</div>
					<div class="panel-body">
						<div class="row">
							<div class="col-lg-12">
								<form>
									<div class="form-group">
										<input type="text" name="email" id="username" tabindex="1" class="form-control" placeholder="Email ID" required="true">
									</div>
									<div class="form-group">
										<input type="password" name="password" id="password" tabindex="2" class="form-control" placeholder="Password" required="true">
									</div>
									<div class="form-group">
									<div class="row">
										<div class="col-sm-6 col-sm-offset-3">
										<input type="button" tabindex="3" id="button"  class="form-control btn btn-login" value="Log In">
										</div>
									</div>
									</div>
									<div id="validation"></div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<%@ include file="Footer.jsp" %>
</body>
</html>
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
<title>Register</title>
</head>
<body>
<script type="text/javascript">
	function validation(){
		name = document.getElementById("name").value;
		email = document.getElementById("email").value;
		pass = document.getElementById("password").value;
		mobile = document.getElementById("mobile").value;
		
		if(name!=null&&email!=null&&mobile!=null&&pass!=null&&name!=""&&email!=""&&mobile!=""&&pass!=""&&name.length>0&&email.length>0&&mobile.length==10&&pass.length>0){
			return true;
		}else {
			document.getElementById("errormess").innerHTML = "Please enter valid details";
			return false;
		}
		
	}
</script>

<%@ include file ="Header.jsp" %>
<div id="login">
<div class="container">
    	<div class="row">
			<div class="col-md-6 col-md-offset-3">
				<div class="panel panel-login">
					<div class="panel-heading">
						<div class="row">
							<div class="col-xs-6">
								<a href="Login.jsp"id="login-form-link">Login</a>
							</div>
							<div class="col-xs-6">
								<a href="#" class="active"  id="register-form-link">Register</a>
							</div>
						</div>
						<hr>
					</div>
					<div class="panel-body">
						<div class="row">
							<div class="col-lg-12">
								<form action="../Register" method="post" onsubmit="return validation()" id="login-form" role="form" style="display: block;">
									<div class="form-group">
										<input type="text" name="name" id="name" tabindex="1" class="form-control" placeholder="Name" >
									</div>
									<div class="form-group">
										<input type="text" name="email" id="email" tabindex="2" class="form-control" placeholder="Email ID" >
									</div>
									<div class="form-group">
										<input type="password" name="password" id="password" tabindex="3" class="form-control" placeholder="Password" >
									</div>
									<div class="form-group">
										<input type="number" name="mobile" id="mobile" tabindex="4" class="form-control" placeholder="Mobile" >
									</div>
									<div class="form-group">
										<div class="row">
											<div class="col-sm-6 col-sm-offset-3">
												<input type="submit" name="register" id="login-submit" tabindex="5" class="form-control btn btn-login" value="Register">
											</div>
										</div>
									</div>
									<span id="errormess" class="errormess" style="color:red;margin-left:20px;"><% if(session.getAttribute("errormess")!=null){%>
							      	 	<%=session.getAttribute("errormess")%>
							      		<% session.setAttribute("errormess",null);}%>
							      	 </span>
							      	 <span id="SuccessMess" class="SuccessMess" style="color:green;margin-left:20px;"><% if(session.getAttribute("SuccessMess")!=null){%>
							      	 	<%=session.getAttribute("SuccessMess")%>
							      		<% session.setAttribute("SuccessMess",null);}%>
			      					 </span>
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
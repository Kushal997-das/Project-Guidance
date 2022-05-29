<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%@ page import= "java.sql.*" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

<link rel="stylesheet" type="text/css" href="../home/Aside.css">
<link rel="stylesheet" type="text/css" href="../home/Home.css">

<!-- jQuery library -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

<!-- Latest compiled JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<meta name="viewport" content="width=device-width, initial-scale=1">

<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Payment</title>
</head>
<body>
<script type="text/javascript">
$(document).ready(function(){
	$('#button').click(function(){
		var packagename = $('#packagename').val();
		var place = $('#place').val();
		var email = $('#email').val();
		var due =$('#due').val();
		var cardname = $('#cardname').val();
		var cardnumber = $('#cardnumber').val();
		var cvv = $('#cvv').val();
		if(cardnumber==null&&cardnumber.equals("")&&cvv==""&&cvv==null){
			$('#validation').html("invalid");
			return false;
		}else{
		$.ajax({
			type:'POST',
			data:{ packagename:packagename, place:place, email:email,due:due,cardname:cardname,cardnumber:cardnumber,cvv:cvv},
			url:'../Payment',
			success: function(result){
				$('#validation').html(result);
			}
		});	
		}
	});
});
</script>
<%@ include file ="Header.jsp" %>
<%@ include file ="Aside.jsp" %>
	<section class="section">
		<div class="sectiondev">
			<div class="container">
			  <h2>Payment</h2>
			  <div class="panel col-sm-8">
			    <div class="panel-body">
			    	<div class="row">
			    		<div class="col-sm-12">
			    			<form>
			    			<div class="col-sm-12">
								<div class="col-sm-3">
								<div class="form-group">
			    				Package Name:
			    				<%
			    				String packagename = request.getParameter("packagename");
								String place = request.getParameter("place");
								String email = (String) session.getAttribute("email");
								String total = request.getParameter("total");
								String id = request.getParameter("id");
								int discount=0;
								
								int due;
								int tamount=Integer.parseInt(total);

								if(id.equals("1")){
									Class.forName("com.mysql.jdbc.Driver");
									Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/tourism","root","root");
									PreparedStatement ps = con.prepareStatement("select discount from discount where packagename ='"+packagename+"'");
									ResultSet rs = ps.executeQuery();
									
									if(rs.next()){
										int discount1 =rs.getInt(1);
										System.out.println("tamount@"+tamount);
										int dic=(tamount*(10+discount1))/100;
										System.out.println("Discount@"+dic);
										due=tamount-dic;
										System.out.println("Due$$"+due);
										discount=10+discount1;
										
									}else{
									System.out.println("tamount@"+tamount);
									int dic=tamount*10/100;
									System.out.println("Discount@"+dic);
									due=tamount-dic;
									System.out.println("Due$$"+due);
									discount=10;
									}
								}
								
								else if(id.equals("3")){
									
								int dic1=tamount*30/100;
								System.out.println("tamount@##"+tamount);
								System.out.println("Discount@"+dic1);
								due=tamount-dic1;
								System.out.println("Due$$"+due);
								discount=30;
								}
								else{
								due=tamount;
								discount=0;
								}
			    				%>
			    				</div>
			    				</div>
			    				<div class="col-sm-4">
			    				<div class="form-group">
			    					<input class="form-control" value="<%=packagename %>" type="text" id="packagename" name="packagename" readonly>
			    				</div>
			    				</div>
			    				</div>
			    				<div class="col-sm-12">
								<div class="col-sm-3">
								<div class="form-group">
			    				Place:
			    				</div>
			    				</div>
			    				<div class="col-sm-4">
			    				<div class="form-group">
			    					<input class="form-control" value="<%=place%>" type="text" id="place" name="place" readonly>
			    				</div>
			    				</div>
			    				</div>
			    				<div class="col-sm-12">
			    				<div class="col-sm-3">
			    				<div class="form-group">
			    				Email ID:
			    				</div>
			    				</div>
			    				<div class="col-sm-4">
			    				<div class="form-group">
			    					<input class="form-control" type="text" value="<%=email%>" id="email" name="email" readonly>
			    				</div>
			    				</div>
			    				</div>
			    				<div class="col-sm-12">
			    				<div class="col-sm-3">
			    				<div class="form-group">
			    				Total Cost:
			    				</div>
			    				</div>
			    				<div class="col-sm-4">
			    				<div class="form-group">
			    					<input class="form-control" type="text" value="<%=total %>" id="total" name="total" readonly>
			    				</div>
			    				</div>
			    				</div>
			    				<div class="col-sm-12">
			    				<div class="col-sm-3">
			    				<div class="form-group">
			    				Discount:
			    				</div>
			    				</div>
			    				<div class="col-sm-4">
			    				<div class="form-group">
			    					<label><%=discount%>%</label>
			    				</div>
			    				</div>
			    				</div>
			    				<div class="col-sm-12">
			    				<div class="col-sm-3">
			    				<div class="form-group">
			    				Pay:
			    				</div>
			    				</div>
			    				<div class="col-sm-4">
			    				<div class="form-group">
			    					<input class="form-control" type="text" value="<%=due %>" id="due" name="due" readonly>
			    				</div>
			    				</div>
			    				</div>
			    				<div class="col-sm-12">
			    				<div class="col-sm-7">
			    				<div class="text-center">
			    				<div class="form-group">
			    				<h4>Please Enter Card Details</h4>
			    				</div>
			    				</div>
			    				</div>
			    				</div>
			    				<div class="col-sm-12">
			    				<div class="col-sm-3">
			    				<div class="form-group">
			    				Name:
			    				</div>
			    				</div>
			    				<div class="col-sm-4">
			    				<div class="form-group">
			    					<input class="form-control" type="text" id="cardname" name="cardname" required="true">
			    				</div>
			    				</div>
			    				</div>
			    				<div class="col-sm-12">
								<div class="col-sm-3">
								<div class="form-group">
			    				Card Number:
			    				</div>
			    				</div>
			    				<div class="col-sm-4">
			    				<div class="form-group">
			    					<input class="form-control" type="text" value="" id="cardnumber" name="cardnumber" required="true" required pattern="[0-9]{16}" maxlength="16">
			    				</div>
			    				</div>
			    				</div>
			    				<div class="col-sm-12">
								<div class="col-sm-3">
								<div class="form-group">
			    				CVV:
			    				</div>
			    				</div>
			    				<div class="col-sm-4">
			    				<div class="form-group">
			    					<input class="form-control" type="text" id="cvv" value="" name="cvv" required="true" required pattern="[0-9]{3}" maxlength="3">
			    				</div>
			    				</div>
			    				</div>
			    				<div class="col-sm-12">
			    				<div class="col-sm-7">
			    				<div class="text-center">
			    				<div class="form-group"> 
			    					<input type="button" id="button" value="Pay" class="btn btn-primary">
			    				</div>
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
	</section>
<%@ include file="../home/Footer.jsp" %>
</body>
</html>
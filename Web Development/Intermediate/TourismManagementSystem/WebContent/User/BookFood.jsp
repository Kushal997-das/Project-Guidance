<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@page import="java.sql.*" %>
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
<title>Book Food</title>
</head>
<body>
<script type="text/javascript">
$(document).ready(function(){
	$('#packagename').change(function(){
		var packagename =$('#packagename').find('option:selected').text();
		$('#packagetable').show();
		$.ajax({
			type:'POST',
			data:{ packagename:packagename},
			url:'../SelectPlace',
			success: function(result){
				$('#placebox').html(result);
			}
		});	
	});
	
	var type = $('#foodType').val();
	var foodName = $('#foodName').val();
	var foodCost = $('#foodCost').val();
	 
	var quantity= $('#quantity').val();
	var totalCost = foodCost*quantity;
	$('#totalCost').val(totalCost);
	
	$('#quantity').change(function(){
		var quantity = $('#quantity').val();
		var totalCost = foodCost*quantity;
		$('#totalCost').val(totalCost);
	});
	$('#button').click(function(){
		var packagename = $('#packagename').find('option:selected').text();
		var place = $('#placebox').find('option:selected').text();
		var quantity= $('#quantity').val();
		var totalCost = foodCost*quantity;
		$.ajax({
			type:'POST',
			data:{ type:type, foodName:foodName, foodCost:foodCost,packagename:packagename, place:place,quantity:quantity,totalCost:totalCost},
			url:'../BookFood',
			success: function(result){
				$('#validation').html(result);
			}
		});	
	});
});
</script>

<%@ include file ="Header.jsp" %>
<%@ include file ="Aside.jsp" %>
	<section class="section">
		<div class="sectiondev">
			<div class="container">
			  <h2>Book Food</h2>
			  <div class="panel col-sm-8">
			    <div class="panel-body">
			    	<div class="row">
			    		<div class="col-sm-12">
			    			<form>
			    			<div class="col-sm-12">
			    				<div class="col-sm-4">
								<div class="form-group">
			    				Select Package Name:
			    				</div>
			    				</div>
			    				<div class="col-sm-4">
			    				<div class="form-group">
			    					<%
						    		try {
						    			Class.forName("com.mysql.jdbc.Driver");
						    			Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/tourism","root","root");
						    			PreparedStatement ps = con.prepareStatement("select DISTINCT packagename from bookpackage where email='"+session.getAttribute("email")+"'");
						    			ResultSet rs = ps.executeQuery();
						    		%>
						    			<select name="packagename" id="packagename" class="form-control">
						    			<option value="select">select</option>
						    			<%while(rs.next()){ %>
						    				<option value="<%=rs.getString(1)%>" ><%=rs.getString(1) %></option>
						    			<%} %>
						    			</select>
						    			<% 
						    			}
						    		catch (Exception e) {
						    			e.printStackTrace();
						    			}%>
			    				</div>
			    				</div>
			    				</div>
			    				<div class="col-sm-12">
			    				<div class="col-sm-4">
								<div class="form-group">
			    				Select Place:
			    				</div>
			    				</div>
			    				<div class="col-sm-4">
			    				<div class="form-group">
			    					<select id="placebox" class="form-control">
			    					<option value="select">Select</option>
			    					</select>
			    				</div>
			    				</div>
			    				</div>
			    				<div class="col-sm-12">
			    				<div class="col-sm-4">
			    				<div class="form-group">
			    				Food Type:
			    				</div>
			    				</div>
			    				<div class="col-sm-4">
			    				<div class="form-group">
			    					<input class="form-control" type="text" value="<%=session.getAttribute("foodType") %>" id="foodType" name="foodType" readonly>
			    				</div>
			    				</div>
				    			</div>
				    			<div class="col-sm-12">
				    			<div class="col-sm-4">
			    				<div class="form-group">
			    				Food Name:
			    				</div>
			    				</div>
			    				<div class="col-sm-4">
			    				<div class="form-group">
			    					<input class="form-control" type="text" value="<%=session.getAttribute("foodName") %>" id="foodName" name="foodName" readonly>
			    				</div>
			    				</div>
				    			</div>
				    			<div class="col-sm-12">
				    			<div class="col-sm-4">
			    				<div class="form-group">
			    				Cost:
			    				</div>
			    				</div>
			    				<div class="col-sm-4">
			    				<div class="form-group">
			    					<input class="form-control" type="text" value="<%=session.getAttribute("foodCost") %>" id="foodCost" name="foodCost" readonly>
			    				</div>
			    				</div>
				    			</div>
				    			<div class="col-sm-12">
				    			<div class="col-sm-4">
			    				<div class="form-group">
			    				Quantity:
			    				</div>
			    				</div>
			    				<div class="col-sm-4">
			    				<div class="form-group">
			    					<input class="form-control" type="text" value="1"  id="quantity" name="quantity" required="true">
			    				</div>
			    				</div>
				    			</div>
				    			<div class="col-sm-12">
				    			<div class="col-sm-4">
			    				<div class="form-group">
			    				Total Cost:
			    				</div>
			    				</div>
			    				<div class="col-sm-4">
			    				<div class="form-group">
			    					<input class="form-control" type="text" id="totalCost" name="totalCost" required="true" readonly>
			    				</div>
			    				</div>
				    			</div>
				    			<div class="col-sm-12">
				    			<div class="col-sm-4">
			    				<div class="form-group">
			    					<div class="text-right"> 
			    						<input type="button" id="button" value="Book Food" class="btn btn-primary">
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
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
<title>Add Room</title>
</head>
<body>
<script type="text/javascript">
$(document).ready(function(){
	$('#button').click(function(){
		var hotelName = $('#hotelName').find('option:selected').text();
		var roomType = $('#roomType').find('option:selected').text();
		var roomSize = $('#roomSize').find('option:selected').text();
		var roomCost = $('#roomCost').val();
		$.ajax({
			type:'POST',
			data:{ hotelName:hotelName,roomType:roomType,roomSize:roomSize,roomCost:roomCost},
			url:'../Room',
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
				<h2>Add Room</h2>
				<div class="panel col-sm-8">
					<div class="panel-body">
						<div class="row">
							<div class="col-sm-4">
								<form action="../AddItem" method=post>
								<div class="form-group">
			    				Select Hotel:
			    				</div>
			    				<div class="form-group">
			    				<%
			    				try {
			    					Class.forName("com.mysql.jdbc.Driver");
			    					Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/tourism","root","root");
			    					PreparedStatement ps = con.prepareStatement("select hotelName from hotel");
			    					ResultSet rs = ps.executeQuery();
			    					
			    						%>
			    						<select name="hotelName" id="hotelName" class="form-control">
			    						<%while(rs.next()){ %>
			    							<option value="<%=rs.getString(1)%>" ><%=rs.getString(1) %></option>
			    							<%} %>
			    						</select>
			    						<% 
			    					
			    				}
			    				catch (Exception e) {
			    					e.printStackTrace();
			    				}
			    				%>
			    				</div>
			    				<div class="form-group">
			    				Select Room Type:
			    				</div>
			    				<div class="form-group">
			    					<select id="roomType" class="form-control">
			    						<option value="AC">AC</option>
			    						<option value="Non-AC">Non-AC</option>
			    					</select>
			    				</div>
			    				<div class="form-group">
			    				Select Room Size:
			    				</div>
			    				<div class="form-group" >
			    					<select id="roomSize" class="form-control">
			    						<option value="single">Single</option>
			    						<option value="double">Double</option>
			    					</select>
			    				</div>
			    				<div class="form-group">
			    				Enter Cost:
			    				</div>
			    				<div class="form-group">
			    					<input class="form-control" type="text" id="roomCost" name="roomCost" required="true">
			    				</div>
			    				<div class="form-group">
			    					<div class="text-right"> 
			    						<input type="button" id="button" value="Add Room" class="btn btn-primary">
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
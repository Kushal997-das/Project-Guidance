<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
 <%@ page import="java.sql.*" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">

<link rel="stylesheet" type="text/css" href="../home/Aside.css">
<link rel="stylesheet" type="text/css" href="../home/Home.css">

<!-- jQuery library -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

<!-- Latest compiled JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

<meta name="viewport" content="width=device-width, initial-scale=1">

<title>Book Room</title>
</head>
<body>
<script type="text/javascript">
$(document).ready(function(){
	$('#hotelName').change(function(){
		var hotelName =$('#hotelName').find('option:selected').text();
		$.ajax({
			type:'POST',
			data:{ hotelName:hotelName},
			url:'../SelectRoom',
			success: function(result){
				window.location.href ="../User/Room.jsp";
			}
		});	
	});
});

</script>

<%@ include file ="Header.jsp" %>
<%@ include file ="Aside.jsp" %>
	<section class="section">
		<div class="sectiondev">
		<h3>Book Room</h3>
			<div class="col-sm-12">
				<div class="col-sm-4">
					<div class="form-group">
						<div class="text-right">
			    		Select Hotel:
			    		</div>
			    	</div>
			    </div>
			    <div class="col-sm-3">
			    	<div class="form-group">
			    		<%
			    		try {
			    			Class.forName("com.mysql.jdbc.Driver");
			    			Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/tourism","root","root");
			    			PreparedStatement ps = con.prepareStatement("select DISTINCT hotelName from hotel");
			    			ResultSet rs = ps.executeQuery();
			    		%>
			    			<select name="hotelName" id="hotelName" class="form-control">
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
			<table class="table table-striped">
				<thead>
					<tr>
					<th>Hotel Name</th>
					<th>Room Type</th>
					<th>Room Size</th>
					<th>Cost</th>
					<th>Book</th>
					</tr>
				</thead>
				<tbody>
					<%
					  try{
					    	Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/tourism","root","root");
					    	PreparedStatement ps = con.prepareStatement("select * from room where hotelName='"+session.getAttribute("hotelName")+"'");
					    	session.setAttribute("hotelName",null);
					    	ResultSet rs = ps.executeQuery();
					    	while(rs.next()){ %>
					    	<tr>
					    	<td><%=rs.getString(1) %></td>
					    	<td><%=rs.getString(2) %></td>
					    	<td><%=rs.getString(3) %></td>
					    	<td><%=rs.getString(4) %></td>
					    	<td><a href="../UpdateRoom?hotelName=<%=rs.getString(1) %>&roomType=<%=rs.getString(2)%>&roomSize=<%=rs.getString(3)%>&type=book ">Book</a></td>
					    	</tr>
					    	<%} %>
					    	<% 
					    	}
					    	catch (Exception e) {
					    		e.printStackTrace();
					    	}%>
				</tbody>
			</table>
		</div>	
	</section>
<%@ include file="../home/Footer.jsp" %>
</body>
</body>
</html>
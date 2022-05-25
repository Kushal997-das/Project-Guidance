<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
    <%@ page import="java.sql.*" %>
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
<title>Modify/ Cancel Room</title>
</head>
<body>
<%@ include file ="Header.jsp" %>
<%@ include file ="Aside.jsp" %>
	<section class="section">
		<div class="sectiondev">
		<h2>Modify/ Cancel Room</h2>
			<table class="table table-striped">
				<thead>
					<tr>
					<th>Hotel Name</th>
					<th>Room Type</th>
					<th>Room Size</th>
					<th>Cost</th>
					<th>Date</th>
					<th>Package</th>
					<th>Place</th>
					<th>Modify</th>
					<th>Cancel</th>
					</tr>
				</thead>
				<tbody>
					<%
					  try {
						  Class.forName("com.mysql.jdbc.Driver");
					    	Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/tourism","root","root");
					    	PreparedStatement ps = con.prepareStatement("select * from bookroom where email='"+session.getAttribute("email")+"'");
					    	ResultSet rs = ps.executeQuery();
					    	
					    	while(rs.next()){ %>
					    	<tr>
					    	<td><%=rs.getString(1) %></td>
					    	<td><%=rs.getString(2) %></td>
					    	<td><%=rs.getString(3) %></td>
					    	<td><%=rs.getString(4) %></td>
					    	<td><%=rs.getString(5) %></td>
					    	<td><%=rs.getString(7) %></td>
					    	<td><%=rs.getString(8) %></td>
					    	<td><a href="../ModifyRoom?hotelName=<%=rs.getString(1) %>&roomType=<%=rs.getString(2)%>&roomSize=<%=rs.getString(3)%>&packagename=<%=rs.getString(7) %>&place=<%=rs.getString(8) %>">Modify</a></td>
					    	<td><a href="../CancelRoom?hotelName=<%=rs.getString(1) %>&roomType=<%=rs.getString(2)%>&roomSize=<%=rs.getString(3)%>&packagename=<%=rs.getString(7) %>&place=<%=rs.getString(8) %>">Cancel</a></td>
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
</html>
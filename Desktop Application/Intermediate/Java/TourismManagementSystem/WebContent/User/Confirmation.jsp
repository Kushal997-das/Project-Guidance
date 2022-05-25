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
<title>Confirmation</title>
</head>
<body>
<%@ include file ="Header.jsp" %>
<%@ include file ="Aside.jsp" %>
	<section class="section">
		<div class="sectiondev">
			<h2>Confirmation Details</h2>
			<%
			int i =1;
			int id=0;
			String packagename="";
			String place="";
			int packagecost =0;
			int foodcost=0;
			int roomcost=0;
			int transportcost=0;
			int totalcost=0;
			String email = (String) session.getAttribute("email");
			System.out.println(email);
			
			%>
			<table class="table table-striped">
				<thead>
					<tr>
						<th>Package</th>
						<th>Place</th>
						<th>Package Cost</th>
						<th>Room Cost</th>
						<th>Food Cost</th>
						<th>Transport Cost</th>
						<th>Total Cost</th>
					</tr>
				</thead>
				<tbody>
						<%try{
							Class.forName("com.mysql.jdbc.Driver");
							Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/tourism","root","root");
							PreparedStatement ps = con.prepareStatement("select * from bookpackage where email='"+email+"'");
							ResultSet rs = ps.executeQuery();
							while(rs.next()){
								packagename = rs.getString(2);
								place = rs.getString(3) ;
								packagecost= rs.getInt(7);
								
								int sum = i++;
								PreparedStatement pss = con.prepareStatement("update bookpackage set id='"+sum+"' where email='"+email+"' and packagename = '"+packagename+"' and place='"+place+"'");
								pss.executeUpdate();
								%>
								<tr>
								<td><%=packagename %></td>
								<td><%=place%></td>
								<td><%=packagecost %></td>
								<%
								Connection con1 = DriverManager.getConnection("jdbc:mysql://localhost:3306/tourism","root","root");
								PreparedStatement ps1 = con1.prepareStatement("select SUM(roomCost) from bookroom where email='"+email+"' and packagename = '"+packagename+"' and place='"+place+"'");
								ResultSet rs1 = ps1.executeQuery();
								while(rs1.next()){
									roomcost =rs1.getInt(1);
									%>
									<td><%=roomcost %></td>
									<%
								}
								Connection con2 = DriverManager.getConnection("jdbc:mysql://localhost:3306/tourism","root","root");
								PreparedStatement ps2 = con2.prepareStatement("select SUM(totalCost) from bookfood where email='"+email+"' and packagename = '"+packagename+"' and place='"+place+"'");
								ResultSet rs2 = ps2.executeQuery();
								while(rs2.next()){
									foodcost = rs2.getInt(1);
									%>
									<td><%=foodcost %></td>
									<% 
								}
								Connection con3 = DriverManager.getConnection("jdbc:mysql://localhost:3306/tourism","root","root");
								PreparedStatement ps3 = con3.prepareStatement("select SUM(vehicleCost) from booktransport where email='"+email+"' and packagename = '"+packagename+"' and place='"+place+"'");
								ResultSet rs3 = ps3.executeQuery();
								while(rs3.next()){
									transportcost =rs3.getInt(1);
									%>
									<td><%=transportcost %></td>
									<% 
								}
								Connection con4 = DriverManager.getConnection("jdbc:mysql://localhost:3306/tourism","root","root");
								PreparedStatement ps4 = con4.prepareStatement("select id from bookpackage where email='"+email+"' and packagename = '"+packagename+"' and place='"+place+"'");
								ResultSet rs4 = ps4.executeQuery();
								while(rs4.next()){
									id= rs4.getInt(1);
								}
								totalcost = packagecost+roomcost+foodcost+transportcost;
								%>
								<td><%=totalcost %></td>
								<td><a href="Payment.jsp?id=<%=id%>&total=<%=totalcost %>&packagename=<%=packagename%>&place=<%=place%>">Pay</a><td>
								<%
							}
						}
						catch(Exception e){
							e.printStackTrace();
						}
						%>
						
					</tr>
				</tbody>
			</table>
		</div>
	</section>
<%@ include file="../home/Footer.jsp" %>
</body>
</html>
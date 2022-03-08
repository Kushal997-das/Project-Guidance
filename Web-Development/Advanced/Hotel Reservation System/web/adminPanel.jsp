<%-- 
    Document   : adminPanel
    Created on : Jan 13, 2021, 7:40:33 PM
    Author     : Tawfik
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.DriverManager"%>
<%@page import="java.sql.Statement"%>
<%@page import="java.sql.Connection"%>
<!DOCTYPE html>
<%
    String email = request.getParameter("email");
    String password = request.getParameter("password");
    String username = "";
    String displayname = "";
    String phonenumber = "";
    String role = "";
    int user_Id = 0;
    Class.forName("com.mysql.jdbc.Driver");
    String url = "jdbc:mysql://localhost:3306/hotel_reservation_system_db?useSSL=false";
    String user = "root";
    String passworddb = "troot";
    Connection connection = null;
    Statement statement = null;
    connection = (Connection) DriverManager.getConnection(url, user, passworddb);
    statement = (Statement) connection.createStatement();
    String query = "SELECT * FROM user";
    ResultSet resultSet = null;
    resultSet = statement.executeQuery(query);
    while (resultSet.next()) {
        if (resultSet.getString("email").equals(email) && resultSet.getString("password").equals(password)) {
            username = resultSet.getString("username");
            displayname = resultSet.getString("display_name");
            phonenumber = resultSet.getString("phone_number");
            role = resultSet.getString("role");
            user_Id = resultSet.getInt("user_id");
        }
    }
    Statement s1 = null;
    Statement s2 = null;
    Statement s3 = null;
    Statement s4 = null;
    s1 = (Statement) connection.createStatement();
    s2 = (Statement) connection.createStatement();
    s3 = (Statement) connection.createStatement();
    s4 = (Statement) connection.createStatement();
    ResultSet rs1 = null;
    ResultSet rs2 = null;
    ResultSet rs3 = null;
    ResultSet rs4 = null;
    String sq1 = "SELECT * FROM user;";
    String sq2 = "SELECT * FROM hotel;";
    String sq3 = "SELECT * FROM reservation;";
    String sq4 = "SELECT * FROM room;";
    rs1 = s1.executeQuery(sq1);
    rs2 = s2.executeQuery(sq2);
    rs3 = s3.executeQuery(sq3);
    rs4 = s4.executeQuery(sq4);
    int size = 0;
    if (rs1 != null) {
        rs1.last();    // moves cursor to the last row
        size = rs1.getRow(); // get row id 
    }
    int s_users = size;
    if (rs2 != null) {
        rs2.last();    // moves cursor to the last row
        size = rs2.getRow(); // get row id 
    }
    int s_hotels = size;
    if (rs3 != null) {
        rs3.last();    // moves cursor to the last row
        size = rs3.getRow(); // get row id 
    }
    int s_reservations = size;
    if (rs4 != null) {
        rs4.last();    // moves cursor to the last row
        size = rs4.getRow(); // get row id 
    }
    int s_rooms = size;
%>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script src="jquery-3.5.1.js"></script>
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200&family=Roboto:wght@100&display=swap" rel="stylesheet">
        <link rel="icon" href="hotelicon.png">
        <title>Admin Panel ( <%= displayname%> )</title>
        <script type="text/javascript" src="homescript.js"></script>
        <style>
            *{
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            body{
                background: #f2f2f2;
                font-family: 'Nunito', sans-serif;
            }
            nav{
                background: #ffffff;
                box-shadow: 5px 5px 18px #888888;
            }
            nav:after{
                content: '';
                clear: both;
                display: table;
            }
            nav .logo{
                float: left;
                color: navy;
                font-size: 20px;
                font-weight: 600;
                line-height: 70px;
                padding-left: 60px;
            }
            nav .cname{
                float: left;
                color: navy;
                font-size: 18px;
                font-weight: 600;
                line-height: 70px;
                padding-left: 60px;
            }
            nav ul{
                float: right;
                list-style: none;
                margin-right: 40px;
                position: relative;
            }
            nav ul li{
                float: left;
                display: inline-block;
                background: #ffffff;
                margin: 0 5px;
            }
            nav ul li a{
                color: navy;
                text-decoration: none;
                line-height: 70px;
                font-size: 16px;
                padding: 8px 15px;
                text-transform: uppercase;
            }
            nav ul li a:hover{
                color: rgba(0,242,254,.8);
                border-radius: 5px;
            }
            nav .logout:hover{
                box-shadow: 0 0 5px rgba(0,242,254,.8), 0 0 5px rgba(0,242,254,.8);
            }
            nav ul ul li a:hover{
                color: rgba(79,172,254,.8);
                box-shadow: none;
            }
            nav ul ul{
                position: absolute;
                top: 90px;
                border-top: 3px solid rgba(0,242,254,.8);
                opacity: 0;
                visibility: hidden;
                transition: top .3s;
                box-shadow: 5px 10px 18px #888888;
            }
            nav ul li:hover > ul{
                top: 70px;
                opacity: 1;
                visibility: visible;
            }
            nav ul ul li{
                position: relative;
                margin: 0px;
                width: 150px;
                float: none;
                display: list-item;
                border-bottom: 1px solid rgba(0,0,0,0.3);
            }
            nav ul ul li a{
                line-height: 50px;
            }
            .container{
                margin: 50px auto;
                width: 55%;
                max-width: 90%
            }
            .container form{
                width: 100%;
                height: 100%;
                background: white;
                border-radius: 1px;
                box-shadow: 0 4px 8px rgba(0,0,0,.3);
                padding-top: 10px;
                padding-right: 10px;
                padding-left: 10px;
                padding-bottom: 10px;
            }
            .container form .form_group{
                text-align: center;
                width: 100%;
                height: 100%;
                color: black;
                border-radius: 1px;
                border: 0px solid silver;
                margin: 15px 0 10px 0;
                padding: 0 30px;
                font-family: 'Nunito', sans-serif;
            }

            .footer {
                position: fixed;
                left: 0;
                bottom: 0;
                padding: 30px;
                width: 100%;
                background-color: white;
                color: navy;
                text-align: center;
                box-shadow: 5px 5px 18px #888888;

            }
            .card {
                /* Add shadows to create the "card" effect */
                box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
                transition: 0.3s;
                border-radius: 5px; /* 5px rounded corners */
                width: 200px;
                height: 200px;
                display: inline-block;
                text-align: center;
            }
            /* On mouse-over, add a deeper shadow */
            .card:hover {
                box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
            }

            /* Add some padding inside the card container */
            .container-card {
                padding: 2px 16px;
            }
        </style>
    </head>
    <body>
        <nav>
            <div class="logo">Hotel System (Admin Panel)</div>
            <ul>
                <li><a href="userProfile.jsp?id=<%= user_Id%>"><%=displayname%></a></li>
                <li><a href="reservations.jsp">Reservations</a></li>
                <li><a href="hotels.jsp">Hotels</a></li>
                <li><a href="rooms.jsp">Rooms</a></li>
                <li><a href="clients.jsp">Clients</a></li>
                <li><a href="notification.jsp">Notification</a></li>
                <li><a href="rates.jsp">Rates</a></li>
                <li><a href="hotelImages.jsp">Images</a></li>
                <li><a href="login.html" class="logout">Log Out</a></li>
            </ul>
        </nav>
        <div class="container">
            <form class="form">
                <div class="form_group">
                    <div class="card" style="margin-right:200px; background-color: #009879;">
                        <div class="container-card">
                            <h4 style="margin-top: 60px; color: white; font-size: 30px;"><b>Hotels</b></h4>
                            <p style="color: white; font-size: 30px;"><%=s_hotels%></p>
                        </div>
                    </div>
                    <div class="card" style="background-color: red;">
                        <div class="container-card">
                            <h4 style="margin-top: 60px; color: white; font-size: 30px;"><b>Clients</b></h4>
                            <p style="color: white; font-size: 30px;"><%=s_users%></p>
                        </div>
                    </div>
                    <br><br><br><br><br>
                    <div class="card" style="margin-right:200px; background-color: navy;">
                        <div class="container-card">
                            <h4 style="margin-top: 60px; color: white; font-size: 30px;"><b>Reservations</b></h4>
                            <p style="color: white; font-size: 30px;"><%=s_reservations%></p>
                        </div>
                    </div>
                    <div class="card" style="background-color: orange;">
                        <div class="container-card">
                            <h4 style="margin-top: 60px; color: white; font-size: 30px;"><b>Rooms</b></h4>
                            <p style="color: white; font-size: 30px;"><%=s_rooms%></p>
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div class="footer">
            <p>Made with ❤ By Al-Amir Hassan & Abd El-Rhman Esmat & Tawfik Yasser</p>
        </div>
    </body>
</html>

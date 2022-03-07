<%-- 
    Document   : userProfile
    Created on : Jan 12, 2021, 11:24:00 AM
    Author     : tawfe
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.DriverManager"%>
<%@page import="java.sql.Statement"%>
<%@page import="java.sql.Connection"%>
<%@page import="java.util.ArrayList"%>
<!DOCTYPE html>
<%
    String userId = request.getParameter("id");
    String username = "";
    String displayname = "";
    String email = "";
    String phone = "";
    String password = "";
    String role = "";
    Class.forName("com.mysql.jdbc.Driver");
    String url = "jdbc:mysql://localhost:3306/hotel_reservation_system_db?useSSL=false";
    String user = "root";
    String passworddb = "troot";
    Connection connection = null;
    Statement statement = null;
    connection = (Connection) DriverManager.getConnection(url, user, passworddb);
    statement = (Statement) connection.createStatement();
    String query = "SELECT * from user WHERE user_id='" + userId + "'";
    ResultSet resultSet = statement.executeQuery(query);
    while (resultSet.next()) {
        username = resultSet.getString("username");
        email = resultSet.getString("email");
        displayname = resultSet.getString("display_name");
        phone = resultSet.getString("phone_number");
        password = resultSet.getString("password");
        role = resultSet.getString("role");
    }
%>
<html>
    <head>
        <script src="jquery-3.5.1.js"></script>
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200&family=Roboto:wght@100&display=swap" rel="stylesheet">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="icon" href="hotelicon.png">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Profile (<%=displayname%>)</title>
        <script>
            function changeDisplayName()
            {
                var x = document.getElementById("edit-displayname").value;

                var xmlhttp = new XMLHttpRequest();

                xmlhttp.onreadystatechange = function ()
                {
                    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                        //Response
                        document.getElementById("edit-displayname").innerHTML = xmlhttp.responseText;
                    }
                };
                xmlhttp.open("GET", "changeProfileData?displayname=" + x + "&email=email&phone=phone&password=password&id=" + 25, true);
                xmlhttp.send();

            }
        </script>
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
                font-size: 27px;
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
                width: 500px;
                max-width: 90%
            }
            .container h3{
                text-align: center;
                margin-top: 5px;
                font-family: 'Nunito', sans-serif;
            }
            .container-img{
                position: relative;

            }
            .center-hotel-name {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 60px;
            }
            .hotel_img{
                margin: 10px auto;
                text-align: center;
                width: 100%;
                max-width: 100%;
                height: 650px;
                display: block;
                margin-left: auto;
                margin-right: auto;
                width: 100%;
                opacity: 0.3;

            }
            .hotel_img-additional{
                margin: 10px auto;
                text-align: center;
                width: 300px;
                margin-left: 300px;
                margin-right: auto;
                display: inline-block;
                max-width: 50%;
                height: 300px;
                border-radius: 50%;
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
            .container form{
                width: 100%;
                height: 100%;
                background: white;
                border-radius: 1px;
                box-shadow: 0 8px 16px rgba(0,0,0,.3);
                padding-top: 10px;
                padding-right: 10px;
                padding-left: 10px;
                padding-bottom: 10px;
            }
            .container form .btn{
                margin-left: 50%;
                margin-top: 15px;
                transform: translateX(-50%);
                width: 50%;
                height: 50px;
                border: none;
                outline: none;
                background: linear-gradient(to right,rgba(79,172,254,.8),rgba(0,242,254,.8));
                cursor: pointer;
                font-size: 16px;
                text-transform: uppercase;
                color: white;
                border-radius: 60px;
                transition: .3s;
                font-family: 'Nunito', sans-serif;
            }
            .container form .form-control{
                width: 100%;
                height: 50px;
                color: black;
                background: #EAEAEA;
                border-radius: 1px;
                border: 0px solid silver;
                margin: 0px 0 25px 0;
                padding: 0 10px;
                font-family: 'Nunito', sans-serif;
            }
        </style>
    </head>
    <body>

        <%if (role.equals("client")) {%>

        <nav>
            <div class="logo">Hotel System</div>
            <ul>
                <li><a href="userProfile.jsp?id=<%= userId%>"><%=displayname%></a></li>
                <li><a href="reservationsClient.jsp?id=<%= userId%>">Reservations</a></li>
                <li><a href="login.html" class="logout">Log Out</a></li>
            </ul>
        </nav>
        <%} else {%>
        <nav>
            <div class="logo">Hotel System (Admin Panel)</div>
            <ul>
                <li><a href="userProfile.jsp?id=<%= userId%>"><%=displayname%></a></li>
                <li><a href="reservations.jsp">Reservations</a></li>
                <li><a href="hotels.jsp">Hotels</a></li>
                <li><a href="rooms.jsp">Rooms</a></li>
                <li><a href="clients.jsp">Clients</a></li>
                <li><a href="notification.jsp">Notification</a></li>
                <li><a href="rates.jsp">Rates</a></li>
                <li><a href="login.html" class="logout">Log Out</a></li>
            </ul>
        </nav>
        <%}%>


        <div class="container-img">
            <img class='hotel_img' src='window.jpg'/>
            <div class="center-hotel-name"><b><%=displayname%></b></div>
        </div>

        <div class="container">
            <form class="form">
                <h3>Welcome</h3>
                <br>
                <div class="form_group">
                    <label class="hotel-info">User Name <b><%=username%></b></label>
                </div>
                <br>
                <hr>
                <br>


                <div class="form_group">
                    <label class="hotel-info">Display Name: <b><%=displayname%></b></label>
                    <br>
                </div>


                <br>
                <hr>
                <br>

                <div class="form_group">
                    <label class="hotel-info">Email Address: <b><%=email%></b></label>
                </div>


                <br>
                <hr>
                <br>


                <div class="form_group">
                    <label class="hotel-info">Phone Number <b><%=phone%></b></label>
                </div>


                <br>
                <hr>
                <br>
                <div class="form_group">
                    <label class="hotel-info">Password <b><%=password%></b></label>

                </div>
                <br>
            </form>

            <form action="changeProfileDataView.jsp">
                <input type="submit" class="btn" value="Change Data">
                <input type="hidden" name="hiddenId" class="btn" value=<%=userId%>>
            </form>
        </div>
    </body>
</html>

<%-- 
    Document   : home
    Created on : Jan 11, 2021, 2:20:38 AM
    Author     : Tawfik
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
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
%>
<html>
    <head>
        <script src="jquery-3.5.1.js"></script>
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200&family=Roboto:wght@100&display=swap" rel="stylesheet">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="icon" href="hotelicon.png">
        <title>Home ( <%= displayname%> )</title>
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
            .search_container{
                margin: 50px auto;
                width: 500px;
                max-width: 90%
            }
            .search_container h3{
                text-align: center;
                margin-top: 5px;
                font-family: 'Nunito', sans-serif;
            }
            .search_container .btn-search{
                background: linear-gradient(to right,rgba(79,172,254,.8),rgba(0,242,254,.8));
                cursor: pointer;
                border-radius: 1px;
                box-shadow: 0 8px 16px rgba(0,0,0,.3);
                padding-top: 10px;
                padding-right: 10px;
                padding-left: 10px;
                padding-bottom: 10px;
                text-align: center;
                width: 100%;
                height: 50px;
                color: white;
                border-radius: 1px;
                border: 0px solid silver;
                margin: 15px 0 10px 0;
                padding: 0 10px;
                font-family: 'Nunito', sans-serif;
            }
            .search_container form{
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
            .search_container form .form_group{
                text-align: center;
                width: 100%;
                height: 50px;
                color: black;
                border-radius: 1px;
                border: 0px solid silver;
                margin: 15px 0 10px 0;
                padding: 0 30px;
                font-family: 'Nunito', sans-serif;
            }
            .form_group_search{
                text-align: center;
                width: 100%;
                height: 50px;
                color: black;
                border-radius: 1px;
                border: 0px solid silver;
                margin-top: 15px;
                font-family: 'Nunito', sans-serif;
            }
            .form_g_text{
                text-align: center;
                width: 100%;
                height: 50px;
                color: black;
                border-radius: 1px;
                border: 0px solid silver;
                margin-top: 15px;
                font-family: 'Nunito', sans-serif;
            }
            .filter_box{
                text-align: center;
                width: 100%;
                height: 50px;
                color: black;
                border-radius: 1px;
                border: 0px solid silver;
                margin-top: 15px;
                font-family: 'Nunito', sans-serif; 
            }
            .city-menu{
                padding: 8px 12px;
                color: #333333;
                width: 100%;
                height: 80%;
                text-align: center;
                background-color: #eee;
                border: 1px solid #dddddd;
                cursor: pointer;
                border-radius: 1px;
            }
            .menu_star_filter{
                padding: 8px 50px;
                color: #333333;
                width: 50%;
                height: 80%;
                box-shadow:2px 2px 12px rgba(0, 0, 0, 0.2), -1px -1px 8px rgba(0, 0, 0, 0.2); 
                text-align: center;
                background-color: #fff;
                border: 1px solid #dddddd;
                cursor: pointer;
                border-radius: 1px;
            }
            .city-menu:focus,
            .city-menu:hover{
                outline: none;
                border: 1px solid #bbbbbb;
            }
            .city-menu option{
                background: #ffffff;
            }
            table {
                border-collapse: collapse;
                width: 800px;
                height: 200px;
                margin: auto;
                margin-top: 80px;
                padding-top: 30px;
                padding-bottom: 30px;
                border: 1px solid #bdc3c7;
                box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.2), -1px -1px 8px rgba(0, 0, 0, 0.2);
            }

            tr {
                transition: all .2s ease-in;
                cursor: auto;
                background-color: #fff
            }
            th,
            td {
                padding: 12px;
                text-align: left;
                color: black;
                border-bottom: 1px solid #ddd;
            }

            #header {
                background-color: white;
                color: white;
            }
            @media only screen and (max-width: 768px) {
                table {
                    width: 100%;
                }
            }
            section{
                height: 100vh;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-bottom: -400px;

            }
            .card{
                background-color: #fff;
                box-shadow: 0 0 0.9375em rgba(0,0,0,0.219);
                width: 800px;
                margin-top: -400px;
                border-radius: 4px;
                display: flex;
            }
            .card:hover{
                background: linear-gradient(to right,rgba(79,172,254,.8),rgba(0,242,254,.8));
                color: navy;
                transform: scale(1.02);
                box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.2), -1px -1px 8px rgba(0, 0, 0, 0.2);
            }
            .card__hero{
                flex: 0 0 50%;
                position: relative;
            }
            .card__content{
                flex: 1;
                padding: 35px 35px 25px 35px;
                display: flex;
                flex-direction: column;
            }
            .card__img{
                display: block;
                width: 100%;
            }
            .card__middle{
                position: absolute;
                top:85%;
                left:50%;
                transform: translate(-50%,-50%);
            }
            .card__middle-text{
                background-color: #fff;
                font-size: 13.5px;
                font-weight: 400;
                border-radius: 2px;
                padding: 10px 22px;
                box-shadow: 0 0 0.9375em rgba(0,0,0,0.219);
            }
            .card__info{
                display: flex;
                flex-direction: column;

                margin-bottom: auto;
            }
            .card__price{
                font-weight: 500;
                letter-spacing: 1px;
                font-size: 22px;
                margin-bottom: 8px;
            }
            .card__address{
                font-size: 14px;
                font-weight: 300;
                margin-bottom: 8px;
            }
            .card__details{
                font-size: 12.5px;
                font-weight: 400;
            }
            .card__buttons{
                width: 100%;
                display: flex;
                justify-content: flex-end;
            }
            .card__btn{
                text-transform: uppercase;
                text-decoration: none;
                font-size: 12px;
                font-weight: 500;
                color: navy;

                padding-bottom: 2px;
                border-bottom: 1px solid transparent;
                transition:  border-bottom .4s;
            }
            .card__btn:hover{
                border-bottom: 1px solid navy;
                color: navy;
            }
            .card__btn:not(:last-child){
                margin-right: 10px;
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
            }

        </style>
    </head>
    <body>
        <nav>
            <div class="logo">Hotel System</div>
            <ul>
                <li><a href="userProfile.jsp?id=<%= user_Id%>"><%=displayname%></a></li>
                <li><a href="reservationsClient.jsp?id=<%= user_Id%>">Reservations</a></li>
                <li><a href="login.html" class="logout">Log Out</a></li>
            </ul>
        </nav>
        <div class="search_container">
            <form class="form">
                <h3>Find deals on hotels, homes and much more...</h3>
                <div class="form_group">
                    <select class="city-menu" id="city" name="cityList" data-dropdown>
                        <option value="" disabled selected>Where are you going?</option>
                        <%
                            Class.forName("com.mysql.jdbc.Driver");
                            url = "jdbc:mysql://localhost:3306/hotel_reservation_system_db?useSSL=false";
                            user = "root";
                            passworddb = "troot";
                            connection = null;
                            statement = null;
                            connection = (Connection) DriverManager.getConnection(url, user, passworddb);
                            statement = (Statement) connection.createStatement();
                            query = "SELECT DISTINCT hotel_city FROM hotel";
                            resultSet = null;
                            resultSet = statement.executeQuery(query);
                            while (resultSet.next()) {
                        %>
                        <option value="<%=resultSet.getString("hotel_city")%>"><%=resultSet.getString("hotel_city")%></option>
                        <%
                            }
                        %>
                    </select>
                </div>
                <div class="form_group">
                    <label>Check In</label>
                    <br>
                    <input class="city-menu" type="date" name="checkindate"/>
                    <input class="city-menu" type="hidden" id="u_id" name="u_id" value='<%=user_Id%>'/>
                </div>
                <div class="form_group">
                    <label>Check Out</label>
                    <br>
                    <input class="city-menu" type="date" name="checkoutdate"/>
                </div>
                <div class="form_group">
                    <label>Number of Adults</label>
                    <br>
                    <select class="city-menu">
                        <option value="" disabled selected>Number of adults</option>
                        <option value="1" >1</option>
                        <option value="2" >2</option>
                        <option value="3" >3</option>
                        <option value="4" >4</option>
                        <option value="5" >5</option>
                    </select>
                </div>
                <div class="form_group">
                    <label>Number of Children</label>
                    <br>
                    <select class="city-menu">
                        <option value="" disabled selected>Number of children</option>
                        <option value="0" >0</option>
                        <option value="1" >1</option>
                        <option value="2" >2</option>
                        <option value="3" >3</option>
                        <option value="4" >4</option>
                        <option value="5" >5</option>
                    </select>
                </div>
                <br>
            </form>
            <div class="form_group">
                <button type="button" class="btn-search" id="sub" onclick="searchHotels()">Submit</button>
            </div>
        </div>
        <div class="form_g_text">
            <div id="searchResult" style="font-size: 25px;"></div>
        </div>
        <div class="filter_box" hidden>
            <select id="selectStar" class="menu_star_filter"  name="starList" onchange="filterStar(this.value)" data-dropdown>
                <option value="" disabled selected>Filter by stars</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <select id="selectStar" class="menu_star_filter"  name="starList" onchange="filterOther(this.value)" data-dropdown>
                <option value="" disabled selected>Other filters</option>
                <option value="rate">By Rate (Highest First)</option>
                <option value="price">By Price (Lowest First)</option>
                <option value="distance">By Distance (Nearest First)</option>
            </select>
            <select id="selectMeal" class="menu_star_filter"  name="mealList" onchange="filterMeal(this.value)" data-dropdown>
                <option value="" disabled selected>Filter by meals</option>
                <%
                    Class.forName("com.mysql.jdbc.Driver");
                    url = "jdbc:mysql://localhost:3306/hotel_reservation_system_db?useSSL=false";
                    user = "root";
                    passworddb = "troot";
                    connection = null;
                    statement = null;
                    connection = (Connection) DriverManager.getConnection(url, user, passworddb);
                    statement = (Statement) connection.createStatement();
                    query = "SELECT DISTINCT meal_name FROM meals";
                    resultSet = null;
                    resultSet = statement.executeQuery(query);
                    while (resultSet.next()) {
                %>
                <option value="<%=resultSet.getString("meal_name")%>"><%=resultSet.getString("meal_name")%></option>
                <%
                    }
                %>
            </select>
        </div>
        <div class="form_group_search">
        </div>
        <div class="footer">
            <p>Made with ❤ By Al-Amir Hassan & Abd El-Rhman Esmat & Tawfik Yasser</p>
        </div>
    </body>
</html>
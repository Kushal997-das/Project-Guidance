<%-- 
    Document   : hotelImages
    Created on : Jan 15, 2021, 7:02:46 PM
    Author     : Tawfik
--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.DriverManager"%>
<%@page import="java.sql.Statement"%>
<%@page import="java.sql.Connection"%>
<!DOCTYPE html>
<%
    Class.forName("com.mysql.jdbc.Driver");
    String url = "jdbc:mysql://localhost:3306/hotel_reservation_system_db?useSSL=false";
    String user = "root";
    String passworddb = "troot";
    Connection connection = null;
    Statement statement = null;
    connection = (Connection) DriverManager.getConnection(url, user, passworddb);
    statement = (Statement) connection.createStatement();
    String query = "SELECT * FROM hotel";
    ResultSet resultSet = null;
    resultSet = statement.executeQuery(query);
%>
<html>
    <head>
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script src="jquery-3.5.1.js"></script>
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200&family=Roboto:wght@100&display=swap" rel="stylesheet">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="icon" href="hotelicon.png">
        <title>Hotel Images</title>
        <script>
            function getHotelId() {
                document.getElementById("h_id").value = document.getElementById("hotel").value;
            }
            function getHotelId2() {
                document.getElementById("h_id2").value = document.getElementById("hotel2").value;
            }
            function getImg1() {
                document.getElementById("img_1").value = document.getElementById("img1").value;
            }
            function getImg2() {
                document.getElementById("img_2").value = document.getElementById("img2").value;
            }
            function getImg3() {
                document.getElementById("img_3").value = document.getElementById("img3").value;
            }
            function getImg4() {
                document.getElementById("img_4").value = document.getElementById("img4").value;
            }
            function getImg5() {
                document.getElementById("img_5").value = document.getElementById("img5").value;
            }
        </script>
        <style>
            *{
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            .container{
                margin: 10px auto;
                width: 100%;
                max-width: 100%;
                margin-bottom: 300px;
            }
            table, th, td {
                border-collapse: collapse;
                padding: 15px;
                text-align: center;

            }
            table.center {
                width: 50%;
                margin-left: auto; 
                margin-right: auto;
                border-collapse: collapse;
                border-radius: 5px 5px 0 0;
                overflow: hidden;
                font-size: 0.9em;
                box-shadow: 0 0 20px rgba(0,0,0,0.15);
                margin-bottom: 50px;
                font-family: 'Nunito', sans-serif;
            }
            th{
                background-color: #009879;
                color: white;
                text-align: center;
                font-weight: bolder;

            }
            .center th,td{
                padding: 12px 15px;

            }
            .center tbody,tr{
                border-bottom: 1px solid #dddddd;
            }
            .center tbody tr:nth-of-type(even){
                background-color: #f3f3f3;

            }            
            .container h3{
                text-align: center;
                margin-top: 5px;
                font-size: 25px;
                font-family: 'Nunito', sans-serif;
            }
            .btn{
                width: 100%;       
                height: 100%;
                margin-bottom: 0.5em;
                padding-top: .6em;
                padding-bottom: .6em;
                color: #fff;
                background-color: #009879;
                cursor: pointer;
            }
            .btn-disabled{
                width: 100%;       /* set to 100% */
                height: 100%;      /* set to 100% */
                margin-bottom: 0.5em;
                padding-top: .6em;
                padding-bottom: .6em;
                color: #fff;
                background-color: #dddddd;
            }
            .btn-cancel{
                width: 100%;       /* set to 100% */
                height: 100%;      /* set to 100% */
                margin-bottom: 0.5em;
                padding-top: .6em;
                padding-bottom: .6em;
                color: #fff;
                background-color: #AF261B;
                cursor: pointer;
            }
            .container .filter-date-div{
                text-align: center;
                width: 50%;
                height: 50%;
                color: black;
                border-radius: 1px;
                border: 0px solid silver;
                margin: auto;
                margin-bottom: 100px;
                padding: 0 30px;
                font-family: 'Nunito', sans-serif;
            }
            .city-menu{
                padding: 8px 12px;
                color: #333333;
                width: 50%;
                height: 80%;
                text-align: center;
                background-color: #eee;
                border: 1px solid #dddddd;
                cursor: pointer;
                border-radius: 1px;

            }
            .container .filter-date-div .btn-search{
                margin: auto;
                text-align: center;
                width: 50%;
                margin-bottom: 5px;
                height: 50px;
                border: none;
                outline: none;
                background: #009879;
                cursor: pointer;
                font-size: 16px;
                text-transform: uppercase;
                color: white;
                border-radius: 30px;
                transition: .3s;
                font-family: 'Nunito', sans-serif;
            }

            .add-container{
                margin: auto;
                width: 100%;
                max-width: 100%;
                display: block;
            }
            .container .filter-date-div form{
                width: 100%;
                height: 100%;
                padding: 20px;
                background: white;
                border-radius: 1px;
                box-shadow: 0 8px 16px rgba(0,0,0,.3);
                padding-top: 50px;
                padding-right: 50px;
                padding-left: 50px;
                padding-bottom: 50px;
            }
            .container .filter-date-div form .form-control{
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
            .add-container form .form_group{
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
            .add-container form .btn{
                margin-left: 50%;
                transform: translateX(-50%);
                width: 100%;
                height: 50px;
                border: none;
                outline: none;
                background: linear-gradient(to right,rgba(79,172,254,.8),rgba(0,242,254,.8));
                cursor: pointer;
                font-size: 16px;
                text-transform: uppercase;
                color: white;
                border-radius: 1px;
                transition: .3s;
                font-family: 'Nunito', sans-serif;
            }
            .add-container form .btn:hover{
                opacity: .7;
            }
            .h1{
                text-align: center;
                margin-bottom: 24px;
                margin: auto;
                color: #222;
                font-family: 'Nunito', sans-serif;
            }
            ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
                color: #B8B8B8;
                opacity: 1; /* Firefox */
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
                margin-bottom: 30px;
            }
            .city-menu:focus,
            .city-menu:hover{
                outline: none;
                border: 1px solid #bbbbbb;
            }
            .city-menu option{
                background: #ffffff;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h3 style="margin: 30px;">Add Images</h3>
            <div class="filter-date-div">
                <form action="addHotelImages" method="Post">  
                    <div class="form_group">
                        <select class="city-menu" id="hotel" name="hotelList" data-dropdown onchange="getHotelId()">
                            <option value="" disabled selected>Select a hotel to add photos</option>
                            <%
                                Class.forName("com.mysql.jdbc.Driver");
                                url = "jdbc:mysql://localhost:3306/hotel_reservation_system_db?useSSL=false";
                                user = "root";
                                passworddb = "troot";
                                connection = null;
                                statement = null;
                                connection = (Connection) DriverManager.getConnection(url, user, passworddb);
                                statement = (Statement) connection.createStatement();
                                query = "SELECT * FROM hotel";
                                resultSet = null;
                                resultSet = statement.executeQuery(query);
                                while (resultSet.next()) {
                            %>
                            <option value="<%=resultSet.getInt("hotel_id")%>">Hotel Name: <%=resultSet.getString("hotel_name")%> - Hotel ID: <%=resultSet.getInt("hotel_id")%></option>
                            <%
                                }
                            %>
                        </select>
                        <label id="listError"></label>
                    </div>
                    Select Image 1:  <input type="file" name="img1" id="img1" >
                    <br>
                    Select Image 2:  <input type="file" name="img2" id="img2" >
                    <br>
                    Select Image 3:  <input type="file" name="img3" id="img3" >
                    <br>
                    Select Image 4:  <input type="file" name="img4" id="img4" >
                    <br>
                    Select Image 5:  <input type="file" name="img5" id="img5" >
                    <br>
                    <br>
                    <input type="submit" class="btn" value="Add Hotel Photos">
                    <input type="hidden" name="hidden_img1" id="img_1" class="btn"/>
                    <input type="hidden" name="hidden_img2" id="img_2" class="btn"/>
                    <input type="hidden" name="hidden_img3" id="img_3" class="btn"/>
                    <input type="hidden" name="hidden_img4" id="img_4" class="btn"/>
                    <input type="hidden" name="hidden_img5" id="img_5" class="btn"/>
                    <input type="hidden" name="hiddenHotelId" id="h_id" class="btn"/>
                </form>
            </div>
            <h3 style="margin: 30px;">Update Images (Choose Hotel ID)</h3>
            <div class="filter-date-div">
                <form action="updateHotelImages.jsp" method="Post">  
                    <div class="form_group">
                        <select class="city-menu" id="hotel2" name="hotelList" data-dropdown onchange="getHotelId2()">
                            <option value="" disabled selected>Select a hotel to update photos</option>
                            <%
                                Class.forName("com.mysql.jdbc.Driver");
                                url = "jdbc:mysql://localhost:3306/hotel_reservation_system_db?useSSL=false";
                                user = "root";
                                passworddb = "troot";
                                connection = null;
                                statement = null;
                                connection = (Connection) DriverManager.getConnection(url, user, passworddb);
                                statement = (Statement) connection.createStatement();
                                query = "SELECT * FROM hotel";
                                resultSet = null;
                                resultSet = statement.executeQuery(query);
                                while (resultSet.next()) {
                            %>
                            <option value="<%=resultSet.getInt("hotel_id")%>">Hotel Name: <%=resultSet.getString("hotel_name")%> - Hotel ID: <%=resultSet.getInt("hotel_id")%></option>
                            <%
                                }
                            %>
                        </select>
                    </div>
                    <input type="submit" class="btn" value="Update Hotel Photos">
                    <input type="hidden" name="hiddenHotelId2" id="h_id2"/>
                </form>
            </div>
        </div>
    </body>
</html>
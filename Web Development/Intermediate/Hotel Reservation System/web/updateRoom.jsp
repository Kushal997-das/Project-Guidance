<%-- 
    Document   : updateRoom
    Created on : Jan 14, 2021, 4:15:58 PM
    Author     : tawfe
--%>

<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.DriverManager"%>
<%@page import="java.sql.Statement"%>
<%@page import="java.sql.Connection"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%
    String room_id = request.getParameter("hiddenRoomId");
    Class.forName("com.mysql.jdbc.Driver");
    String url = "jdbc:mysql://localhost:3306/hotel_reservation_system_db?useSSL=false";
    String user = "root";
    String passworddb = "troot";
    Connection connection = null;
    Statement statement = null;
    connection = (Connection) DriverManager.getConnection(url, user, passworddb);
    statement = (Statement) connection.createStatement();
    String query = "SELECT * FROM room";
    ResultSet resultSet = null;
    resultSet = statement.executeQuery(query);
    String type = "";
    String price = "";
    String availability = "";
    String facility = "";
    int hotel_id = 0;
    String hotel_name = "";
    while (resultSet.next()) {
        if (resultSet.getInt("room_id") == Integer.valueOf(room_id)) {
            type = resultSet.getString("room_type");
            price = resultSet.getString("room_price");
            availability = resultSet.getString("room_availability");
            facility = resultSet.getString("room_facility");
            hotel_id = resultSet.getInt("hotel_id");
        }
    }
    statement = null;
    statement = (Statement) connection.createStatement();
    query = "SELECT * FROM hotel";
    resultSet = null;
    resultSet = statement.executeQuery(query);
    while (resultSet.next()) {
        if (resultSet.getInt("hotel_id") == hotel_id) {
            hotel_name = resultSet.getString("hotel_name");
        }
    }
%>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Update Room</title>
        <meta charset="UTF-8">
        <link rel="icon" href="hotelicon.png">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200&family=Roboto:wght@100&display=swap" rel="stylesheet">
        <script>
            function checkForm(form)
            {

                if (form.room_type.value === "") {
                    var Type = document.getElementById("typeError");
                    Type.innerHTML = "   Error: Type cannot be blank!";
                    Type.style.color = "red";
                    form.room_type.focus();
                    return false;
                }
                if (form.room_availability.value === "") {
                    var Availability = document.getElementById("availabilityError");
                    Availability.innerHTML = "   Error: Availability cannot be blank!";
                    Availability.style.color = "red";
                    form.room_availability.focus();
                    return false;
                }
                if (form.room_price.value === "") {
                    var Price = document.getElementById("priceError");
                    Price.innerHTML = "   Error: Price cannot be blank!";
                    Price.style.color = "red";
                    form.room_price.focus();
                    return false;
                }
                if (form.room_facility.value === "") {
                    var Facility = document.getElementById("facilityError");
                    Facility.innerHTML = "   Error: Facility cannot be blank!";
                    Facility.style.color = "red";
                    form.room_facility.focus();
                    return false;
                }
                if (form.hotelList.value === "") {
                    var hList = document.getElementById("listError");
                    hList.innerHTML = "   Error: Hotel Name cannot be blank!";
                    hList.style.color = "red";
                    form.hotelList.focus();
                    return false;
                }
            }

            function cHotel() {
                document.getElementById("hotel_id").value = document.getElementById("hotel").value;
            }

        </script>
        <style>
            *{
                margin: 0;
                padding: 0;
                box-sizing: border-box
            }
            body{
                min-height: 100vh;
                background: #eee;
                display: flex;
                font-family: 'Nunito', sans-serif;
            }
            .container{
                margin: auto;
                width: 500px;
                max-width: 90%
            }
            .container h1{
                text-align: center;
                margin: 30px;
                font-family: 'Nunito', sans-serif;
            }
            .container form{
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
            .container form .btn{
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
            .container form .btn:hover{
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
            .center {
                display: block;
                margin-left: auto;
                margin-right: auto;
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
            <img src="hotelicon.png" alt="Hotel Reservation System" width="100" height="100" class="center">
            <h1>Update Room Data</h1>
            <form onsubmit= "return checkForm(this);" action = "updateRoomData" method="Post">    
                <div class="form-group">
                    <input type="text" class="form-control" name="room_type" placeholder="Room Type" id="room_type" value='<%=type%>' onchange="myFunction(this)">
                    <label id="typeError"></label>
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" name="room_availability" placeholder="Room Availability" id="room_availability" value='<%=availability%>' onchange="myFunction(this)">
                    <label id="availabilityError"></label>
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" name="room_price" placeholder="Room Price" id="room_price" value='<%=price%>' onchange="myFunction(this)">
                    <label id="priceError"></label>
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" name="room_facility" placeholder="Room Facility" id="room_facility" value='<%=facility%>' onchange="myFunction(this)">
                    <label id="facilityError"></label>
                </div>
                <div class="form-group">
                    <input type="hidden" class="form-control" name="room_id"  value='<%=room_id%>' >
                </div>
                <div class="form-group">
                    <input type="hidden" class="form-control" name="hotel_id" id="hotel_id"  value='<%=hotel_id%>' >
                </div>
                <div class="form_group">
                    <select class="city-menu" id="hotel" name="hotelList" data-dropdown onchange="cHotel()">
                        <option value="" disabled selected>Select the hotel name [Previous: <%=hotel_name%>]</option>
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
                        <option value="<%=resultSet.getString("hotel_id")%>"><%=resultSet.getString("hotel_name")%></option>
                        <%
                            }
                        %>
                    </select>
                    <label id="listError"></label>
                </div>

                <input type="submit" class="btn" value="Save">
            </form>
        </div>
    </body>
</html>

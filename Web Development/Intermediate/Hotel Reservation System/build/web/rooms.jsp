<%-- 
    Document   : rooms
    Created on : Jan 14, 2021, 2:02:40 PM
    Author     : tawfe
--%>

<%@page import="java.util.ArrayList"%>
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
    Statement statement1 = null;
    Statement statement2 = null;
    Statement statement4 = null;
    connection = (Connection) DriverManager.getConnection(url, user, passworddb);
    statement = (Statement) connection.createStatement();
    String query = "SELECT * FROM room";
    ResultSet resultSet = null;
    resultSet = statement.executeQuery(query);

%>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script src="jquery-3.5.1.js"></script>
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200&family=Roboto:wght@100&display=swap" rel="stylesheet">
        <link rel="icon" href="hotelicon.png">
        <script type="text/javascript" src="reservationJs.js"></script>
        <title>Rooms</title>
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
            function myFunction(elem) {
                if (elem.name === "room_type") {
                    document.getElementById("typeError").innerHTML = "";
                }
                if (elem.name === "room_availability") {
                    document.getElementById("availabilityError").innerHTML = "";
                }
                if (elem.name === "room_price") {
                    document.getElementById("priceError").innerHTML = "";
                }
                if (elem.name === "room_facility") {
                    document.getElementById("facilityError").innerHTML = "";
                }
                if (elem.name === "hotelList") {
                    document.getElementById("listError").innerHTML = "";
                }
            }


            function getRoomData(room_id) {
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function ()
                {
                    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                        //Response
                        $(".table-group-history").html(xmlhttp.responseText);
                    }
                };
                xmlhttp.open("GET", "getRoom?room_id=" + room_id, true);
                xmlhttp.send();
            }

            function getRoomId() {
                document.getElementById("r_id").value = document.getElementById("room").value;
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
            <h3 style="margin: 30px;">System Rooms</h3>
            <div class="table-group">
                <table  class="center">
                    <%while (resultSet.next()) {%>
                    <tr>
                        <th colspan="2">Room #<%=resultSet.getInt("room_id")%></th>
                    </tr>

                    <tr>
                        <th>Room Type</th>
                        <td><%=resultSet.getString("room_type")%></td>
                    </tr>
                    <tr>
                        <th>Room Availability</th>
                        <td><%=resultSet.getString("room_availability")%></td>
                    </tr>
                    <tr>
                        <th>Room Price</th>
                        <td>$<%=resultSet.getString("room_price")%></td>
                    </tr>
                    <tr>
                        <th>Hotel Id</th>
                        <td><%=resultSet.getInt("hotel_id")%></td>
                    </tr>
                    <tr>
                        <th>Room Facility</th>
                        <td><%=resultSet.getString("room_facility")%></td>
                    </tr>
                    <%}%>
                </table>
            </div>

            <h3 style="margin-bottom: 50px;">Add Room</h3>


            <div class="filter-date-div">
                <form onsubmit= "return checkForm(this)" action="addRoom" method="Post">  

                    <div class="form-group">
                        <input type="text" class="form-control" name="room_type" placeholder="Room Type" onchange="myFunction(this)">
                        <label id="typeError"></label>
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" name="room_availability" placeholder="Room Availability" onchange="myFunction(this)">
                        <label id="availabilityError"></label>
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" name="room_price" placeholder="Room Price" onchange="myFunction(this)">
                        <label id="priceError"></label>
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" name="room_facility" placeholder="Room Facility" onchange="myFunction(this)">
                        <label id="facilityError"></label>
                    </div>
                    <div class="form_group">
                        <select class="city-menu" id="hotel" name="hotelList" data-dropdown>
                            <option value="" disabled selected>Select the hotel name</option>
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
                    <input type="submit" class="btn" value="Add Room">
                </form>
            </div>

            <h3 style="margin-bottom: 50px;">Update Room</h3>  

            <div class="filter-date-div">
                <form action="updateRoom.jsp" method="Post">  
                    <div class="form_group">
                        <select class="city-menu" id="room" name="roomlList" data-dropdown onchange="getRoomId()">
                            <option value="" disabled selected>Select a room to update</option>
                            <%
                                Class.forName("com.mysql.jdbc.Driver");
                                url = "jdbc:mysql://localhost:3306/hotel_reservation_system_db?useSSL=false";
                                user = "root";
                                passworddb = "troot";
                                connection = null;
                                statement = null;
                                connection = (Connection) DriverManager.getConnection(url, user, passworddb);
                                statement = (Statement) connection.createStatement();
                                query = "SELECT * FROM room";
                                resultSet = null;
                                resultSet = statement.executeQuery(query);
                                while (resultSet.next()) {
                            %>
                            <option value="<%=resultSet.getInt("room_id")%>">Room Type: <%=resultSet.getString("room_type")%> - Room ID: <%=resultSet.getInt("room_id")%></option>
                            <%
                                }
                            %>
                        </select>
                        <label id="listError"></label>
                    </div>

                    <input type="submit" class="btn" value="Update Room">
                    <input type="hidden" name="hiddenRoomId" id="r_id" class="btn"/>
                </form>
            </div>


        </div>

    </body>
</html>

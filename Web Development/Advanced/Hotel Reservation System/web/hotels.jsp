<%-- 
    Document   : hotels
    Created on : Jan 14, 2021, 8:24:28 PM
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
    connection = (Connection) DriverManager.getConnection(url, user, passworddb);
    statement = (Statement) connection.createStatement();
    String query = "SELECT * FROM hotel";
    ResultSet resultSet = null;
    resultSet = statement.executeQuery(query);
%>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script src="jquery-3.5.1.js"></script>
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200&family=Roboto:wght@100&display=swap" rel="stylesheet">
        <link rel="icon" href="hotelicon.png">
        <title>Hotels</title>
        <script>
            function checkForm(form)
            {
                if (form.hotel_name.value === "") {
                    var Name = document.getElementById("nameError");
                    Name.innerHTML = "   Error: Name cannot be blank!";
                    Name.style.color = "red";
                    form.hotel_name.focus();
                    return false;
                }
                if (form.hotel_stars.value === "") {
                    var Stars = document.getElementById("starsError");
                    Stars.innerHTML = "   Error: Stars cannot be blank!";
                    Stars.style.color = "red";
                    form.hotel_stars.focus();
                    return false;
                }
                if (form.hotel_location.value === "") {
                    var Loc = document.getElementById("locationError");
                    Loc.innerHTML = "   Error: Location cannot be blank!";
                    Loc.style.color = "red";
                    form.hotel_location.focus();
                    return false;
                }
                if (form.hotel_distance.value === "") {
                    var Distance = document.getElementById("distanceError");
                    Distance.innerHTML = "   Error: Distance cannot be blank!";
                    Distance.style.color = "red";
                    form.hotel_distance.focus();
                    return false;
                }
                if (form.hotel_phone.value === "") {
                    var Phone = document.getElementById("phoneError");
                    Phone.innerHTML = "   Error: Phone Name cannot be blank!";
                    Phone.style.color = "red";
                    form.hotel_phone.focus();
                    return false;
                }
                if (form.hotel_min_price.value === "") {
                    var Min = document.getElementById("minError");
                    Min.innerHTML = "   Error: Minimum Price cannot be blank!";
                    Min.style.color = "red";
                    form.hotel_min_price.focus();
                    return false;
                }
                if (form.hotel_max_price.value === "") {
                    var Max = document.getElementById("maxError");
                    Max.innerHTML = "   Error: Maximum Price cannot be blank!";
                    Max.style.color = "red";
                    form.hotel_max_price.focus();
                    return false;
                }
                if (form.hotel_availability.value === "") {
                    var Avilability = document.getElementById("avilabilityError");
                    Avilability.innerHTML = "   Error: Avilability Price cannot be blank!";
                    Avilability.style.color = "red";
                    form.hotel_availability.focus();
                    return false;
                }
                if (form.hotel_city.value === "") {
                    var City = document.getElementById("cityError");
                    City.innerHTML = "   Error: City Price cannot be blank!";
                    City.style.color = "red";
                    form.hotel_city.focus();
                    return false;
                }
            }
            function myFunction(elem) {
                if (elem.name === "hotel_name") {
                    document.getElementById("nameError").innerHTML = "";
                }
                if (elem.name === "hotel_stars") {
                    document.getElementById("starsError").innerHTML = "";
                }
                if (elem.name === "hotel_location") {
                    document.getElementById("locationError").innerHTML = "";
                }
                if (elem.name === "hotel_distance") {
                    document.getElementById("distanceError").innerHTML = "";
                }
                if (elem.name === "hotel_phone") {
                    document.getElementById("phoneError").innerHTML = "";
                }
                if (elem.name === "hotel_min_price") {
                    document.getElementById("minError").innerHTML = "";
                }
                if (elem.name === "hotel_max_price") {
                    document.getElementById("maxError").innerHTML = "";
                }
                if (elem.name === "hotel_availability") {
                    document.getElementById("avilabilityError").innerHTML = "";
                }
                if (elem.name === "hotel_city") {
                    document.getElementById("cityError").innerHTML = "";
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

            function getHotelId() {
                document.getElementById("h_id").value = document.getElementById("hotel").value;
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
            <h3 style="margin: 30px;">System Hotels</h3>
            <div class="table-group">
                <table  class="center">
                    <%while (resultSet.next()) {%>
                    <tr>
                        <th colspan="2">Hotel #<%=resultSet.getInt("hotel_id")%></th>
                    </tr>

                    <tr>
                        <th>Hotel Name</th>
                        <td><%=resultSet.getString("hotel_name")%></td>
                    </tr>
                    <tr>
                        <th>Hotel Stars</th>
                        <td><%=resultSet.getString("hotel_stars")%> Stars</td>
                    </tr>
                    <tr>
                        <th>Hotel Location</th>
                        <td><a href="<%=resultSet.getString("hotel_location")%>" target="_blank">Location on map</a></td>
                    </tr>
                    <tr>
                        <th>Hotel Distance From Center</th>
                        <td><%=resultSet.getInt("hotel_distance")%> km from center</td>
                    </tr>
                    <tr>
                        <th>Hotel Phone Number</th>
                        <td><%=resultSet.getString("hotel_phone")%></td>
                    </tr>
                    <tr>
                        <th>Hotel Minimum Price</th>
                        <td>$<%=resultSet.getString("hotel_price_min")%></td>
                    </tr>
                    <tr>
                        <th>Hotel Maximum Price</th>
                        <td>$<%=resultSet.getString("hotel_price_max")%></td>
                    </tr>
                    <tr>
                        <th>Hotel Availability</th>
                        <td><%=resultSet.getString("hotel_availability")%></td>
                    </tr>
                    <tr>
                        <th>Hotel City</th>
                        <td><%=resultSet.getString("hotel_city")%></td>
                    </tr>
                    <tr>
                        <th>Hotel Rate</th>
                        <td><%=resultSet.getString("hotel_avg_rate")%></td>
                    </tr>
                    <%}%>
                </table>
            </div>

            <h3 style="margin: 30px;">Add Hotel</h3>

            <div class="filter-date-div">
                <form  onsubmit="return checkForm(this)" action="addHotel" method="Post">

                    <div class="form-group">
                        <input type="text" class="form-control" name="hotel_name" placeholder="Hotel Name" onchange="myFunction(this)">
                        <label id="nameError"></label>
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" name="hotel_stars" placeholder="Hotel Stars" onchange="myFunction(this)">
                        <label id="starsError"></label>
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" name="hotel_location" placeholder="Hotel Location" onchange="myFunction(this)">
                        <label id="locationError"></label>
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" name="hotel_distance" placeholder="Hotel Distance From Center" onchange="myFunction(this)">
                        <label id="distanceError"></label>
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" name="hotel_phone" placeholder="Hotel Phone Number" onchange="myFunction(this)">
                        <label id="phoneError"></label>
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" name="hotel_min_price" placeholder="Hotel Minimum Price" onchange="myFunction(this)">
                        <label id="minError"></label>
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" name="hotel_max_price" placeholder="Hotel Maximum Price" onchange="myFunction(this)">
                        <label id="maxError"></label>
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" name="hotel_availability" placeholder="Hotel Availability" onchange="myFunction(this)">
                        <label id="avilabilityError"></label>
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" name="hotel_city" placeholder="Hotel City" onchange="myFunction(this)">
                        <label id="cityError"></label>
                    </div>
                    <input type="submit" class="btn" value="Add Hotel">
                </form>
            </div>

            <h3 style="margin-bottom: 50px;">Update Hotel</h3> 

            <div class="filter-date-div">
                <form action="updateHotel.jsp" method="Post">  
                    <div class="form_group">
                        <select class="city-menu" id="hotel" name="hotelList" data-dropdown onchange="getHotelId()">
                            <option value="" disabled selected>Select a hotel to update</option>
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

                    <input type="submit" class="btn" value="Update Hotel">
                    <input type="hidden" name="hiddenHotelId" id="h_id" class="btn"/>
                </form>
            </div>
        </div>
    </body>
</html>

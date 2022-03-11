<%-- 
    Document   : updateHotel
    Created on : Jan 14, 2021, 11:59:18 PM
    Author     : tawfe
--%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.DriverManager"%>
<%@page import="java.sql.Statement"%>
<%@page import="java.sql.Connection"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%
    String hotel_id = request.getParameter("hiddenHotelId");
    Class.forName("com.mysql.jdbc.Driver");
    String url = "jdbc:mysql://localhost:3306/hotel_reservation_system_db?useSSL=false";
    String user = "root";
    String passworddb = "troot";
    Connection connection = null;
    Statement statement = null;
    connection = (Connection) DriverManager.getConnection(url, user, passworddb);
    statement = (Statement) connection.createStatement();
    String query = "SELECT * FROM hotel WHERE hotel_id ='" + hotel_id + "'";
    ResultSet resultSet = null;
    resultSet = statement.executeQuery(query);
    String name = "";
    String stars = "";
    String location = "";
    String distance = "";
    String phone = "";
    String min = "";
    String max = "";
    String avilability = "";
    String city = "";
    while (resultSet.next()) {
        if (resultSet.getInt("hotel_id") == Integer.valueOf(hotel_id)) {
            name = resultSet.getString("hotel_name");
            stars = resultSet.getString("hotel_stars");
            location = resultSet.getString("hotel_location");
            distance = resultSet.getString("hotel_distance");
            phone = resultSet.getString("hotel_phone");
            min = resultSet.getString("hotel_price_min");
            max = resultSet.getString("hotel_price_max");
            avilability = resultSet.getString("hotel_availability");
            city = resultSet.getString("hotel_city");
        }
    }


%>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Update Hotel</title>
        <meta charset="UTF-8">
        <link rel="icon" href="hotelicon.png">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200&family=Roboto:wght@100&display=swap" rel="stylesheet">
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
                if (form.hotel_min.value === "") {
                    var Min = document.getElementById("minError");
                    Min.innerHTML = "   Error: Minimum Price cannot be blank!";
                    Min.style.color = "red";
                    form.hotel_min.focus();
                    return false;
                }
                if (form.hotel_max.value === "") {
                    var Max = document.getElementById("maxError");
                    Max.innerHTML = "   Error: Maximum Price cannot be blank!";
                    Max.style.color = "red";
                    form.hotel_max.focus();
                    return false;
                }
                if (form.hotel_availability.value === "") {
                    var Avilability = document.getElementById("availabilityError");
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
            <h1>Update Hotel Data</h1>
            <form onsubmit= "return checkForm(this);" action = "updateHotelData" method="Post">    
                <div class="form-group">
                    <input type="text" class="form-control" name="hotel_name" placeholder="Hotel Name" id="hotel_name" value='<%=name%>' onchange="myFunction(this)">
                    <label id="typeError"></label>
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" name="hotel_stars" placeholder="Hotel Stars" id="hotel_stars" value='<%=stars%>' onchange="myFunction(this)">
                    <label id="nameError"></label>
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" name="hotel_location" placeholder="Hotel Location" id="hotel_location" value='<%=location%>' onchange="myFunction(this)">
                    <label id="locationError"></label>
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" name="hotel_distance" placeholder="Hotel Distance" id="hotel_distance" value='<%=distance%>' onchange="myFunction(this)">
                    <label id="distanceError"></label>
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" name="hotel_phone" placeholder="Hotel Phone" id="hotel_phone" value='<%=phone%>' onchange="myFunction(this)">
                    <label id="phoneError"></label>
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" name="hotel_min" placeholder="Hotel Minimum Price" id="hotel_min" value='<%=min%>' onchange="myFunction(this)">
                    <label id="minError"></label>
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" name="hotel_max" placeholder="Hotel Maximum Price" id="hotel_max" value='<%=max%>' onchange="myFunction(this)">
                    <label id="maxError"></label>
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" name="hotel_availability" placeholder="Hotel Availability" id="hotel_avilability" value='<%=avilability%>' onchange="myFunction(this)">
                    <label id="availabilityError"></label>
                </div>
                <div class="form-group">
                    <input type="text" class="form-control" name="hotel_city" placeholder="Hotel City" id="hotel_city" value='<%=city%>' onchange="myFunction(this)">
                    <label id="cityError"></label>
                </div>
                <div class="form-group">
                    <input type="hidden" class="form-control" name="hotel_id" id="hotel_id"  value='<%=hotel_id%>' >
                </div>
                <input type="submit" class="btn" value="Save">
            </form>
        </div>
    </body>
</html>

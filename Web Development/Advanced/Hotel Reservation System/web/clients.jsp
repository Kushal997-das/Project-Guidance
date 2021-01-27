<%-- 
    Document   : clients
    Created on : Jan 14, 2021, 6:36:50 PM
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
    String userId = "";
    String displayname = "";
    String reservation_id = "";
    String reservation_check_in = "";
    String reservation_check_out = "";

    Class.forName("com.mysql.jdbc.Driver");
    String url = "jdbc:mysql://localhost:3306/hotel_reservation_system_db?useSSL=false";
    String user = "root";
    String passworddb = "troot";
    Connection connection = null;
    Statement statement = null;
    Statement statement1 = null;
    connection = (Connection) DriverManager.getConnection(url, user, passworddb);
    statement = (Statement) connection.createStatement();
    statement1 = (Statement) connection.createStatement();
    String query = "SELECT user.user_id, user.display_name, reservation.user_id ,reservation.reservation_id,"
            + "reservation.reservation_check_in, reservation.reservation_check_out FROM user INNER JOIN reservation ON user.user_id = reservation.user_id ;";
    ResultSet resultSet = statement.executeQuery(query);
    ResultSet resultSet1 = statement1.executeQuery("SELECT * FROM user WHERE role = 'client';");

%>
<html>
    <head>
        <title>Clients</title>
        <script src="jquery-3.5.1.js"></script>
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200&family=Roboto:wght@100&display=swap" rel="stylesheet">
        <link rel="icon" href="hotelicon.png">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script>
            function clientSearch(val) {
                if (val === "") {
                    val = "all";
                }
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function ()
                {
                    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
                        //Response
                        $(".table-group-2").html(xmlhttp.responseText);
                    }
                };
                xmlhttp.open("GET", "searchClient?id=" + val, true);
                xmlhttp.send();


            }

        </script>
        <style>
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
                margin-left: auto; 
                margin-right: auto;
                width: 50%;
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
            .container .filter-date-div .form-group .form-control{
                width: 50%;
                text-align: center;
                height: 50px;
                color: black;
                background: #EAEAEA;
                border-radius: 1px;
                border: 0px solid silver;
                padding: 0 10px;
                font-family: 'Nunito', sans-serif;
            }
            .container form .form-control{
                width: 50%;
                text-align: center;
                height: 50px;
                color: black;
                background: #EAEAEA;
                border-radius: 1px;
                border: 0px solid silver;
                padding: 0 10px;
                font-family: 'Nunito', sans-serif;
            }

        </style>
    </head>
    <body>
        <div class="container">
            <h3 style="margin: 30px;">Clients Check In/Out</h3>
            <div class="table-group">
                <table class="center">
                    <tr>
                        <th>Client ID</th>
                        <th>Client Name</th>
                        <th>Reservation ID</th>
                        <th>Reservation Check In</th>
                        <th>Reservation Check Out</th>
                    </tr>
                    <%while (resultSet.next()) {%>
                    <tr>
                        <td><%=resultSet.getInt("user_id")%></td>
                        <td><%=resultSet.getString("display_name")%></td>
                        <td><%=resultSet.getInt("reservation_id")%></td>
                        <td><%=resultSet.getString("reservation_check_in")%></td>
                        <td><%=resultSet.getString("reservation_check_out")%></td>
                    </tr>
                    <%}%>
                </table>
            </div>

            <h3 style="margin: 30px;">Search for clients</h3>

            <div class="filter-date-div">

                <div class="form-group">

                    <input type="text" class="form-control" name="client_id" placeholder="Client Id" id="c_id" onchange="clientSearch(this.value)">
                </div>

            </div>

            <div class="table-group-2">
                <table class="center">
                    <tr>
                        <th>Client ID</th>
                        <th>Client UserName</th>
                        <th>Client Display Name</th>
                        <th>Client Email Address</th>
                        <th>Client Phone</th>
                    </tr>
                    <%while (resultSet1.next()) {%>
                    <tr>
                        <td><%=resultSet1.getInt("user_id")%></td>
                        <td><%=resultSet1.getString("username")%></td>
                        <td><%=resultSet1.getString("display_name")%></td>
                        <td style="color: red;"><%=resultSet1.getString("email")%></td>
                        <td style="color: red;"><%=resultSet1.getString("phone_number")%></td>
                    </tr>
                    <%}%>
                </table>
            </div>            
        </div>
    </body>
</html>

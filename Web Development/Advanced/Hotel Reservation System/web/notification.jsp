<%-- 
    Document   : notification
    Created on : Jan 15, 2021, 2:03:18 AM
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
    String query = "SELECT * FROM cancel_notification";
    ResultSet resultSet = null;
    resultSet = statement.executeQuery(query);
%>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script src="jquery-3.5.1.js"></script>
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200&family=Roboto:wght@100&display=swap" rel="stylesheet">
        <link rel="icon" href="hotelicon.png">
        <title>Notification</title>
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
            <h3 style="margin: 30px;">Cancel Reservation Notification</h3>
            <div class="table-group">
                <table  class="center">
                    <%while (resultSet.next()) {%>
                    <tr>
                        <th colspan="2">Notification #<%=resultSet.getInt("notification_id")%></th>
                    </tr>

                    <tr>
                        <th>Notification Message</th>
                        <td>This notification to inform you that a user has been canceled a reservation</td>
                    </tr>
                    <tr>
                        <th>User Display Name</th>
                        <td><%=resultSet.getString("client_display_name")%></td>
                    </tr>
                    <tr>
                        <th>Reservation ID</th>
                        <td><%=resultSet.getInt("n_reservation_id")%></td>
                    </tr>
                    <%}%>
                </table>
            </div>
        </div>
    </body>
</html>

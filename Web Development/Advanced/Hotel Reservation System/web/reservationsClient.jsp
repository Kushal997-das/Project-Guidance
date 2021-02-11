<%-- 
    Document   : reservationsClient
    Created on : Jan 15, 2021, 1:06:11 AM
    Author     : Tawfik
--%>

<%@page import="java.util.ArrayList"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.DriverManager"%>
<%@page import="java.sql.Statement"%>
<%@page import="java.sql.Connection"%>
<!DOCTYPE html>
<%
    String id = request.getParameter("id");
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
    String query = "SELECT * FROM reservation WHERE user_id ='" + Integer.valueOf(id) + "'";
    String query1 = "SELECT * FROM reserved_rooms";
    ResultSet resultSet = null;
    ResultSet resultSet1 = null;
    resultSet = statement.executeQuery(query);
    resultSet1 = statement1.executeQuery(query1);
    ArrayList<Integer> res_id = new ArrayList<>();
    ArrayList<Integer> room_id = new ArrayList<>();
    ArrayList<String> room_price = new ArrayList<>();
    while (resultSet1.next()) {
        res_id.add(resultSet1.getInt("reservation_id"));
        room_price.add(resultSet1.getString("room_price"));
        room_id.add(resultSet1.getInt("room_id"));
    }
%>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <script src="jquery-3.5.1.js"></script>
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200&family=Roboto:wght@100&display=swap" rel="stylesheet">
        <link rel="icon" href="hotelicon.png">
        <script type="text/javascript" src="reservationJs.js"></script>
        <title>Reservations</title>
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
            .btn-change{
                width: 100%;       /* set to 100% */
                height: 100%;      /* set to 100% */
                margin-bottom: 0.5em;
                padding-top: .6em;
                padding-bottom: .6em;
                color: #fff;
                background-color: navy;
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
        </style>
    </head>
    <body>
        <div class="container">
            <h3 style="margin: 30px;">System Reservations</h3>
            <div class="table-group">
                <table  class="center">
                    <%while (resultSet.next()) {%>
                    <tr>
                        <th colspan="2">Reservation #<%=resultSet.getInt("reservation_id")%></th>
                    </tr>
                    <tr>
                        <th>Reservation Payment</th>
                        <td>$<%=resultSet.getString("reservation_payment")%></td>
                    </tr>
                    <tr>
                        <th>Reservation Check In Date</th>
                        <td><%=resultSet.getString("reservation_check_in")%></td>
                    </tr>
                    <tr>
                        <th>Reservation Check Out Date</th>
                        <td><%=resultSet.getString("reservation_check_out")%></td>
                    </tr>
                    <tr>
                        <th>Reservation Status</th>
                            <%if (resultSet.getString("status").equals("Pending")) {%>
                        <td style="color: red;"><%=resultSet.getString("status")%></td>
                        <%} else {%>
                        <td style="color: #009879;"><%=resultSet.getString("status")%></td>
                        <%}%>
                    </tr>
                    <tr>
                        <th>Reservation # Adults</th>
                        <td><%=resultSet.getString("adults")%></td>
                    </tr>
                    <tr>
                        <th>Reservation # Children</th>
                        <td><%=resultSet.getString("children")%></td>
                    </tr>
                    <tr>
                        <th>Number Of Rooms</th>
                        <td><%=resultSet.getString("no_rooms")%></td>
                    </tr>
                    <tr>
                        <th>Hotel Id</th>
                        <td><%=resultSet.getInt("hotel_id")%></td>
                    </tr>
                    <tr>
                        <th>User Id</th>
                        <td><%=resultSet.getInt("user_id")%></td>
                    </tr>

                    <%for (int i = 0; i < res_id.size(); i++) {%>

                    <%if (res_id.get(i) == resultSet.getInt("reservation_id")) {%>

                    <tr>
                        <th style="background-color: #f3f3f3; color:#009879; ">Room # <%=(i + 1)%></th>
                        <td><%=room_id.get(i)%></td>
                    </tr>
                    <tr>
                        <th>Room Price</th>
                        <td>$<%=room_price.get(i)%></td>
                    </tr>
                    <%}%>
                    <%}%>
                    <tr>
                        <th style="background-color: #f3f3f3; color:#009879; ">Change</th>
                        <td>
                            <form action="changeReservation" method="Post">
                                <input type="submit" class="btn-change" value="Change Reservation">
                                <input type="hidden" class="btn"  value='<%=String.valueOf(resultSet.getInt("reservation_id"))%>' name="reservation_id">
                                <input type="hidden" class="btn"  value='<%=String.valueOf(resultSet.getInt("hotel_id"))%>' name="hotel_id">
                                <input type="hidden" class="btn"  value='<%=id%>' name="user_id">
                            </form>
                        </td>
                    </tr>
                    <tr>
                        <th style="background-color: #f3f3f3; color:#009879; ">Cancel</th>
                        <td>
                            <form action="cancelReservationClient" method="Post">
                                <input type="submit" class="btn-cancel" value="Cancel Reservation">
                                <input type="hidden" class="btn"  value='<%=String.valueOf(resultSet.getInt("reservation_id"))%>' name="reservation_id">
                                <input type="hidden" class="btn"  value='<%=id%>' name="user_id">
                            </form>
                        </td>
                    </tr>
                    <%}%>
                </table>
            </div>
        </div>
    </body>
</html>
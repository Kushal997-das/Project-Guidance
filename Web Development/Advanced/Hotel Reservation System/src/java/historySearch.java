/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import com.mysql.jdbc.Connection;
import com.mysql.jdbc.Statement;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author tawfe
 */
@WebServlet(urlPatterns = {"/historySearch"})
public class historySearch extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        try {
            String from = request.getParameter("from");
            String to = request.getParameter("to");

            Class.forName("com.mysql.jdbc.Driver");
            String url = "jdbc:mysql://localhost:3306/hotel_reservation_system_db?useSSL=false";
            String user = "root";
            String passworddb = "troot";
            Connection connection = null;
            connection = (Connection) DriverManager.getConnection(url, user, passworddb);
            Statement statement4 = null;
            statement4 = (Statement) connection.createStatement();
            String query4 = "SELECT * FROM reserved_history_rooms";
            ResultSet resultSet4 = null;
            resultSet4 = statement4.executeQuery(query4);
            ArrayList<Integer> res_id_his = new ArrayList<>();
            ArrayList<Integer> room_id_his = new ArrayList<>();
            ArrayList<String> room_price_his = new ArrayList<>();
            while (resultSet4.next()) {
                res_id_his.add(resultSet4.getInt("history_id"));
                room_price_his.add(resultSet4.getString("room_price"));
                room_id_his.add(resultSet4.getInt("room_id"));
            }
            String var = "";
            if (from.equals("from")) {//from default

                Statement statement1 = null;
                statement1 = (Statement) connection.createStatement();
                ResultSet resultSet = null;
                resultSet = statement1.executeQuery("SELECT * FROM history WHERE history_check_out <= '" + to + "'");

                out.println("<table class='center'>");

                while (resultSet.next()) {

                    out.println("<tr>");
                    out.println("<th colspan='2'>Reservation #" + resultSet.getInt("history_id") + "</th>");
                    out.println("</tr>");

                    out.println("<tr>");
                    out.println("<th>Reservation Payment</th>");
                    out.println("<td>$" + resultSet.getString("history_payment") + "</td>");
                    out.println("</tr>");

                    out.println("<tr>");
                    out.println("<th>Reservation Check In Date</th>");
                    out.println("<td>" + resultSet.getString("history_check_in") + "</td>");
                    out.println("</tr>");

                    out.println("<tr>");
                    out.println("<th>Reservation Check Out Date</th>");
                    out.println("<td>" + resultSet.getString("history_check_out") + "</td>");
                    out.println("</tr>");

                    out.println("<tr>");
                    out.println("<th>Reservation Status</th>");
                    if (resultSet.getString("status").equals("Pending")) {
                        out.println("<td style='color: red;'>" + resultSet.getString("status") + "</td>");
                    } else {
                        out.println("<td style='color: #009879;'>" + resultSet.getString("status") + "</td>");
                    }
                    out.println("</tr>");

                    out.println("<tr>");
                    out.println("<th>Reservation # Adults</th>");
                    out.println("<td>" + resultSet.getString("adults") + "</td>");
                    out.println("</tr>");

                    out.println("<tr>");
                    out.println("<th>Reservation # Children</th>");
                    out.println("<td>" + resultSet.getString("children") + "</td>");
                    out.println("</tr>");

                    out.println("<tr>");
                    out.println("<th>Number Of Rooms</th>");
                    out.println("<td>" + resultSet.getString("no_rooms") + "</td>");
                    out.println("</tr>");

                    out.println("<tr>");
                    out.println("<th>Hotel Id</th>");
                    out.println("<td>" + resultSet.getInt("hotel_id") + "</td>");
                    out.println("</tr>");

                    out.println("<tr>");
                    out.println("<th>User Id</th>");
                    out.println("<td>" + resultSet.getInt("user_id") + "</td>");
                    out.println("</tr>");

                    for (int i = 0; i < res_id_his.size(); i++) {
                        if (res_id_his.get(i) == resultSet.getInt("history_id")) {

                            out.println("<tr>");
                            out.println("<th style='background-color: #f3f3f3; color:#009879;'>Room # " + (i + 1) + "</th>");
                            out.println("<td>" + room_id_his.get(i) + "</td>");
                            out.println("</tr>");

                            out.println("<tr>");
                            out.println("<th>Room Price</th>");
                            out.println("<td>$" + room_price_his.get(i) + "</td>");
                            out.println("</tr>");

                        }
                    }
                }
                out.println("</table>");

            } else if (to.equals("to")) {//to default

                Statement statement1 = null;
                statement1 = (Statement) connection.createStatement();
                ResultSet resultSet = null;
                resultSet = statement1.executeQuery("SELECT * FROM history WHERE history_check_in >= '" + from + "'");
                out.println("<table class='center'>");
                while (resultSet.next()) {

                    out.println("<tr>");
                    out.println("<th colspan='2'>Reservation #" + resultSet.getInt("history_id") + "</th>");
                    out.println("</tr>");

                    out.println("<tr>");
                    out.println("<th>Reservation Payment</th>");
                    out.println("<td>$" + resultSet.getString("history_payment") + "</td>");
                    out.println("</tr>");

                    out.println("<tr>");
                    out.println("<th>Reservation Check In Date</th>");
                    out.println("<td>" + resultSet.getString("history_check_in") + "</td>");
                    out.println("</tr>");

                    out.println("<tr>");
                    out.println("<th>Reservation Check Out Date</th>");
                    out.println("<td>" + resultSet.getString("history_check_out") + "</td>");
                    out.println("</tr>");

                    out.println("<tr>");
                    out.println("<th>Reservation Status</th>");
                    if (resultSet.getString("status").equals("Pending")) {
                        out.println("<td style='color: red;'>" + resultSet.getString("status") + "</td>");
                    } else {
                        out.println("<td style='color: #009879;'>" + resultSet.getString("status") + "</td>");
                    }
                    out.println("</tr>");

                    out.println("<tr>");
                    out.println("<th>Reservation # Adults</th>");
                    out.println("<td>" + resultSet.getString("adults") + "</td>");
                    out.println("</tr>");

                    out.println("<tr>");
                    out.println("<th>Reservation # Children</th>");
                    out.println("<td>" + resultSet.getString("children") + "</td>");
                    out.println("</tr>");

                    out.println("<tr>");
                    out.println("<th>Number Of Rooms</th>");
                    out.println("<td>" + resultSet.getString("no_rooms") + "</td>");
                    out.println("</tr>");

                    out.println("<tr>");
                    out.println("<th>Hotel Id</th>");
                    out.println("<td>" + resultSet.getInt("hotel_id") + "</td>");
                    out.println("</tr>");

                    out.println("<tr>");
                    out.println("<th>User Id</th>");
                    out.println("<td>" + resultSet.getInt("user_id") + "</td>");
                    out.println("</tr>");

                    for (int i = 0; i < res_id_his.size(); i++) {
                        if (res_id_his.get(i) == resultSet.getInt("history_id")) {

                            out.println("<tr>");
                            out.println("<th style='background-color: #f3f3f3; color:#009879;'>Room # " + (i + 1) + "</th>");
                            out.println("<td>" + room_id_his.get(i) + "</td>");
                            out.println("</tr>");

                            out.println("<tr>");
                            out.println("<th>Room Price</th>");
                            out.println("<td>$" + room_price_his.get(i) + "</td>");
                            out.println("</tr>");

                        }
                    }
                }
                out.println("</table>");

            } else {//from and to selected

                Statement statement1 = null;
                statement1 = (Statement) connection.createStatement();
                ResultSet resultSet = null;
                resultSet = statement1.executeQuery("SELECT * FROM history WHERE history_check_in >= '" + from + "' AND history_check_out <= '" + to + "'");

                out.println("<table class='center'>");
                while (resultSet.next()) {

                    out.println("<tr>");
                    out.println("<th colspan='2'>Reservation #" + resultSet.getInt("history_id") + "</th>");
                    out.println("</tr>");

                    out.println("<tr>");
                    out.println("<th>Reservation Payment</th>");
                    out.println("<td>$" + resultSet.getString("history_payment") + "</td>");
                    out.println("</tr>");

                    out.println("<tr>");
                    out.println("<th>Reservation Check In Date</th>");
                    out.println("<td>" + resultSet.getString("history_check_in") + "</td>");
                    out.println("</tr>");

                    out.println("<tr>");
                    out.println("<th>Reservation Check Out Date</th>");
                    out.println("<td>" + resultSet.getString("history_check_out") + "</td>");
                    out.println("</tr>");

                    out.println("<tr>");
                    out.println("<th>Reservation Status</th>");
                    if (resultSet.getString("status").equals("Pending")) {
                        out.println("<td style='color: red;'>" + resultSet.getString("status") + "</td>");
                    } else {
                        out.println("<td style='color: #009879;'>" + resultSet.getString("status") + "</td>");
                    }
                    out.println("</tr>");

                    out.println("<tr>");
                    out.println("<th>Reservation # Adults</th>");
                    out.println("<td>" + resultSet.getString("adults") + "</td>");
                    out.println("</tr>");

                    out.println("<tr>");
                    out.println("<th>Reservation # Children</th>");
                    out.println("<td>" + resultSet.getString("children") + "</td>");
                    out.println("</tr>");

                    out.println("<tr>");
                    out.println("<th>Number Of Rooms</th>");
                    out.println("<td>" + resultSet.getString("no_rooms") + "</td>");
                    out.println("</tr>");

                    out.println("<tr>");
                    out.println("<th>Hotel Id</th>");
                    out.println("<td>" + resultSet.getInt("hotel_id") + "</td>");
                    out.println("</tr>");

                    out.println("<tr>");
                    out.println("<th>User Id</th>");
                    out.println("<td>" + resultSet.getInt("user_id") + "</td>");
                    out.println("</tr>");

                    for (int i = 0; i < res_id_his.size(); i++) {
                        if (res_id_his.get(i) == resultSet.getInt("history_id")) {

                            out.println("<tr>");
                            out.println("<th style='background-color: #f3f3f3; color:#009879;'>Room # " + (i + 1) + "</th>");
                            out.println("<td>" + room_id_his.get(i) + "</td>");
                            out.println("</tr>");

                            out.println("<tr>");
                            out.println("<th>Room Price</th>");
                            out.println("<td>$" + room_price_his.get(i) + "</td>");
                            out.println("</tr>");

                        }
                    }
                }
                out.println("</table>");
            }

        } catch (Exception e) {
            e.printStackTrace();
            out.print(e);
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}

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
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author tawfe
 */
@WebServlet(urlPatterns = {"/makeReservation"})
public class makeReservation extends HttpServlet {

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
            throws ServletException, IOException, ClassNotFoundException, SQLException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            String checkin = request.getParameter("checkin");
            String checkout = request.getParameter("checkout");
            String adults = request.getParameter("adults");
            String children = request.getParameter("children");
            String no_of_rooms = request.getParameter("norooms");
            String idrooms = request.getParameter("roomId");
            String norooms = request.getParameter("roomNo");
            String hotel_id = request.getParameter("hotel_id");
            String user_id = request.getParameter("user_id");
            String payment = "";
            String nights = request.getParameter("noNights");
            List<String> array_ids_rooms = Arrays.asList(idrooms.split(","));
            List<String> array_no_rooms = Arrays.asList(norooms.split(","));

            Class.forName("com.mysql.jdbc.Driver");
            String url = "jdbc:mysql://localhost:3306/hotel_reservation_system_db?useSSL=false";
            String user = "root";
            String passworddb = "troot";
            Connection connection = null;
            Statement statement = null;
            Statement statement1 = null;
            ResultSet resultset = null;
            connection = (Connection) DriverManager.getConnection(url, user, passworddb);
            statement = (Statement) connection.createStatement();
            statement1 = (Statement) connection.createStatement();
            String query = "SELECT * FROM room";
            resultset = statement.executeQuery(query);
            ArrayList<String> roomPrice = new ArrayList<>();
            while (resultset.next()) {
                for (int i = 0; i < array_ids_rooms.size(); i++) {
                    if (array_ids_rooms.get(i).equals(resultset.getString("room_id"))) {
                        roomPrice.add(resultset.getString("room_price"));
                        break;
                    }
                }
            }

            String status = "Pending";
            int sum = 0;
            //Starting calculations
            for (int i = 0; i < roomPrice.size(); i++) {
                sum += (Integer.valueOf(array_no_rooms.get(i)) * Integer.valueOf(roomPrice.get(i)));
            }
            payment = String.valueOf(sum * Integer.valueOf(nights));

            //Reservation Table
            String query1 = "INSERT INTO reservation(reservation_payment, reservation_check_in, reservation_check_out, hotel_id, user_id,status,adults,children,no_rooms) VALUES("
                    + "'" + payment + "',"
                    + "'" + checkin + "',"
                    + "'" + checkout + "',"
                    + "'" + Integer.valueOf(hotel_id) + "',"
                    + "'" + Integer.valueOf(user_id) + "',"
                    + "'" + status + "',"
                    + "'" + adults + "',"
                    + "'" + children + "',"
                    + "'" + no_of_rooms + "')";

            int q1Result = statement1.executeUpdate(query1);

            int reservation_id = 0;

            Statement statement2 = null;
            ResultSet resultSet2 = null;
            statement2 = (Statement) connection.createStatement();
            resultSet2 = statement2.executeQuery("SELECT * FROM reservation");
            while (resultSet2.next()) {
                if (resultSet2.getString("reservation_payment").equals(payment) && resultSet2.getString("reservation_check_in").equals(checkin)
                        && resultSet2.getString("reservation_check_out").equals(checkout)
                        && resultSet2.getInt("hotel_id") == Integer.valueOf(hotel_id)
                        && resultSet2.getInt("user_id") == Integer.valueOf(user_id)
                        && resultSet2.getString("status").equals(status)
                        && resultSet2.getString("adults").equals(adults)
                        && resultSet2.getString("children").equals(children)
                        && resultSet2.getString("no_rooms").equals(no_of_rooms)) {

                    reservation_id = resultSet2.getInt("reservation_id");
                }
            }

            //Reserved rooms
            Statement statement3 = null;
            statement3 = (Statement) connection.createStatement();
            for (int i = 0; i < roomPrice.size(); i++) {
                String query2 = "INSERT INTO reserved_rooms (room_id, room_price, reservation_id) VALUES ("
                        + "'" + Integer.valueOf(array_ids_rooms.get(i)) + "',"
                        + "'" + roomPrice.get(i) + "',"
                        + "'" + reservation_id + "')";
                int res = statement3.executeUpdate(query2);
            }

            //History
            statement1 = null;
            statement1 = (Statement) connection.createStatement();
            query1 = "INSERT INTO history(history_payment, history_check_in, history_check_out, hotel_id, user_id,status,adults,children,no_rooms) VALUES("
                    + "'" + payment + "',"
                    + "'" + checkin + "',"
                    + "'" + checkout + "',"
                    + "'" + Integer.valueOf(hotel_id) + "',"
                    + "'" + Integer.valueOf(user_id) + "',"
                    + "'" + status + "',"
                    + "'" + adults + "',"
                    + "'" + children + "',"
                    + "'" + no_of_rooms + "')";

            q1Result = statement1.executeUpdate(query1);
            int history_id = 0;
            statement2 = null;
            resultSet2 = null;
            statement2 = (Statement) connection.createStatement();
            resultSet2 = statement2.executeQuery("SELECT * FROM history");
            while (resultSet2.next()) {
                if (resultSet2.getString("history_payment").equals(payment) && resultSet2.getString("history_check_in").equals(checkin)
                        && resultSet2.getString("history_check_out").equals(checkout)
                        && resultSet2.getInt("hotel_id") == Integer.valueOf(hotel_id)
                        && resultSet2.getInt("user_id") == Integer.valueOf(user_id)
                        && resultSet2.getString("status").equals(status)
                        && resultSet2.getString("adults").equals(adults)
                        && resultSet2.getString("children").equals(children)
                        && resultSet2.getString("no_rooms").equals(no_of_rooms)) {

                    history_id = resultSet2.getInt("history_id");
                }
            }

            //Reserved history rooms
            statement3 = null;
            statement3 = (Statement) connection.createStatement();
            for (int i = 0; i < roomPrice.size(); i++) {
                String query2 = "INSERT INTO reserved_history_rooms (room_id, room_price, history_id) VALUES ("
                        + "'" + Integer.valueOf(array_ids_rooms.get(i)) + "',"
                        + "'" + roomPrice.get(i) + "',"
                        + "'" + history_id + "')";
                int res = statement3.executeUpdate(query2);
            }

            response.sendRedirect("hotelProfile.jsp?hotel_id="+hotel_id);

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
        try {
            processRequest(request, response);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(makeReservation.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(makeReservation.class.getName()).log(Level.SEVERE, null, ex);
        }
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
        try {
            processRequest(request, response);
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(makeReservation.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(makeReservation.class.getName()).log(Level.SEVERE, null, ex);
        }
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

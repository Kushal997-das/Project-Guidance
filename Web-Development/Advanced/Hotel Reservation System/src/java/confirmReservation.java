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
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Tawfik
 */
@WebServlet(urlPatterns = {"/confirmReservation"})
public class confirmReservation extends HttpServlet {

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
            String res_id = request.getParameter("reservation_id");
            String payment = request.getParameter("reservation_payment");
            String checkin = request.getParameter("reservation_check_in");
            String checkout = request.getParameter("reservation_check_out");
            String adults = request.getParameter("adults");
            String children = request.getParameter("children");
            String no_rooms = request.getParameter("no_rooms");
            String hotel_id = request.getParameter("hotel_id");
            String user_id = request.getParameter("user_id");
            String status = "Confirmed";
            Class.forName("com.mysql.jdbc.Driver");
            String url = "jdbc:mysql://localhost:3306/hotel_reservation_system_db?useSSL=false";
            String user = "root";
            String passworddb = "troot";
            Connection connection = null;
            Statement statement = null;
            connection = (Connection) DriverManager.getConnection(url, user, passworddb);
            statement = (Statement) connection.createStatement();
            String query = "UPDATE reservation SET status = "
                    + "'" + status + "'"
                    + "WHERE (reservation_id = '"
                    + Integer.valueOf(res_id) + "');";
            int result = statement.executeUpdate(query);
            int his_res_id = 0;
            Statement statement1 = null;
            statement1 = (Statement) connection.createStatement();
            ResultSet resultSet = null;
            resultSet = statement1.executeQuery("SELECT * FROM history");
            while (resultSet.next()) {
                if (resultSet.getString("history_payment").equals(payment) && resultSet.getString("history_check_in").equals(checkin)
                        && resultSet.getString("history_check_out").equals(checkout)
                        && resultSet.getInt("hotel_id") == Integer.valueOf(hotel_id)
                        && resultSet.getInt("user_id") == Integer.valueOf(user_id)
                        && resultSet.getString("adults").equals(adults)
                        && resultSet.getString("children").equals(children)
                        && resultSet.getString("no_rooms").equals(no_rooms)) {
                    his_res_id = resultSet.getInt("history_id");
                }
            }
            Statement statement2 = null;
            statement2 = (Statement) connection.createStatement();
            String query2 = "UPDATE history SET status = "
                    + "'" + status + "'"
                    + "WHERE (history_id = '"
                    + his_res_id + "');";
            int qRes = statement2.executeUpdate(query2);
            response.sendRedirect("reservations.jsp");
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
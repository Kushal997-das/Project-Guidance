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
import java.util.ArrayList;
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
@WebServlet(urlPatterns = {"/cancelReservation"})
public class cancelReservation extends HttpServlet {

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
            Class.forName("com.mysql.jdbc.Driver");
            String url = "jdbc:mysql://localhost:3306/hotel_reservation_system_db?useSSL=false";
            String user = "root";
            String passworddb = "troot";
            Connection connection = null;
            connection = (Connection) DriverManager.getConnection(url, user, passworddb);
            Statement statement1 = null;
            statement1 = (Statement) connection.createStatement();
            ResultSet resultSet = null;
            resultSet = statement1.executeQuery("SELECT * FROM reserved_rooms");
            ArrayList<Integer> reservedRooms = new ArrayList<>();
            while (resultSet.next()) {
                if (resultSet.getInt("reservation_id") == Integer.valueOf(res_id)) {
                    reservedRooms.add(resultSet.getInt("reservation_id"));
                }
            }
            Statement statement2 = null;
            statement2 = (Statement) connection.createStatement();
            for (int i = 0; i < reservedRooms.size(); i++) {
                int result2 = statement2.executeUpdate("DELETE FROM reserved_rooms WHERE (reservation_id = '" + Integer.valueOf(res_id) + "')");
            }
            Statement statement = null;
            statement = (Statement) connection.createStatement();
            String query = "DELETE FROM reservation WHERE (reservation_id = '" + Integer.valueOf(res_id) + "')";
            int result = statement.executeUpdate(query);
            response.sendRedirect("reservations.jsp");
        } catch (Exception e) {
            e.printStackTrace();
            out.println(e);
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
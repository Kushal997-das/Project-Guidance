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
@WebServlet(urlPatterns = {"/changeProfileData"})
public class changeProfileData extends HttpServlet {

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
            String displayname = request.getParameter("displayname");
            String email = request.getParameter("email");
            String password = request.getParameter("password");
            String phone = request.getParameter("phone");
            String id = request.getParameter("hiddenUserId");
            if (!displayname.equals("displayname")) {
                Class.forName("com.mysql.jdbc.Driver");
                String url = "jdbc:mysql://localhost:3306/hotel_reservation_system_db?useSSL=false";
                String user = "root";
                String passworddb = "troot";
                Connection connection = null;
                Statement statement = null;
                connection = (Connection) DriverManager.getConnection(url, user, passworddb);
                statement = (Statement) connection.createStatement();
                String query = "UPDATE user SET display_name = "
                        + "'" + displayname + "'"
                        + "WHERE (user_id = '"
                        + Integer.valueOf(id) + "');";
                int result = statement.executeUpdate(query);
            }
            if (!email.equals("email")) {
                Class.forName("com.mysql.jdbc.Driver");
                String url = "jdbc:mysql://localhost:3306/hotel_reservation_system_db?useSSL=false";
                String user = "root";
                String passworddb = "troot";
                Connection connection = null;
                Statement statement = null;
                connection = (Connection) DriverManager.getConnection(url, user, passworddb);
                statement = (Statement) connection.createStatement();
                String query = "UPDATE user SET email = "
                        + "'" + email + "'"
                        + "WHERE (user_id = '"
                        + Integer.valueOf(id) + "');";
                int result = statement.executeUpdate(query);
            }
            if (!phone.equals("phone")) {
                Class.forName("com.mysql.jdbc.Driver");
                String url = "jdbc:mysql://localhost:3306/hotel_reservation_system_db?useSSL=false";
                String user = "root";
                String passworddb = "troot";
                Connection connection = null;
                Statement statement = null;
                connection = (Connection) DriverManager.getConnection(url, user, passworddb);
                statement = (Statement) connection.createStatement();
                String query = "UPDATE user SET phone_number = "
                        + "'" + phone + "'"
                        + "WHERE (user_id = '"
                        + Integer.valueOf(id) + "');";
                int result = statement.executeUpdate(query);
            }
            if (!password.equals("password")) {
                Class.forName("com.mysql.jdbc.Driver");
                String url = "jdbc:mysql://localhost:3306/hotel_reservation_system_db?useSSL=false";
                String user = "root";
                String passworddb = "troot";
                Connection connection = null;
                Statement statement = null;
                connection = (Connection) DriverManager.getConnection(url, user, passworddb);
                statement = (Statement) connection.createStatement();
                String query = "UPDATE user SET password = "
                        + "'" + password + "'"
                        + "WHERE (user_id = '"
                        + Integer.valueOf(id) + "');";
                int result = statement.executeUpdate(query);
            }            
            request.setAttribute("id", id);
            response.sendRedirect("userProfile.jsp");
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
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
@WebServlet(urlPatterns = {"/updateHotelData"})
public class updateHotelData extends HttpServlet {

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

            String id = request.getParameter("hotel_id");
            String name = request.getParameter("hotel_name");
            String stars = request.getParameter("hotel_stars");
            String location = request.getParameter("hotel_location");
            String distance = request.getParameter("hotel_distance");
            String phone = request.getParameter("hotel_phone");
            String min = request.getParameter("hotel_min");
            String max = request.getParameter("hotel_max");
            String availability = request.getParameter("hotel_availability");
            String city = request.getParameter("hotel_city");

            Class.forName("com.mysql.jdbc.Driver");
            String url = "jdbc:mysql://localhost:3306/hotel_reservation_system_db?useSSL=false";
            String user = "root";
            String passworddb = "troot";
            Connection connection = null;
            Statement statement = null;
            connection = (Connection) DriverManager.getConnection(url, user, passworddb);
            statement = (Statement) connection.createStatement();

            int res = statement.executeUpdate("UPDATE hotel SET hotel_name = '" + name + "', hotel_stars ='" + stars + "', hotel_location ='" + location + "'"
                    + ", hotel_distance ='" + distance + "', hotel_phone ='" + phone + "', hotel_price_min ='" + min + "', hotel_price_max ='" + max + "', hotel_availability ='" + availability
                    + "', hotel_city ='" + city + "' WHERE hotel_id ='" + Integer.valueOf(id) + "' ;");

//            RequestDispatcher dispatcher = request.getRequestDispatcher("hotels.jsp");
//            dispatcher.forward(request, response);
            
            response.sendRedirect("hotels.jsp");
            
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

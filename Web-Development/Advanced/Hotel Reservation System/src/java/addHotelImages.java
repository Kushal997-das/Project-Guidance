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
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Tawfik
 */
@WebServlet(urlPatterns = {"/addHotelImages"})
public class addHotelImages extends HttpServlet {

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
            String hotel_id = request.getParameter("hiddenHotelId");
            String img1 = request.getParameter("img1");
            String img2 = request.getParameter("img2");
            String img3 = request.getParameter("img3");
            String img4 = request.getParameter("img4");
            String img5 = request.getParameter("img5");
            Class.forName("com.mysql.jdbc.Driver");
            String url = "jdbc:mysql://localhost:3306/hotel_reservation_system_db?useSSL=false";
            String user = "root";
            String passworddb = "troot";
            Connection connection = null;
            Statement statement = null;
            Statement statement2 = null;
            Statement statement3 = null;
            Statement statement4 = null;
            Statement statement5 = null;
            connection = (Connection) DriverManager.getConnection(url, user, passworddb);
            statement = (Statement) connection.createStatement();
            statement2 = (Statement) connection.createStatement();
            statement3 = (Statement) connection.createStatement();
            statement4 = (Statement) connection.createStatement();
            statement5 = (Statement) connection.createStatement();
            String query = "INSERT INTO photos (photo,hotel_id) VALUES("
                    + "'" + img1 + "',"
                    + "'" + Integer.valueOf(hotel_id) + "')";
            int res1 = statement.executeUpdate(query);
            String query2 = "INSERT INTO photos (photo,hotel_id) VALUES("
                    + "'" + img2 + "',"
                    + "'" + Integer.valueOf(hotel_id) + "')";
            int res2 = statement2.executeUpdate(query2);
            String query3 = "INSERT INTO photos (photo,hotel_id) VALUES("
                    + "'" + img3 + "',"
                    + "'" + Integer.valueOf(hotel_id) + "')";
            int res3 = statement3.executeUpdate(query3);
            String query4 = "INSERT INTO photos (photo,hotel_id) VALUES("
                    + "'" + img4 + "',"
                    + "'" + Integer.valueOf(hotel_id) + "')";
            int res4 = statement4.executeUpdate(query4);
            String query5 = "INSERT INTO photos (photo,hotel_id) VALUES("
                    + "'" + img5 + "',"
                    + "'" + Integer.valueOf(hotel_id) + "')";
            int res5 = statement5.executeUpdate(query5);
            response.sendRedirect("hotelImages.jsp");
        } catch (Exception e) {
            e.printStackTrace();
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
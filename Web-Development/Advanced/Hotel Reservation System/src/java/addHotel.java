/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import com.mysql.jdbc.Connection;
import com.mysql.jdbc.Statement;
import java.io.File;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.util.List;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.tomcat.util.http.fileupload.FileItem;
import org.apache.tomcat.util.http.fileupload.RequestContext;
import org.apache.tomcat.util.http.fileupload.disk.DiskFileItemFactory;
import org.apache.tomcat.util.http.fileupload.servlet.ServletFileUpload;

/**
 *
 * @author Tawfik
 */
@WebServlet(urlPatterns = {"/addHotel"})
public class addHotel extends HttpServlet {

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

            String name = request.getParameter("hotel_name");
            String stars = request.getParameter("hotel_stars");
            String location = request.getParameter("hotel_location");
            String distance = request.getParameter("hotel_distance");
            String phone = request.getParameter("hotel_phone");
            String min = request.getParameter("hotel_min_price");
            String max = request.getParameter("hotel_max_price");
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
            String query = "INSERT INTO hotel (hotel_name,hotel_stars,hotel_location,hotel_distance,hotel_phone,hotel_price_min,hotel_price_max,hotel_availability,hotel_city ) VALUES ("
                    + "'" + name + "',"
                    + "'" + stars + "',"
                    + "'" + location + "',"
                    + "'" + distance + "',"
                    + "'" + phone + "',"
                    + "'" + min + "',"
                    + "'" + max + "',"
                    + "'" + availability + "',"
                    + "'" + city + "')";
            int res = statement.executeUpdate(query);
            int hotel_id = 0;
            Statement statement3 = null;
            statement3 = (Statement) connection.createStatement();
            ResultSet resultSet = null;
            resultSet = statement3.executeQuery("SELECT * FROM hotel WHERE hotel_name ='" + name + "' AND hotel_stars ='" + stars + "' AND "
                    + "hotel_location = '" + location + "' AND hotel_distance ='" + distance + "' AND hotel_phone ='" + phone + "' AND hotel_price_min ='" + min + "' AND "
                    + "hotel_price_max ='" + max + "' AND hotel_availability ='" + availability + "' AND hotel_city='" + city + "';");
            while (resultSet.next()) {
                hotel_id = resultSet.getInt("hotel_id");
            }
            Statement statement2 = null;
            statement2 = (Statement) connection.createStatement();
            ResultSet resultSet2 = null;
            String query2 = "SELECT * FROM rate WHERE hotel_id ='" + hotel_id + "'";
            resultSet2 = statement2.executeQuery(query2);
            int avgRate = 0;
            int counter = 0;
            while (resultSet.next()) {
                avgRate += Integer.valueOf(resultSet.getString("rate"));
                counter++;
            }
            if (counter == 0) {
                String query3 = "UPDATE hotel SET hotel_avg_rate = '" + String.valueOf(0) + "' WHERE hotel_id = '" + hotel_id + "';";
                Statement statement4 = null;
                statement4 = (Statement) connection.createStatement();
                int resQuery = statement4.executeUpdate(query3);
                String query4 = "INSERT INTO rate (comment,rate,hotel_id,user_id) VALUES ("
                        + "'" + "Good" + "',"
                        + "'" + "0" + "',"
                        + "'" + hotel_id + "',"
                        + "'" + 29 + "')";
                Statement statement5 = null;
                statement5 = (Statement) connection.createStatement();
                int resQuery1 = statement5.executeUpdate(query4);
            } else {
                avgRate /= counter;
                String query3 = "UPDATE hotel SET hotel_avg_rate = '" + String.valueOf(avgRate) + "' WHERE hotel_id = '" + hotel_id + "';";
                Statement statement4 = null;
                statement4 = (Statement) connection.createStatement();
                int resQuery = statement4.executeUpdate(query3);
            }            
            response.sendRedirect("hotels.jsp");
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
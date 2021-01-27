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
import java.util.ArrayList;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author tawfe
 */
@WebServlet(urlPatterns = {"/updateHotelPhotosDB"})
public class updateHotelPhotosDB extends HttpServlet {

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
            String hotel_id = request.getParameter("hiddenHotelId_u");
            String img1 = request.getParameter("hidden_img1");
            String img2 = request.getParameter("hidden_img2");
            String img3 = request.getParameter("hidden_img3");
            String img4 = request.getParameter("hidden_img4");
            String img5 = request.getParameter("hidden_img5");

            String img1_id = request.getParameter("hidden_img1_id");
            String img2_id = request.getParameter("hidden_img2_id");
            String img3_id = request.getParameter("hidden_img3_id");
            String img4_id = request.getParameter("hidden_img4_id");
            String img5_id = request.getParameter("hidden_img5_id");

            ArrayList<String> photos = new ArrayList<>();
            ArrayList<String> photos_id = new ArrayList<>();

            photos.add(img1);
            photos.add(img2);
            photos.add(img3);
            photos.add(img4);
            photos.add(img5);

            photos_id.add(img1_id);
            photos_id.add(img2_id);
            photos_id.add(img3_id);
            photos_id.add(img4_id);
            photos_id.add(img5_id);

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
            Statement statement6 = null;
            connection = (Connection) DriverManager.getConnection(url, user, passworddb);
            statement = (Statement) connection.createStatement();
            statement2 = (Statement) connection.createStatement();
            statement3 = (Statement) connection.createStatement();
            statement4 = (Statement) connection.createStatement();
            statement5 = (Statement) connection.createStatement();
            statement6 = (Statement) connection.createStatement();

//            int counter = 0;
//            boolean flage = false;
//            ResultSet result = null;
//            result = statement6.executeQuery("SELECT * FROM photos WHERE hotel_id='" + Integer.valueOf(hotel_id) + "';");
//            while (result.next()) {
//                if (result.getInt("photos_id") == Integer.valueOf(photos_id.get(counter))) {
//                    String query = "UPDATE photos SET photo ='" + photos.get(counter) + "';";
//                    int res1 = statement.executeUpdate(query);
//                    flage = true;
//                    counter++;
//                }
//
//                if (flage) {
//                    String query = "UPDATE photos SET photo ='" + photos.get(counter) + "';";
//                    int res1 = statement.executeUpdate(query);
//                    
//                }
//                flage = false;
//            }

//            String query = "UPDATE  photos SET photo ='" + img1 + "' WHERE photos_id ='" + Integer.valueOf(img1_id) + "' AND hotel_id ='" + Integer.valueOf(hotel_id) + "';";
//            int res1 = statement.executeUpdate(query);
//
//            String query2 = "UPDATE  photos SET photo ='" + img2 + "' WHERE photos_id ='" + Integer.valueOf(img2_id) + "' AND hotel_id ='" + Integer.valueOf(hotel_id) + "';";
//            int res2 = statement2.executeUpdate(query);
//
//            String query3 = "UPDATE  photos SET photo ='" + img3 + "' WHERE photos_id ='" + Integer.valueOf(img3_id) + "' AND hotel_id ='" + Integer.valueOf(hotel_id) + "';";
//            int res3 = statement3.executeUpdate(query);
//
//            String query4 = "UPDATE  photos SET photo ='" + img4 + "' WHERE photos_id ='" + Integer.valueOf(img4_id) + "' AND hotel_id ='" + Integer.valueOf(hotel_id) + "';";
//            int res4 = statement4.executeUpdate(query);
//
//            String query5 = "UPDATE  photos SET photo ='" + img5 + "' WHERE photos_id ='" + Integer.valueOf(img5_id) + "' AND hotel_id ='" + Integer.valueOf(hotel_id) + "';";
//            int res5 = statement5.executeUpdate(query);
//            response.sendRedirect("hotelImages.jsp");
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
            Logger.getLogger(updateHotelPhotosDB.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(updateHotelPhotosDB.class.getName()).log(Level.SEVERE, null, ex);
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
            Logger.getLogger(updateHotelPhotosDB.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(updateHotelPhotosDB.class.getName()).log(Level.SEVERE, null, ex);
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

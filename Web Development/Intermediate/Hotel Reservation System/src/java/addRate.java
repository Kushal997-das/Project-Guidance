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
@WebServlet(urlPatterns = {"/addRate"})
public class addRate extends HttpServlet {

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
            String user_id = request.getParameter("h_user_id");
            String hotel_id = request.getParameter("h_hotel_id");
            String rate = request.getParameter("h_rate");
            String comment = request.getParameter("comment");
            Class.forName("com.mysql.jdbc.Driver");
            String url = "jdbc:mysql://localhost:3306/hotel_reservation_system_db?useSSL=false";
            String user = "root";
            String passworddb = "troot";
            Connection connection = null;
            Statement statement = null;
            connection = (Connection) DriverManager.getConnection(url, user, passworddb);
            statement = (Statement) connection.createStatement();
            String q = "SELECT * FROM rate";
            Statement statement1q = (Statement) connection.createStatement();
            ResultSet resultSetq = null;
            boolean flag = true;
            resultSetq = statement1q.executeQuery(q);
            while (resultSetq.next()) {
                if (resultSetq.getInt("hotel_id") == Integer.valueOf(hotel_id) && resultSetq.getInt("user_id") == Integer.valueOf(user_id)) {
                    flag = false;
                }
            }
            if (flag == true) {
                String query = "INSERT INTO rate (comment,rate,hotel_id,user_id) VALUES ("
                        + "'" + comment + "',"
                        + "'" + rate + "',"
                        + "'" + Integer.valueOf(hotel_id) + "',"
                        + "'" + Integer.valueOf(user_id) + "')";
                int res = statement.executeUpdate(query);
                Statement statement2 = null;
                statement2 = (Statement) connection.createStatement();
                ResultSet resultSet = null;
                String query2 = "SELECT * FROM rate WHERE hotel_id ='" + Integer.valueOf(hotel_id) + "'";
                resultSet = statement2.executeQuery(query2);
                int avgRate = 0;
                int counter = 0;
                while (resultSet.next()) {
                    if (Integer.valueOf(resultSet.getString("rate")) != 0) {
                        avgRate += Integer.valueOf(resultSet.getString("rate"));
                        counter++;
                    }
                }
                avgRate /= counter;
                String query3 = "UPDATE hotel SET hotel_avg_rate = '" + String.valueOf(avgRate) + "' WHERE hotel_id = '" + Integer.valueOf(hotel_id) + "';";
                Statement statement3 = null;
                statement3 = (Statement) connection.createStatement();
                int resQuery = statement3.executeUpdate(query3);
                response.sendRedirect("hotelProfile.jsp?hotel_id=" + hotel_id+"&u_id="+user_id);
            } else {
                response.sendRedirect("hotelProfile.jsp?hotel_id=" + hotel_id+"&u_id="+user_id);
            }
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
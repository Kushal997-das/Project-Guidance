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
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author tawfe
 */
@WebServlet(urlPatterns = {"/filterPrice"})
public class filterPrice extends HttpServlet {

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

            String city = request.getParameter("selectedCity");
            Class.forName("com.mysql.jdbc.Driver");
            String url = "jdbc:mysql://localhost:3306/hotel_reservation_system_db?useSSL=false";
            String user = "root";
            String passworddb = "troot";
            Connection connection = null;
            Statement statement = null;
            ResultSet resultSet = null;
            connection = (Connection) DriverManager.getConnection(url, user, passworddb);
            statement = (Statement) connection.createStatement();
            String query = "SELECT * FROM hotel WHERE hotel_city = '" + city + "' ORDER BY hotel_price_min ASC;";
            resultSet = statement.executeQuery(query);
            String query5 = "SELECT * FROM photos";
            Statement statement5 = null;
            statement5 = (Statement) connection.createStatement();
            ResultSet resultSet5 = null;
            resultSet5 = statement5.executeQuery(query5);

            out.println("<table>");
            while (resultSet.next()) {
                out.println("<tr>");
                out.println("<td>");
                out.println("<section>");
                out.println("<figure class='card'>");
                out.println("<div class='card__hero'>");
                out.println("<a href='hotelProfile.jsp?hotel_id=" + resultSet.getInt("hotel_id") + "'>");
                String img = "";
                while (resultSet5.next()) {
                    if (resultSet5.getInt("hotel_id") == resultSet.getInt("hotel_id")) {
                        img = resultSet5.getString("photo");
                        break;
                    }
                }
                out.println("<img class='card__img' src='" + img + "'/>");
                statement5 = null;
                statement5 = (Statement) connection.createStatement();
                resultSet5 = null;
                resultSet5 = statement5.executeQuery(query5);
                out.println("</a>");
                out.println("<div class='card__middle'>");
                out.println("<p class='card__middle-text'>");
                out.println(resultSet.getString("hotel_city"));//location
                out.println("</p>");
                out.println("</div>");
                out.println("</div>");
                out.println("<div class='card__content'>");
                out.println("<div class='card__info'>");
                out.println("<h3 class='card__price'>");
                out.println("<b>" + resultSet.getString("hotel_name") + "</b>  <sub style='font-size:12px;'>" + resultSet.getString("hotel_stars") + " stars </sub> </h3>");//name
                out.println("<p class='card__details'>");
                out.println("Availability: " + resultSet.getString("hotel_availability"));//availability
                out.println("</p>");
                out.println("<p class='card__details'>");
                out.println("Average Rate: " + resultSet.getString("hotel_avg_rate"));//rating
                out.println("</p>");
                out.println("<p class='card__details'>");
                out.println(resultSet.getString("hotel_distance") + " km from center");//distance
                out.println("</p>");
                out.println("<p class='card__details'>");
                out.println("Expected Price: From $" + resultSet.getString("hotel_price_min") + " To $" + resultSet.getString("hotel_price_max"));//expected price
                out.println("</p>");
                out.println("</div>");
                out.println("<div class='card__buttons'>");
                out.println("<a href='hotelProfile.jsp?hotel_id=" + resultSet.getInt("hotel_id") + "'' class='card__btn'>");
                out.println("More Info");
                out.println("</a>");
                out.println("</div>");
                out.println("<div class='card__buttons'>");
                out.println("<a href='" + resultSet.getString("hotel_location") + "'>");
                out.println("View on Map");
                out.println("</a>");
                out.println("</div>");

                out.println("</div>");
                out.println("</figure>");
                out.println("</section>");
                out.println("</td>");
                out.println("</tr>");
            }
            out.println("</table>");

//                out.println("<h1 style='color:red';>No existing data!</h3>");
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

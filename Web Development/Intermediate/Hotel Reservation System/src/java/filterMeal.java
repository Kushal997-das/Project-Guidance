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
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author tawfe
 */
@WebServlet(urlPatterns = {"/filterMeal"})
public class filterMeal extends HttpServlet {

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
            String meal_name = request.getParameter("meal");
            Class.forName("com.mysql.jdbc.Driver");
            String url = "jdbc:mysql://localhost:3306/hotel_reservation_system_db?useSSL=false";
            String user = "root";
            String passworddb = "troot";
            Connection connection = null;
            Statement statement = null;
            Statement statement2 = null;
            Statement statement3 = null;
            ResultSet resultSet = null;
            ResultSet resultSet2 = null;
            ResultSet resultSet3 = null;
            connection = (Connection) DriverManager.getConnection(url, user, passworddb);
            statement = (Statement) connection.createStatement();
            statement2 = (Statement) connection.createStatement();
            statement3 = (Statement) connection.createStatement();
            String query2 = "SELECT * FROM meals";
            ArrayList<Integer> meals_ids = new ArrayList<>();
            resultSet2 = statement2.executeQuery(query2);
            while (resultSet2.next()) {
                if (resultSet2.getString("meal_name").equals(meal_name)) {
                    meals_ids.add(resultSet2.getInt("hotel_id"));
                }
            }
            String query5 = "SELECT * FROM photos";
            Statement statement5 = null;
            statement5 = (Statement) connection.createStatement();
            ResultSet resultSet5 = null;
            resultSet5 = statement5.executeQuery(query5);

            String query3 = "SELECT * FROM hotel WHERE hotel_city ='" + city + "';";
            resultSet3 = statement3.executeQuery(query3);
            out.println("<table>");

            while (resultSet3.next()) {
                for (int i = 0; i < meals_ids.size(); i++) {
                    if (resultSet3.getInt("hotel_id") == meals_ids.get(i)) {
                        out.println("<tr>");
                        out.println("<td>");
                        out.println("<section>");
                        out.println("<figure class='card'>");
                        out.println("<div class='card__hero'>");
                        out.println("<a href='hotelProfile.jsp?hotel_id=" + resultSet3.getInt("hotel_id") + "'>");
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
                        out.println(resultSet3.getString("hotel_city"));//location
                        out.println("</p>");
                        out.println("</div>");
                        out.println("</div>");
                        out.println("<div class='card__content'>");
                        out.println("<div class='card__info'>");
                        out.println("<h3 class='card__price'>");
                        out.println("<b>" + resultSet3.getString("hotel_name") + "</b>  <sub style='font-size:12px;'>" + resultSet3.getString("hotel_stars") + " stars </sub> </h3>");//name
                        out.println("<p class='card__details'>");
                        out.println("Availability: " + resultSet3.getString("hotel_availability"));//availability
                        out.println("</p>");
                        out.println("<p class='card__details'>");
                        out.println("Average Rate: " + resultSet3.getString("hotel_avg_rate"));//rating
                        out.println("</p>");
                        out.println("<p class='card__details'>");
                        out.println(resultSet3.getString("hotel_distance") + " km from center");//distance
                        out.println("</p>");
                        out.println("<p class='card__details'>");
                        out.println("Expected Price: From $" + resultSet3.getString("hotel_price_min") + " To $" + resultSet3.getString("hotel_price_max"));//expected price
                        out.println("</p>");
                        out.println("</div>");
                        out.println("<div class='card__buttons'>");
                        out.println("<a href='hotelProfile.jsp?hotel_id=" + resultSet3.getInt("hotel_id") + "'' class='card__btn'>");
                        out.println("More Info");
                        out.println("</a>");
                        out.println("</div>");
                        out.println("<div class='card__buttons'>");
                        out.println("<a href='" + resultSet3.getString("hotel_location") + "'>");
                        out.println("View on Map");
                        out.println("</a>");
                        out.println("</div>");

                        out.println("</div>");
                        out.println("</figure>");
                        out.println("</section>");
                        out.println("</td>");
                        out.println("</tr>");
                    }
                }
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

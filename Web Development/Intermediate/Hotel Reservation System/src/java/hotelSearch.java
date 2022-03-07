/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import com.google.gson.Gson;
import com.mysql.jdbc.Connection;
import com.mysql.jdbc.Statement;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author tawfe
 */
@WebServlet(urlPatterns = {"/hotelSearch"})
public class hotelSearch extends HttpServlet {

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
            String u_id = request.getParameter("u_id");
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
            String query = "SELECT * FROM hotel WHERE hotel_city = '" + city + "'";
            //String query = "SELECT * FROM hotel";
            ResultSet resultSet = null;
            ResultSet newResult = null;
            ResultSet resultSet3 = null;
            ResultSet resultSet5 = null;
            String query2 = "SELECT * FROM hotel WHERE hotel_city = '" + city + "'";
            String query3 = "SELECT * FROM rate";
            String query5 = "SELECT * FROM photos";
            String query4 = "";
            resultSet = statement.executeQuery(query);
            newResult = statement2.executeQuery(query2);
            resultSet3 = statement3.executeQuery(query3);
            resultSet5 = statement5.executeQuery(query5);
            int hotel_id = 0;
            float rate = 0;
            float count = 0;
            ArrayList<Integer> hotel_ids = new ArrayList<>();
            ArrayList<String> hotel_rates = new ArrayList<String>();
            while (newResult.next()) {
                hotel_ids.add(newResult.getInt("hotel_id"));
                while (resultSet3.next()) {
                    if (resultSet3.getInt("hotel_id") == newResult.getInt("hotel_id")) {
                        rate += Float.valueOf(resultSet3.getInt("rate"));
                        count++;
                    }
                }
                resultSet3 = statement3.executeQuery(query3);
                if (count == 0) {
                    //rate = rate / count;
                    hotel_rates.add(String.valueOf(0));
                    rate = 0;
                    count = 0;
                } else {
                    rate = rate / count;
                    hotel_rates.add(String.valueOf(rate));
                    rate = 0;
                    count = 0;
                }

            }

            out.println("<table>");
            while (resultSet.next()) {

                out.println("<tr>");
                out.println("<td>");
                out.println("<section>");
                out.println("<figure class='card'>");
                out.println("<div class='card__hero'>");
                int id = resultSet.getInt("hotel_id");
                out.println("<a href='hotelProfile.jsp?hotel_id=" + resultSet.getInt("hotel_id") + "&u_id="+u_id+"'>");
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
                for (int i = 0; i < hotel_ids.size(); i++) {
                    if (resultSet.getInt("hotel_id") == hotel_ids.get(i)) {
                        out.println("<p class='card__details'>");
                        out.println("Average Rate: " + hotel_rates.get(i));//rating
                        out.println("</p>");
                        query4 = "UPDATE `hotel_reservation_system_db`.`hotel` SET `hotel_avg_rate` = '" + hotel_rates.get(i) + "' WHERE (`hotel_id` = '" + resultSet.getInt("hotel_id") + "');";
                        int q = statement4.executeUpdate(query4);
                        break;
                    }
                }
                out.println("<p class='card__details'>");
                out.println(resultSet.getString("hotel_distance") + " km from center");//distance
                out.println("</p>");
                out.println("<p class='card__details'>");
                out.println("Expected Price: From $" + resultSet.getString("hotel_price_min") + " To $" + resultSet.getString("hotel_price_max"));//expected price
                out.println("</p>");
                out.println("</div>");
                out.println("<div class='card__buttons'>");
                out.println("<a href='hotelProfile.jsp?hotel_id=" + resultSet.getInt("hotel_id") + "&u_id="+u_id+"'>");
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
//                hotels.add(new Hotel(resultSet.getInt("hotel_id"), resultSet.getString("hotel_name"), resultSet.getString("hotel_stars"), resultSet.getString("hotel_location"),
//                        resultSet.getString("hotel_distance"), resultSet.getString("hotel_phone"), resultSet.getString("hotel_price_min"),
//                        resultSet.getString("hotel_price_max"), resultSet.getString("hotel_availability")));
            }
            out.println("</table>");
//            String json = new Gson().toJson(hotels);
//            response.setContentType("application/json");
//            response.setCharacterEncoding("UTF-8");
//            response.getWriter().write(json);
        } catch (Exception e) {

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

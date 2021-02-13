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
import java.util.Properties;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
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
@WebServlet(urlPatterns = {"/cancelReservationClient"})
public class cancelReservationClient extends HttpServlet {

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
            String user_id = request.getParameter("user_id");
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
            String displayname = "";
            String clientEmail = "";//sender
            Statement statement3 = null;
            statement3 = (Statement) connection.createStatement();
            ResultSet resultSet1 = null;
            resultSet1 = statement3.executeQuery("SELECT * FROM user WHERE user_id ='" + user_id + "';");
            while (resultSet1.next()) {
                displayname = resultSet1.getString("display_name");
                clientEmail = resultSet1.getString("email");
            }
            Statement statement4 = null;
            statement4 = (Statement) connection.createStatement();
            String q = "INSERT INTO cancel_notification (n_reservation_id,client_display_name) VALUES ("
                    + "'" + Integer.valueOf(res_id) + "',"
                    + "'" + displayname + "')";
            int res = statement4.executeUpdate(q);
            Send_Mail(clientEmail, res_id, displayname);
            request.setAttribute("id", user_id);
            response.sendRedirect("reservationsClient.jsp");
        } catch (Exception e) {
            e.printStackTrace();
            out.println(e);
        }
    }
    public void Send_Mail(String email, String reservation_id, String diaplayname) throws MessagingException {
        String USER_NAME = "tawfekyassertawfek@gmail.com";
        String PASSWORD = "02k0181381tyd";
        String RECIPIENT = "alamirhassan8@gmail.com";
        String from = USER_NAME;
        String pass = PASSWORD;
        String[] to = {RECIPIENT};
        String subject = "Hotel Reservation System - Reservation Cancellation Mail";
        String body = "The user " + diaplayname + " has been canceled his reservation with ID = " + reservation_id;
        sendFromGMail(from, pass, to, subject, body);
    }

    private static void sendFromGMail(String from, String pass, String[] to, String subject, String body) throws AddressException, MessagingException {
        Properties props = System.getProperties();
        String host = "smtp.gmail.com";
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", host);
        props.put("mail.smtp.user", from);
        props.put("mail.smtp.password", pass);
        props.put("mail.smtp.port", "587");
        props.put("mail.smtp.auth", "true");
        Session session = Session.getDefaultInstance(props);
        MimeMessage message = new MimeMessage(session);
        message.setFrom(new InternetAddress(from));
        InternetAddress[] toAddress = new InternetAddress[to.length];
        for (int i = 0; i < to.length; i++) {
            toAddress[i] = new InternetAddress(to[i]);
        }
        for (InternetAddress toAddres : toAddress) {
            message.addRecipient(Message.RecipientType.TO, toAddres);
        }
        message.setSubject(subject);
        message.setText(body);
        Transport transport;
        transport = session.getTransport("smtp");
        transport.connect(host, from, pass);
        transport.sendMessage(message, message.getAllRecipients());
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
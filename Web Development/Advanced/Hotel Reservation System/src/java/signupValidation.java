/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.mysql.jdbc.Connection;
import com.mysql.jdbc.Statement;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;
import java.util.Properties;
import java.util.Random;
import javax.mail.*;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *
 * @author tawfe
 */
@WebServlet(urlPatterns = {"/signupValidation"})
public class signupValidation extends HttpServlet {

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
        HttpSession session = request.getSession(true);
        try {
            String username = request.getParameter("username");
            String diaplayname = request.getParameter("displayname");
            String email = request.getParameter("email");
            String phonenumber = request.getParameter("phone");

            Class.forName("com.mysql.jdbc.Driver");
            String url = "jdbc:mysql://localhost:3306/hotel_reservation_system_db";
            String user = "root";
            String password = "troot";
            Connection connection = null;
            Statement statement = null;
            connection = (Connection) DriverManager.getConnection(url, user, password);
            statement = (Statement) connection.createStatement();
            String query = "SELECT * FROM user";
            ResultSet resultSet = null;
            resultSet = statement.executeQuery(query);
            boolean flag = true;
            while (resultSet.next()) {
                if (resultSet.getString("email").equalsIgnoreCase(email)) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                //User not found

                String capitalCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                String lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
                String specialCharacters = "!@#$";
                String numbers = "1234567890";
                String combinedChars = capitalCaseLetters + lowerCaseLetters + specialCharacters + numbers;
                Random random = new Random();
                char[] passwordc = new char[8];

                passwordc[0] = lowerCaseLetters.charAt(random.nextInt(lowerCaseLetters.length()));
                passwordc[1] = capitalCaseLetters.charAt(random.nextInt(capitalCaseLetters.length()));
                passwordc[2] = specialCharacters.charAt(random.nextInt(specialCharacters.length()));
                passwordc[3] = numbers.charAt(random.nextInt(numbers.length()));

                for (int i = 4; i < 8; i++) {
                    passwordc[i] = combinedChars.charAt(random.nextInt(combinedChars.length()));
                }

                String role = "client";
                String query2 = "INSERT INTO user(username, email, password, display_name, phone_number, role) VALUES("
                        + "'" + username + "',"
                        + "'" + email + "',"
                        + "'" + String.valueOf(passwordc) + "',"
                        + "'" + diaplayname + "',"
                        + "'" + phonenumber + "',"
                        + "'" + role + "')";
                int queryResult = statement.executeUpdate(query2);

                
                session.setAttribute("session_username", username);
                session.setAttribute("session_email", email);
                session.setAttribute("session_displayname", diaplayname);
                session.setAttribute("session_password", String.valueOf(passwordc));
                session.setAttribute("session_phonenumber", phonenumber);
                session.setAttribute("session_role", role);

                Send_Mail(email,String.valueOf(passwordc),diaplayname);
                RequestDispatcher dispatcher = request.getRequestDispatcher("index.html");
                dispatcher.forward(request, response);
                //response.sendRedirect("index.html");

            } else {
                
                RequestDispatcher dispatcher = request.getRequestDispatcher("index.html");
                dispatcher.forward(request, response);
                //response.sendRedirect("index.html");
            }
        } catch (Exception e) {
            e.printStackTrace();
            out.println(e);
        }
    }

    public void Send_Mail(String email, String password, String diaplayname) throws MessagingException {
        String USER_NAME = "tawfekyassertawfek@gmail.com";
        String PASSWORD = "02k0181381tyd";
        String RECIPIENT = email;

        String from = USER_NAME;
        String pass = PASSWORD;
        String[] to = {RECIPIENT};
        String subject = "Hotel Reservation System Password Email";
        String body = "Welcome " + diaplayname + " your password is : " + password+" , You can use it now for login to the system, HRS Team. Thanks.";

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

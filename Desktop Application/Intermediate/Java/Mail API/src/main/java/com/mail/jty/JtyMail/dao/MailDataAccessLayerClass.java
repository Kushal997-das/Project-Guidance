package com.mail.jty.JtyMail.dao;

import org.springframework.stereotype.Repository;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

@Repository("MDAL")
public class MailDataAccessLayerClass implements MailDataAccessLayer{

    @Override
    public String sendMail(String subject, String body, String recipient, String gUsername, String gPassword) {

        try {
            sendMailFunction(gUsername,gPassword,recipient,subject,body);
            return "Email sent successfully";
        } catch (MessagingException e) {
            e.printStackTrace();
            return "Error in sending mail";
        }
    }

    private static void sendMailFunction(String username, String password, String receiver,String subject,String body) throws MessagingException {
        String USER_NAME = username;
        String PASSWORD = password;
        String RECIPIENT = receiver;
        String from = USER_NAME;
        String pass = PASSWORD;
        String[] to = {RECIPIENT};
        String subjectM = subject;
        String bodyM = body;
        sendFromGmail(from, pass, to, subjectM, bodyM);
    }

    private static void sendFromGmail(String from, String pass, String[] to, String subject, String body) throws AddressException, MessagingException {
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

}

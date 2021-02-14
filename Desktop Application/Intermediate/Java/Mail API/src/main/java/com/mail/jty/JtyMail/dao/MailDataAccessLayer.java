package com.mail.jty.JtyMail.dao;

public interface MailDataAccessLayer {

    String sendMail(String subject,String body,String recipient, String gUsername, String gPassword);

}

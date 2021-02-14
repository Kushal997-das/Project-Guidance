package com.mail.jty.JtyMail.service;

import com.mail.jty.JtyMail.dao.MailDataAccessLayer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class MailService {
    private final MailDataAccessLayer mailDataAccessLayer;


    @Autowired
    public MailService(@Qualifier("MDAL") MailDataAccessLayer mailDataAccessLayer) {
        this.mailDataAccessLayer = mailDataAccessLayer;
    }

    public String sendMail(String subject, String body, String recipient, String gUsername, String gPassword){
        return mailDataAccessLayer.sendMail(subject,body,recipient,gUsername,gPassword);
    }
}

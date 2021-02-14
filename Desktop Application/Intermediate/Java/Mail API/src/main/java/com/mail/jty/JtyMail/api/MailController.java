package com.mail.jty.JtyMail.api;


import com.mail.jty.JtyMail.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MailController {

    private final MailService mailService;

    @Autowired
    public MailController(@RequestBody MailService mailService) {
        this.mailService = mailService;
    }

    @GetMapping("/api/jty/sendMail")
    public String sendMail(@RequestParam String subject,@RequestParam String body,@RequestParam String recipient,
                           @RequestParam String gUsername,@RequestParam String gPassword){
        return mailService.sendMail(subject,body,recipient,gUsername,gPassword);
    }
}

package com.example.NotificationManagement.api;

import com.example.NotificationManagement.model.NotificationTemplate;
import com.example.NotificationManagement.service.NotificationTemplateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;


@RestController
public class NotificationTemplateController {
    private final NotificationTemplateService notificationTemplateService;

    @Autowired
    public NotificationTemplateController(@RequestBody NotificationTemplateService notificationTemplateService) {
        this.notificationTemplateService = notificationTemplateService;
    }

    @GetMapping("/nt/createNotification")
    public NotificationTemplate createNotification(@RequestParam String subject,@RequestParam String content,@RequestParam String language,@RequestParam String type ) {
        return notificationTemplateService.createNotification(  subject, content, language, type);
    }

    @GetMapping("/nt/getAllNotifications")
    @ResponseBody
    public List<NotificationTemplate> getAllNotifications() {
        return notificationTemplateService.getAllNotifications();
    }

    public NotificationTemplate selectNotificationById(UUID id) {
        return notificationTemplateService.selectNotificationById(id).orElse(null);
    }

    @GetMapping("/nt/getNotificationById")
    @ResponseBody
    public NotificationTemplate getNotificationById(@RequestParam UUID id) {
        return notificationTemplateService.getNotificationById(id);
    }

    @GetMapping("/nt/deleteNotificationById")
    public int deleteNotificationById(@RequestParam UUID id) {
        return notificationTemplateService.deleteNotification(id);
    }


    @GetMapping("/nt/updateNotification")
    public int updateNotification(@RequestParam UUID id, @RequestParam String subject,@RequestParam String content,@RequestParam String language,@RequestParam String type) {
        return notificationTemplateService.updateNotification(id,subject, content,language,type);
    }


}

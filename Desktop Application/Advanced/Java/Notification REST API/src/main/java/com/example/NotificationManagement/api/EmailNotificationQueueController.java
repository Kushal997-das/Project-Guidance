package com.example.NotificationManagement.api;

import com.example.NotificationManagement.model.NotificationQueue;
import com.example.NotificationManagement.model.QueueTemplate;
import com.example.NotificationManagement.service.EmailNotificationQueueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
public class EmailNotificationQueueController {

    private final EmailNotificationQueueService emailNotificationQueueService;

    @Autowired
    public EmailNotificationQueueController(@RequestBody EmailNotificationQueueService emailNotificationQueueService) {
        this.emailNotificationQueueService = emailNotificationQueueService;
    }

    @GetMapping("/nq/email/enqueue")
    public int insertNotificationInQueue(@RequestParam String subject,@RequestParam String content,@RequestParam String type,@RequestParam String to,@RequestParam String from) {
        return emailNotificationQueueService.insertNotificationInQueue( subject, content, type, to, from);
    }

    @GetMapping("/nq/email/dequeue")
    @ResponseBody
    public NotificationQueue getNotificationBySubject(@RequestParam String subject,@RequestParam String type) {
        return emailNotificationQueueService.getNotificationBySubject(subject,type);
    }

    @GetMapping("/nq/email/dequeueAll")
    @ResponseBody
    public List<NotificationQueue> getAllNotifications() {
        return emailNotificationQueueService.getAllNotifications();
    }

    @GetMapping("/nq/email/delete")
    public int deleteNotificationFromQueue(@RequestParam String subject,@RequestParam String type) {
        return emailNotificationQueueService.deleteNotificationFromQueue(subject,type);
    }


}

package com.example.NotificationManagement.api;

import com.example.NotificationManagement.model.NotificationQueue;
import com.example.NotificationManagement.model.QueueTemplate;
import com.example.NotificationManagement.service.EmailNotificationQueueService;
import com.example.NotificationManagement.service.SMSNotificationQueueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class SMSNotificationQueueController {
    private final SMSNotificationQueueService smsNotificationQueueService;

    @Autowired
    public SMSNotificationQueueController(@RequestBody SMSNotificationQueueService smsNotificationQueueService) {
        this.smsNotificationQueueService = smsNotificationQueueService;
    }

    @GetMapping("/nq/sms/enqueue")
    public int insertNotificationInQueue(@RequestParam String subject,@RequestParam String content,@RequestParam String type,@RequestParam String to,@RequestParam String from) {
        return smsNotificationQueueService.insertNotificationInQueue( subject, content, type, to, from);
    }

    @GetMapping("/nq/sms/dequeue")
    @ResponseBody
    public NotificationQueue getNotificationBySubject(@RequestParam String subject,@RequestParam String type) {
        return smsNotificationQueueService.getNotificationBySubject(subject,type);
    }

    @GetMapping("/nq/sms/dequeueAll")
    @ResponseBody
    public List<NotificationQueue> getAllNotifications() {
        return smsNotificationQueueService.getAllNotifications();
    }


    @GetMapping("/nq/sms/delete")
    public int deleteNotificationFromQueue(@RequestParam String subject,@RequestParam String type) {
        return smsNotificationQueueService.deleteNotificationFromQueue(subject,type);
    }

}

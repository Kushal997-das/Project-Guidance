package com.example.NotificationManagement.service;

import com.example.NotificationManagement.dao.NotificationQueueDataAccessLayer;
import com.example.NotificationManagement.model.NotificationQueue;
import com.example.NotificationManagement.model.QueueTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SMSNotificationQueueService {

    private final NotificationQueueDataAccessLayer notificationQueueDataAccessLayer;

    @Autowired
    public SMSNotificationQueueService(@Qualifier("QueueSMS") NotificationQueueDataAccessLayer notificationQueueDataAccessLayer) {
        this.notificationQueueDataAccessLayer = notificationQueueDataAccessLayer;
    }

    public int insertNotificationInQueue(String subject,String content,String type,String to,String from){
        return notificationQueueDataAccessLayer.insertNotificationInQueue(subject, content, type, to, from);
    }

    public NotificationQueue getNotificationBySubject(String subject,String type){
        return notificationQueueDataAccessLayer.getNotificationBySubject(subject,type);
    }

    public List<NotificationQueue> getAllNotifications(){
        return notificationQueueDataAccessLayer.getAllNotifications();
    }

    public int deleteNotificationFromQueue(String subject,String type){
        return notificationQueueDataAccessLayer.deleteNotificationFromQueue(subject,type);
    }


}

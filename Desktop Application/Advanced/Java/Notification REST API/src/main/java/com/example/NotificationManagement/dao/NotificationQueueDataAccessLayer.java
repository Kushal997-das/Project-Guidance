package com.example.NotificationManagement.dao;

import com.example.NotificationManagement.model.NotificationQueue;
import com.example.NotificationManagement.model.NotificationTemplate;
import com.example.NotificationManagement.model.QueueTemplate;

import java.util.List;


public interface NotificationQueueDataAccessLayer {


    int insertNotificationInQueue(String subject,String content,String type,String to,String from);

    NotificationQueue getNotificationBySubject(String subject,String type);

    List<NotificationQueue> getAllNotifications();

    int deleteNotificationFromQueue(String subject,String type);

}

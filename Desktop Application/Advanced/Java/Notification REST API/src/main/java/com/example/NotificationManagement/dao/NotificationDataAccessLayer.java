package com.example.NotificationManagement.dao;

import com.example.NotificationManagement.model.NotificationTemplate;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface NotificationDataAccessLayer {

    NotificationTemplate createNotification(UUID id, String subject,String content,String language,String type);

    default NotificationTemplate createNotification(String subject,String content,String language,String type){
        UUID id = UUID.randomUUID();
        return createNotification(id,  subject, content, language, type);
    }

    List<NotificationTemplate> selectAllNotifications();

    Optional<NotificationTemplate> selectNotificationById(UUID id);

    int deleteNotificationById(UUID id);

    int updateNotificationById(UUID id, String subject,String content,String language,String type);

    NotificationTemplate getNotificationById(UUID id);
}

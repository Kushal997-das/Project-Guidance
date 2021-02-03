package com.example.NotificationManagement.service;

import com.example.NotificationManagement.dao.NotificationDataAccessLayer;
import com.example.NotificationManagement.model.NotificationTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class NotificationTemplateService {

    private final NotificationDataAccessLayer notificationDataAccessLayer;

    @Autowired
    public NotificationTemplateService(@Qualifier("DB") NotificationDataAccessLayer notificationDataAccessLayer) {
        this.notificationDataAccessLayer = notificationDataAccessLayer;
    }

    public NotificationTemplate createNotification( String subject,String content,String language,String type) {
        return notificationDataAccessLayer.createNotification(  subject, content, language, type);
    }

    public List<NotificationTemplate> getAllNotifications() {
        return notificationDataAccessLayer.selectAllNotifications();
    }

    public Optional<NotificationTemplate> selectNotificationById(UUID id) {
        return notificationDataAccessLayer.selectNotificationById(id);
    }

    public NotificationTemplate getNotificationById(UUID id) {
        return notificationDataAccessLayer.getNotificationById(id);
    }

    public int deleteNotification(UUID id) {
        return notificationDataAccessLayer.deleteNotificationById(id);
    }

    public int updateNotification(UUID id, String subject,String content,String language,String type) {
        return notificationDataAccessLayer.updateNotificationById(id,  subject, content, language, type);
    }

}

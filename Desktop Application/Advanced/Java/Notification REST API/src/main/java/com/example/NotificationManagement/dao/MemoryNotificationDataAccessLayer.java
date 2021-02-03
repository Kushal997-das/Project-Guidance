package com.example.NotificationManagement.dao;

import com.example.NotificationManagement.model.NotificationTemplate;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository("Memory")
public class MemoryNotificationDataAccessLayer implements NotificationDataAccessLayer {


    private static List<NotificationTemplate> notificationTemplates = new ArrayList<>();

    @Override
    public NotificationTemplate createNotification(UUID id,  String subject,String content,String language,String type) {
        NotificationTemplate notificationTemplate = new NotificationTemplate(id, subject,
                content, language
                , type);
        notificationTemplates.add(notificationTemplate);
        return notificationTemplate ;
    }

    @Override
    public List<NotificationTemplate> selectAllNotifications() {
        return notificationTemplates;
    }

    @Override
    public Optional<NotificationTemplate> selectNotificationById(UUID id) {

        return notificationTemplates.stream()
                .filter(notificationTemplate -> notificationTemplate.getId().equals(id))
                .findFirst();
    }

    @Override
    public NotificationTemplate getNotificationById(UUID id) {
        return null;
    }

    @Override
    public int deleteNotificationById(UUID id) {
        Optional<NotificationTemplate> notificationTemplateMaybe = selectNotificationById(id);
        if (notificationTemplateMaybe.isEmpty()) {
            return 0;
        }
        notificationTemplates.remove(notificationTemplateMaybe.get());
        return 1;
    }

    @Override
    public int updateNotificationById(UUID id, String subject,String content,String language,String type) {

        return selectNotificationById(id)
                .map(notificationTemplate -> {
                    int indexOfNotificationToUpdate = notificationTemplates.indexOf(notificationTemplate);
                    if (indexOfNotificationToUpdate >= 0) {
                        notificationTemplates.set(indexOfNotificationToUpdate, new NotificationTemplate(id,
                                subject,content,
                                language,type));
                        return 1;
                    }
                    return 0;
                }).orElse(0);
    }
}

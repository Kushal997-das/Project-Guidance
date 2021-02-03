package com.example.NotificationManagement.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class QueueTemplate {

    String notificationSubject,notificationContent,notificationType,notificationTo,notificationFrom;

    public QueueTemplate(@JsonProperty("notificationSubject") String notificationSubject,
                         @JsonProperty("notificationContent") String notificationContent,
                         @JsonProperty("notificationType") String notificationType,
                         @JsonProperty("notificationTo") String notificationTo,
                         @JsonProperty("notificationFrom") String notificationFrom) {
        this.notificationSubject = notificationSubject;
        this.notificationContent = notificationContent;
        this.notificationType = notificationType;
        this.notificationTo = notificationTo;
        this.notificationFrom = notificationFrom;
    }

    public QueueTemplate() {
    }

    public String getNotificationSubject() {
        return notificationSubject;
    }

    public void setNotificationSubject(String notificationSubject) {
        this.notificationSubject = notificationSubject;
    }

    public String getNotificationContent() {
        return notificationContent;
    }

    public void setNotificationContent(String notificationContent) {
        this.notificationContent = notificationContent;
    }

    public String getNotificationType() {
        return notificationType;
    }

    public void setNotificationType(String notificationType) {
        this.notificationType = notificationType;
    }

    public String getNotificationTo() {
        return notificationTo;
    }

    public void setNotificationTo(String notificationTo) {
        this.notificationTo = notificationTo;
    }

    public String getNotificationFrom() {
        return notificationFrom;
    }

    public void setNotificationFrom(String notificationFrom) {
        this.notificationFrom = notificationFrom;
    }
}

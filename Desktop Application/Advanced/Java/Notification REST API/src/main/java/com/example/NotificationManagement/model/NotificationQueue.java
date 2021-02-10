package com.example.NotificationManagement.model;

public class NotificationQueue {

    int notificationId;
    String notificationSubject, notificationContent,notificationType,notificationTo,notificationFrom;




    public NotificationQueue() {
    }


    public NotificationQueue(int notificationId, String notificationSubject, String notificationContent, String notificationType, String notificationTo, String notificationFrom) {
        this.notificationId = notificationId;
        this.notificationSubject = notificationSubject;
        this.notificationContent = notificationContent;
        this.notificationType = notificationType;
        this.notificationTo = notificationTo;
        this.notificationFrom = notificationFrom;
    }


    public int getNotificationId() {
        return notificationId;
    }

    public void setNotificationId(int notificationId) {
        this.notificationId = notificationId;
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

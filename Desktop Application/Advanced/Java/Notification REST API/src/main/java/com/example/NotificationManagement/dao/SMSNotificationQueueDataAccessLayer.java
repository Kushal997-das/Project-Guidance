package com.example.NotificationManagement.dao;

import com.example.NotificationManagement.model.NotificationQueue;
import com.example.NotificationManagement.model.NotificationTemplate;
import com.example.NotificationManagement.model.QueueTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository("QueueSMS")
public class SMSNotificationQueueDataAccessLayer implements NotificationQueueDataAccessLayer{


    @Override
    public int insertNotificationInQueue(String subject,String content,String type,String to,String from) {
        int queryResult= 0;
        try{
            Class.forName("com.mysql.jdbc.Driver");
            String url = "jdbc:mysql://localhost:3306/notification_db?useSSL=false";
            String userDB = "root";
            String passwordDB = "troot";
            Connection connection = null;
            Statement statement = null;
            String query = "";
            connection = DriverManager.getConnection(url, userDB, passwordDB);
            statement = connection.createStatement();
            query = "INSERT INTO notification_sms_queue(notification_queue_subject,notification_queue_content,notification_queue_type," +
                    "notification_queue_to,notification_queue_from) VALUES ("
                    +"'"+subject+"',"
                    +"'"+content+"',"
                    +"'"+type+"',"
                    +"'"+to+"',"
                    +"'"+from+"')";

            queryResult = statement.executeUpdate(query);
            statement.close();
        }catch (Exception e){
            e.printStackTrace();
        }
        return queryResult;
    }

    @Override
    public NotificationQueue getNotificationBySubject(String subject,String type) {
        NotificationQueue notificationQueue = new NotificationQueue();
        try{
            Class.forName("com.mysql.jdbc.Driver");
            String url = "jdbc:mysql://localhost:3306/notification_db?useSSL=false";
            String userDB = "root";
            String passwordDB = "troot";
            Connection connection = null;
            Statement statement = null;
            ResultSet resultSet = null;
            String query = "";
            connection = DriverManager.getConnection(url, userDB, passwordDB);
            statement = connection.createStatement();
            query = "SELECT * FROM notification_sms_queue WHERE notification_queue_subject = '"+subject+"';";
            resultSet = statement.executeQuery(query);
            while (resultSet.next()){
                notificationQueue.setNotificationId(resultSet.getInt("notification_queue_id"));
                notificationQueue.setNotificationSubject(resultSet.getString("notification_queue_subject"));
                notificationQueue.setNotificationContent(resultSet.getString("notification_queue_content"));
                notificationQueue.setNotificationType(resultSet.getString("notification_queue_type"));
                notificationQueue.setNotificationTo(resultSet.getString("notification_queue_to"));
                notificationQueue.setNotificationFrom(resultSet.getString("notification_queue_from"));
            }
            statement.close();
        }catch (Exception e){
            e.printStackTrace();
        }
        return notificationQueue;
    }

    @Override
    public List<NotificationQueue> getAllNotifications() {
        List<NotificationQueue> notificationQueueList = new ArrayList<>();
        try{
            Class.forName("com.mysql.jdbc.Driver");
            String url = "jdbc:mysql://localhost:3306/notification_db?useSSL=false";
            String userDB = "root";
            String passwordDB = "troot";
            Connection connection = null;
            Statement statement = null;
            String query = "";
            connection = DriverManager.getConnection(url, userDB, passwordDB);
            statement = connection.createStatement();
            query = "SELECT * FROM notification_sms_queue;";
            ResultSet resultSet1 = null;
            resultSet1 = statement.executeQuery(query);
            while (resultSet1.next()){
                notificationQueueList.add(new NotificationQueue(resultSet1.getInt("notification_queue_id"),
                        resultSet1.getString("notification_queue_subject")
                        ,resultSet1.getString("notification_queue_content")
                        ,resultSet1.getString("notification_queue_type")
                        ,resultSet1.getString("notification_queue_to")
                        ,resultSet1.getString("notification_queue_from")));
            }
            statement.close();
        }catch (Exception e){
            e.printStackTrace();
        }
        return notificationQueueList;
    }

    @Override
    public int deleteNotificationFromQueue(String subject,String type) {
        int result = 0;
        try{
            Class.forName("com.mysql.jdbc.Driver");
            String url = "jdbc:mysql://localhost:3306/notification_db?useSSL=false";
            String userDB = "root";
            String passwordDB = "troot";
            Connection connection = null;
            Statement statement = null;
            ResultSet resultSet = null;
            String query = "";
            connection = DriverManager.getConnection(url, userDB, passwordDB);
            statement = connection.createStatement();
            query = "DELETE FROM notification_sms_queue WHERE ( notification_queue_subject = '"+subject+"');";
            result = statement.executeUpdate(query);

            statement.close();
        }catch (Exception e){
            e.printStackTrace();
        }
        return result;
    }
}

package com.example.NotificationManagement;

import com.example.NotificationManagement.api.EmailNotificationQueueController;
import com.example.NotificationManagement.api.NotificationTemplateController;
import com.example.NotificationManagement.api.SMSNotificationQueueController;
import com.example.NotificationManagement.dao.DBNotificationDataAccessLayer;
import com.example.NotificationManagement.dao.EmailNotificationQueueDataAccessLayer;
import com.example.NotificationManagement.dao.SMSNotificationQueueDataAccessLayer;
import com.example.NotificationManagement.model.NotificationQueue;
import com.example.NotificationManagement.model.NotificationTemplate;
import com.example.NotificationManagement.model.QueueTemplate;
import com.example.NotificationManagement.model.User;
import com.example.NotificationManagement.service.EmailNotificationQueueService;
import com.example.NotificationManagement.service.NotificationTemplateService;
import com.example.NotificationManagement.service.SMSNotificationQueueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

import javax.mail.MessagingException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Scanner;
import java.util.UUID;

@SpringBootApplication
public class NotificationManagementApplication {

    @Autowired
    private JavaMailSender javaMailSender;
    public static Scanner inputMain = new Scanner(System.in);
    public static User currentUser = new User();
    public static ArrayList<User> users;

    public static void main(String[] args) throws IOException, MessagingException {
        initDefaultData();
        mainMenu();
        SpringApplication.run(NotificationManagementApplication.class, args);
    }

    public static void initDefaultData() {

        // Adding the admins to the DB
        users = new ArrayList<User>();
        users.add(new User("Alamir", "a@gmail.com", "0123456", "123456", "admin", false, false));
        users.add(new User("Mohamed", "m@gmail.com", "0123456", "123456", "admin", false, false));
        users.add(new User("Mostafa", "ms@gmail.com", "0123456", "123456", "admin", false, false));
        users.add(new User("Tawfik", "t@gmail.com", "0123456", "123456", "admin", false, false));
        users.add(new User("Ahmed", "as@gmail.com", "0123456", "123456", "admin", false, false));
    }

    public static void mainMenu() throws IOException, MessagingException {
        // SignUp / Login
        String choice = "";
        System.out.println("---------------- Welcome ----------------");
        System.out.println("1. SignUp");
        System.out.println("2. Login");

        do {

            choice = inputMain.next();
            inputMain.nextLine();

            if (choice.equals("1")) {
                signUp();
            } else if (choice.equals("2")) {

                login();
            } else {
                System.out.println("Please choose 1 or 2 only!");
            }

        } while (!choice.equals("1") && !choice.equals("2"));

    }

    public static void signUp() throws IOException, MessagingException {

        User signUpUser = new User();
        String currentEmail = "";
        System.out.println("--------------------------- SignUp -----------------------------");
        System.out.print("Enter your username: ");
        signUpUser.setUsername(inputMain.nextLine());
        System.out.print("Enter your email: ");
        signUpUser.setEmail(inputMain.nextLine());
        currentEmail = signUpUser.getEmail();
        System.out.print("Enter your phone: ");
        signUpUser.setPhone(inputMain.nextLine());
        System.out.print("Enter your password: ");
        signUpUser.setPassword(inputMain.nextLine());
        signUpUser.setRole("user");
        signUpUser.setStatus(true);
        signUpUser.setVerified(false);

        for (int i = 0; i < users.size(); i++) {
            if (signUpUser.getEmail().equalsIgnoreCase(users.get(i).getEmail())) {
                System.out.println("This user is already exists in the system.");
                login();
                break;
            }
        }

        users.add(signUpUser);
        currentUser = signUpUser;
        System.out.println("Account created successfully.");
        // Confirmation mail
        String verify = "";
        do {

            //Verify
            NotificationTemplateController notificationTemplateController =
                    new NotificationTemplateController(new NotificationTemplateService(new DBNotificationDataAccessLayer()));
            NotificationTemplate notificationTemplate = new NotificationTemplate();
            notificationTemplate = notificationTemplateController.getNotificationById(UUID.fromString("9b4a6f49-0ed3-4317-a3ae-99229d354930"));
            String content = notificationTemplate.getTemplateContent();
            String subject = notificationTemplate.getTemplateSubject();


            //Queueing the notification
            EmailNotificationQueueController emailNotificationQueueController =
                    new EmailNotificationQueueController(new EmailNotificationQueueService(new EmailNotificationQueueDataAccessLayer()));
            emailNotificationQueueController.insertNotificationInQueue(subject,content,"Email",currentEmail,"sprint3@gmail.com");

            System.out.println("Notification queued : "+subject);

            //Dequeueing te notification
            NotificationQueue notificationQueue  = new NotificationQueue();
            notificationQueue = emailNotificationQueueController.getNotificationBySubject(subject,"Email");
            //Delete the notification from queue

            int result = emailNotificationQueueController.deleteNotificationFromQueue(subject,"Email");


            System.out.println("To: " + currentEmail);
            System.out.println("------------------------------------------------");
            System.out.println("From: System");
            System.out.println("------------------------------------------------");
            System.out.println("Subject: " + notificationQueue.getNotificationSubject());
            System.out.println("------------------------------------------------");
            System.out.println(notificationQueue.getNotificationContent());

            verify = inputMain.nextLine();

            if (verify.equals("v")) {

                for (int i = 0; i < users.size(); i++) {

                    if (currentEmail.equalsIgnoreCase(users.get(i).getEmail())) {

                        users.get(i).setVerified(true);
                        break;
                    }

                }
                System.out.println("Account verified successfully.");
                userMenu(signUpUser);
            } else {
                System.out.println("Account not verified.");

            }
        } while (!verify.equals("v"));

    }

    public static void login() throws IOException, MessagingException {

        String check = "";

        do {

            System.out.println("--------------------------- Login -----------------------------");
            System.out.print("Enter your email: ");
            String email = inputMain.nextLine();
            System.out.print("Enter your password: ");
            String password = inputMain.nextLine();
            int flagy = 0;
            for (int i = 0; i < users.size(); i++) {

                if (email.equalsIgnoreCase(users.get(i).getEmail())
                        && password.equalsIgnoreCase(users.get(i).getPassword())) {

                    flagy++;

                    if (users.get(i).getRole().equals("user")) {
                        users.get(i).setStatus(true);
                        userMenu(users.get(i));
                        check = "0";
                        break;
                    } else {
                        users.get(i).setStatus(true);
                        check = "0";
                        break;
                    }

                }
            }

            if (flagy == 0) {
                do {
                    System.out.println("Enter 1 to renter - 0 to create new password");

                    check = inputMain.next();
                    inputMain.nextLine();
                    if (check.equals("0")) {
                        // Forget Password
                        NotificationTemplateController notificationTemplateController =
                                new NotificationTemplateController(new NotificationTemplateService(new DBNotificationDataAccessLayer()));
                        NotificationTemplate notificationTemplate = new NotificationTemplate();
                        notificationTemplate = notificationTemplateController.getNotificationById(UUID.fromString("3ac47871-bfc1-49c6-84d3-f55a703fd6cf"));

                        String content = notificationTemplate.getTemplateContent();
                        String subject = notificationTemplate.getTemplateSubject();


                        //Queueing the notification
                        EmailNotificationQueueController emailNotificationQueueController =
                                new EmailNotificationQueueController(new EmailNotificationQueueService(new EmailNotificationQueueDataAccessLayer()));
                        emailNotificationQueueController.insertNotificationInQueue(subject,content,"Email",email,"sprint3@gmail.com");

                        System.out.println("Notification queued : "+subject);

                        //Dequeueing te notification
                        NotificationQueue notificationQueue  = new NotificationQueue();
                        notificationQueue = emailNotificationQueueController.getNotificationBySubject(subject,"Email");
                        //Delete the notification from queue

                        int result = emailNotificationQueueController.deleteNotificationFromQueue(subject,"Email");


                        System.out.println("To: " + email);
                        System.out.println("------------------------------------------------");
                        System.out.println("From: System");
                        System.out.println("------------------------------------------------");
                        System.out.println("Subject: " + notificationQueue.getNotificationSubject());
                        System.out.println("------------------------------------------------");
                        System.out.println(notificationQueue.getNotificationContent());


                        String newPassword = inputMain.nextLine();
                        for (int i = 0; i < users.size(); i++) {
                            if (users.get(i).getEmail().equals(email)) {
                                users.get(i).setPassword(newPassword);
                                break;
                            }
                        }
                        System.out.println("Password saved.");

                        check = "1";

                    } else {
                        mainMenu();
                    }
                } while (!check.equals("0") && !check.equals("1"));
            }
        } while (check.equals("1"));

    }

    public static void userMenu(User user) throws IOException, MessagingException {


        // Welcome message notification **************

        NotificationTemplateController notificationTemplateController =
                new NotificationTemplateController(new NotificationTemplateService(new DBNotificationDataAccessLayer()));
        NotificationTemplate notificationTemplate = new NotificationTemplate();
        notificationTemplate = notificationTemplateController.getNotificationById(UUID.fromString("34588ea3-2304-4203-8d4e-0f4bc03e246a"));

        String content = notificationTemplate.getTemplateContent();
        String subject = notificationTemplate.getTemplateSubject();
        String to = user.getEmail();

        //Queueing the notification
        EmailNotificationQueueController emailNotificationQueueController =
                new EmailNotificationQueueController(new EmailNotificationQueueService(new EmailNotificationQueueDataAccessLayer()));
        emailNotificationQueueController.insertNotificationInQueue(subject,content,"Email",to,"sprint3@gmail.com");

        System.out.println("Notification queued : "+subject);

        //Dequeueing te notification
        NotificationQueue notificationQueue  = new NotificationQueue();
        notificationQueue = emailNotificationQueueController.getNotificationBySubject(subject,"Email");
        //Delete the notification from queue

        int result = emailNotificationQueueController.deleteNotificationFromQueue(subject,"Email");


        System.out.println("To: " + to);
        System.out.println("------------------------------------------------");
        System.out.println("From: System");
        System.out.println("------------------------------------------------");
        System.out.println("Subject: " + notificationQueue.getNotificationSubject());
        System.out.println("------------------------------------------------");
        System.out.println(notificationQueue.getNotificationContent());



        String check = "";



        do {

            System.out.println("Select one from the following features: ");
            System.out.println("---------------------------------------");
            System.out.println("[1] Book Item");
            System.out.println("[2] Cancel Booking");
            System.out.println("[3] Feedback");
            System.out.println("[4] Logout");
            check = inputMain.next();

            switch (check) {
                case "1": {
                    System.out.println("Enter the item name which you want to book: ");
                    String itemName = inputMain.next();
                    NotificationTemplateController notificationTemplateController1 =
                            new NotificationTemplateController(new NotificationTemplateService(new DBNotificationDataAccessLayer()));
                    NotificationTemplate notificationTemplate1 = new NotificationTemplate();
                    notificationTemplate1 = notificationTemplateController1.getNotificationById(UUID.fromString("88f4d0e0-be87-47f8-ba48-309a3cda4d8e"));
                    String bookSubject = notificationTemplate1.getTemplateSubject();
                    String bookContent = notificationTemplate1.getTemplateContent();

                    for (int i = 0; i < bookContent.length(); i++) {

                        if (bookContent.charAt(i) == '&') {
                            bookContent = bookContent.replace("&", user.getUsername());
                        } else if (bookContent.charAt(i) == '$') {
                            bookContent = bookContent.replace("$", user.getEmail());
                        } else if (bookContent.charAt(i) == '#') {
                            bookContent = bookContent.replace("#", user.getPhone());
                        } else if (bookContent.charAt(i) == '*') {
                            bookContent = bookContent.replaceFirst("(?:\\*)+", itemName);
                        }

                    }

                    //Queueing the notification
                    EmailNotificationQueueController emailNotificationQueueController1 =
                            new EmailNotificationQueueController(new EmailNotificationQueueService(new EmailNotificationQueueDataAccessLayer()));
                    emailNotificationQueueController1.insertNotificationInQueue(bookSubject,bookContent,"Email",to,"sprint3@gmail.com");

                    System.out.println("Notification queued : "+subject);

                    //Dequeueing te notification
                    NotificationQueue notificationQueue1  = new NotificationQueue();
                    notificationQueue1 = emailNotificationQueueController.getNotificationBySubject(bookSubject,"Email");
                    //Delete the notification from queue

                    int result1 = emailNotificationQueueController.deleteNotificationFromQueue(bookSubject,"Email");


                    System.out.println("To: " + to);
                    System.out.println("------------------------------------------------");
                    System.out.println("From: System");
                    System.out.println("------------------------------------------------");
                    System.out.println("Subject: " + notificationQueue1.getNotificationSubject());
                    System.out.println("------------------------------------------------");
                    System.out.println(notificationQueue1.getNotificationContent());

                    System.out.println("If you want to choose again enter 'yes'");
                    check = inputMain.next();

                    break;
                }
                case "2":
                {
                    System.out.println("Enter the item name which you want to cancel: ");
                    String itemName = inputMain.next();
                    NotificationTemplateController notificationTemplateController1 =
                            new NotificationTemplateController(new NotificationTemplateService(new DBNotificationDataAccessLayer()));
                    NotificationTemplate notificationTemplate1 = new NotificationTemplate();
                    notificationTemplate1 = notificationTemplateController1.getNotificationById(UUID.fromString("2f09cd02-6454-4a2d-8ffa-dd681b36ae4c"));
                    String bookSubject = notificationTemplate1.getTemplateSubject();
                    String bookContent = notificationTemplate1.getTemplateContent();

                    for (int i = 0; i < bookContent.length(); i++) {

                        if (bookContent.charAt(i) == '&') {
                            bookContent = bookContent.replace("&", user.getUsername());
                        } else if (bookContent.charAt(i) == '$') {
                            bookContent = bookContent.replace("$", user.getEmail());
                        } else if (bookContent.charAt(i) == '#') {
                            bookContent = bookContent.replace("#", user.getPhone());
                        } else if (bookContent.charAt(i) == '*') {
                            bookContent = bookContent.replaceFirst("(?:\\*)+", itemName);
                        }

                    }

                    //Queueing the notification
                    SMSNotificationQueueController smsNotificationQueueController =
                            new SMSNotificationQueueController(new SMSNotificationQueueService(new SMSNotificationQueueDataAccessLayer()));
                    smsNotificationQueueController.insertNotificationInQueue(bookSubject,bookContent,"SMS",user.getPhone(),"01111111111");

                    System.out.println("Notification queued : "+subject);

                    //Dequeueing te notification
                    NotificationQueue notificationQueue1  = new NotificationQueue();
                    notificationQueue1 = smsNotificationQueueController.getNotificationBySubject(bookSubject,"SMS");
                    //Delete the notification from queue

                    int result1 = smsNotificationQueueController.deleteNotificationFromQueue(bookSubject,"SMS");
                    System.out.println("From: System");
                    System.out.println("------------------------------------------------");
                    System.out.println(notificationQueue1.getNotificationContent());
                    System.out.println("If you want to choose again enter 'yes'");
                    check = inputMain.next();
                    break;
                }
                case "3":
                {
                    NotificationTemplateController notificationTemplateController1 =
                            new NotificationTemplateController(new NotificationTemplateService(new DBNotificationDataAccessLayer()));
                    NotificationTemplate notificationTemplate1 = new NotificationTemplate();
                    notificationTemplate1 = notificationTemplateController1.getNotificationById(UUID.fromString("7880af38-a638-45f0-b4bb-615ecf12ffa2"));
                    String bookSubject = notificationTemplate1.getTemplateSubject();
                    String bookContent = notificationTemplate1.getTemplateContent();


                    //Queueing the notification
                    SMSNotificationQueueController smsNotificationQueueController =
                            new SMSNotificationQueueController(new SMSNotificationQueueService(new SMSNotificationQueueDataAccessLayer()));
                    smsNotificationQueueController.insertNotificationInQueue(bookSubject,bookContent,"SMS",user.getPhone(),"01111111111");

                    System.out.println("Notification queued : "+subject);

                    //Dequeueing te notification
                    NotificationQueue notificationQueue1  = new NotificationQueue();
                    notificationQueue1 = smsNotificationQueueController.getNotificationBySubject(bookSubject,"SMS");
                    //Delete the notification from queue

                    int result1 = smsNotificationQueueController.deleteNotificationFromQueue(bookSubject,"SMS");
                    System.out.println("From: System");
                    System.out.println("------------------------------------------------");
                    System.out.println(notificationQueue1.getNotificationContent());
                    String feedback = inputMain.next();
                    System.out.println("If you want to choose again enter 'yes'");
                    check = inputMain.next();

                    break;}
                case "4":

                case "no": {
                    mainMenu();
                    break;}
            }


        } while (check.equalsIgnoreCase("yes"));

    }

    //Function to send actual mail using java mail
    public void sendEmail() {

        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo("mostafahutler6@gmail.com");
        msg.setSubject("subject");
        msg.setText("content");

        javaMailSender.send(msg);

    }
}

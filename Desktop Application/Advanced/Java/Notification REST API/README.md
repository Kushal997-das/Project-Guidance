# Notification REST API `Spring Boot`

(Notification Template Module)

# Project overview

Typically softwares are NOT one big block of code, that have all the features that the software provides, instead, usually softwares are broken down into sub-systems/sub-components/sub-modules, and these parts are even broken down into even smaller components/classes. 

The project will NOT be an entire software system, but rather a component within the system 
that fulfills a need, provides a feature, that serves a greater PURPOSE within the WHOLE purpose of the software. And typically, we developers, do not implement the whole system as a whole, but we (in teams) get assigned to parts of the this system, and these parts when collectively work together, make up the system/software.

So, we are going to simulate this real situation in this project scope, we (as teams) wont develop a whole software, but rather a module within this software. This module would be the "Notification" module. 

For example, we all tried to register on websites, and there's always like a "confirmation" email that gets sent to you, where you can confirm your email, and sent you back to the site where you can proceed with your login. And then if we forget our password, another mail is sent, and when you book an item on that store, typically another mail is sent with your booking information. All of these "mails" are considered to be "notifications" , and these notifications can also be "sms messages", and they can be sent to individual email-address/phone-number or multiple as part of "bulk" notifications. So , that is what we will try to build, this "Notification" module can be divided into these parts.

# Sprint 1 -> Notification Template

> As mentioned above, your software can send different types of "notifications", surely the "content" of the "registration activation mail" is different from the "content" of the "forget password mail", which in turn is different from the "content" of "your booking sms confirmation message", right ? 
The notifications module, manages those different notification "templates", and the languages these templates can be sent in, and of course the "placeholders" within the content of these templates to be replaced with "actual values"
ex: " Dear {x} , your booking of the {y} is confirmed. thanks for using our store :) " 
this would be the template , but when the system "sends" it to the user "hassan" who bought the item "mobile charger" , the actual email would be 
" Dear hassan, your booking of the item mobile charger is confirmed, thanks for using our store :) "
So, the "management" of those notifications templates, their subjects, content, available languages, available channels ( email , sms ) , and placeholders would be the focus of this part.

# Sprint 2 -> Queuing / Handling

> When your "notifications module" gets invoked to send a "notification" to an email address or phone number, it would be a good design decision to NOT actually send the notification within the scope of this "invocation", because this would be mean you will hang the "invoker" till the actual message is sent. So what should we do ? you should implement a "notifications Queue" , where you insert "notifications" that ARE TO BE SENT and that's it, your job is done, and the invoker doesn't have  to wait for anything.
This part would be the responsible of actual de-queue-ing from the "ready-to-send notifications queue", and send "handle/send" it , as well as handling  the unsuccessfully sent notifications.

# Sprint 3 -> Dequeuing notifications

> Develop a console application to de-queue from queues and actually send those notifications.
We won't ask you to actually use a library/3rd-party mail-gatway/SMS-gateway, to send emails or SMS, but you ARE required to MOCK these gateways.
---meaning--> you can replace your mocking, with actual gateway that sends emails or SMS, WITHOUT affecting the rest of the module,
nor the way the rest of the module is interacting with this specific part. 
You also may want to log the status ( success / failure ) of these handled dequeued notifications

# API Endpoints

* http://localhost:8080/nt/createNotification
* http://localhost:8080/nt/getAllNotifications
* http://localhost:8080/nt/getNotificationById
* http://localhost:8080/nt/deleteNotificationById
* http://localhost:8080/nt/updateNotification

* http://localhost:8080/nq/email/enqueue
* http://localhost:8080/nq/email/dequeue
* http://localhost:8080/nq/email/dequeueAll
* http://localhost:8080/nq/email/delete

* http://localhost:8080/nq/sms/enqueue
* http://localhost:8080/nq/sms/dequeue
* http://localhost:8080/nq/sms/dequeueAll
* http://localhost:8080/nq/sms/delete

###### See the following images:

![Image-1](https://github.com/TawfikYasser/Project-Guidance/blob/main/Desktop%20Application/Advanced/Java/Notification%20REST%20API/assets/Img-1.png)

![Image-2](https://github.com/TawfikYasser/Project-Guidance/blob/main/Desktop%20Application/Advanced/Java/Notification%20REST%20API/assets/Img-2.png)

![Image-3](https://github.com/TawfikYasser/Project-Guidance/blob/main/Desktop%20Application/Advanced/Java/Notification%20REST%20API/assets/Img-3.png)

![Image-4](https://github.com/TawfikYasser/Project-Guidance/blob/main/Desktop%20Application/Advanced/Java/Notification%20REST%20API/assets/Img-4.png)

![Image-5](https://github.com/TawfikYasser/Project-Guidance/blob/main/Desktop%20Application/Advanced/Java/Notification%20REST%20API/assets/Img-5.png)

Have Fun!
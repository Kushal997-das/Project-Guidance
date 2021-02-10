CREATE DATABASE  IF NOT EXISTS `hotel_reservation_system_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `hotel_reservation_system_db`;
-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: hotel_reservation_system_db
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `branch`
--

DROP TABLE IF EXISTS `branch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `branch` (
  `branch_id` int NOT NULL AUTO_INCREMENT,
  `barnch_name` varchar(50) DEFAULT NULL,
  `branch_location` varchar(50) DEFAULT NULL,
  `hotel_id` int DEFAULT NULL,
  PRIMARY KEY (`branch_id`),
  KEY `fk_branch_hotel_id_idx` (`hotel_id`),
  CONSTRAINT `fk_branch_hotel_id` FOREIGN KEY (`hotel_id`) REFERENCES `hotel` (`hotel_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `branch`
--

LOCK TABLES `branch` WRITE;
/*!40000 ALTER TABLE `branch` DISABLE KEYS */;
/*!40000 ALTER TABLE `branch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cancel_notification`
--

DROP TABLE IF EXISTS `cancel_notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cancel_notification` (
  `notification_id` int NOT NULL AUTO_INCREMENT,
  `n_reservation_id` int DEFAULT NULL,
  `client_display_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`notification_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cancel_notification`
--

LOCK TABLES `cancel_notification` WRITE;
/*!40000 ALTER TABLE `cancel_notification` DISABLE KEYS */;
INSERT INTO `cancel_notification` VALUES (2,32,'Tawfik Yasser');
/*!40000 ALTER TABLE `cancel_notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `history`
--

DROP TABLE IF EXISTS `history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `history` (
  `history_id` int NOT NULL AUTO_INCREMENT,
  `history_payment` varchar(50) DEFAULT NULL,
  `history_check_in` varchar(200) DEFAULT NULL,
  `history_check_out` varchar(200) DEFAULT NULL,
  `hotel_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `adults` varchar(45) DEFAULT NULL,
  `children` varchar(45) DEFAULT NULL,
  `no_rooms` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`history_id`),
  KEY `fk_his_hotel_id_idx` (`hotel_id`),
  KEY `fk_his_user_id_idx` (`user_id`),
  CONSTRAINT `fk_his_hotel_id` FOREIGN KEY (`hotel_id`) REFERENCES `hotel` (`hotel_id`),
  CONSTRAINT `fk_his_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `history`
--

LOCK TABLES `history` WRITE;
/*!40000 ALTER TABLE `history` DISABLE KEYS */;
INSERT INTO `history` VALUES (14,'500','15/1/2021','20/1/2021',4,25,'Pending','3','2','2'),(15,'800','20/1/2021','28/1/2021',4,25,'Confirmed','2','2','2'),(16,'-37680','30/1/2021','6/2/2021',4,25,'Pending','2','6','3'),(17,'13000','15/1/2021','28/1/2021',4,25,'Pending','2','2','2'),(18,'7000','15/1/2021','22/1/2021',4,25,'Pending','1','4','2'),(19,'8000','','23/1/2021',4,25,'Pending','4','5','2'),(20,'7000','22/1/2021','29/1/2021',4,25,'Pending','1','2','2'),(21,'9000','16/1/2021','22/1/2021',4,25,'Pending','3','5','3'),(22,'18620','19/1/2021','29/1/2021',4,25,'Pending','4','4','5'),(23,'7620','16/1/2021','22/1/2021',4,25,'Pending','4','0','3');
/*!40000 ALTER TABLE `history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hotel`
--

DROP TABLE IF EXISTS `hotel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hotel` (
  `hotel_id` int NOT NULL AUTO_INCREMENT,
  `hotel_name` varchar(50) DEFAULT NULL,
  `hotel_stars` varchar(50) DEFAULT NULL,
  `hotel_location` varchar(50) DEFAULT NULL,
  `hotel_distance` varchar(50) DEFAULT NULL,
  `hotel_phone` varchar(50) DEFAULT NULL,
  `hotel_price_min` varchar(50) DEFAULT NULL,
  `hotel_availability` varchar(50) DEFAULT NULL,
  `hotel_price_max` varchar(50) DEFAULT NULL,
  `hotel_avg_rate` varchar(50) DEFAULT NULL,
  `hotel_city` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`hotel_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hotel`
--

LOCK TABLES `hotel` WRITE;
/*!40000 ALTER TABLE `hotel` DISABLE KEYS */;
INSERT INTO `hotel` VALUES (4,'Ramses Hilton Hotel','5','https://goo.gl/maps/LEy98S7EHX5mcnQZ6','50','01129348206','100','All week','500','3.7777777','Cairo'),(5,'The Luxury Collection Hotels & Resorts.','4','https://goo.gl/maps/LEy98S7EHX5mcnQZ6','150','01129348206','250','From Sat to Thr','1000','5.0','Alex'),(6,'Rosewood Hotels & Resorts.','5','https://goo.gl/maps/LEy98S7EHX5mcnQZ6','100','01129348206','150','All week','800','4.0','Giza'),(7,'Aman Resorts.','3','https://goo.gl/maps/LEy98S7EHX5mcnQZ6','200','01129348206','200','All week','400','5.0','Cairo'),(8,'Four Seasons.','5','https://goo.gl/maps/LEy98S7EHX5mcnQZ6','10000','01129348206','100','From Sat to Thr','950','4.0','Alex'),(9,'St Regis Hotels','4','https://goo.gl/maps/LEy98S7EHX5mcnQZ6','100','01129348206','250','All week','1500','4.0','Cairo'),(10,'The Enchanted Garden','3','https://goo.gl/maps/LEy98S7EHX5mcnQZ6','50','01129348206','100','All week','700','5.0','Giza'),(11,'Walkabout Beach Hotel','5','https://goo.gl/maps/LEy98S7EHX5mcnQZ6','100','01129348206','300','All week','800','3.0','Alex'),(12,'Priority Hospitality','4','https://goo.gl/maps/LEy98S7EHX5mcnQZ6','150','01129348206','500','From Mon to Wed','3000','5.0','Cairo'),(13,'Fairmont Nile City Hotel','5','https://goo.gl/maps/LEy98S7EHX5mcnQZ6','12','02 24619494','1880','All week','2500','4.0','Cairo'),(17,'MGoogle','5','https://goo.gl/maps/LEy98S7EHX5mcnQZ6','50','011','10','All week','50','0','Cairo'),(18,'New Hotel','5','https://goo.gl/maps/LEy98S7EHX5mcnQZ6','50','011','100','All week','500','1.0','Cairo'),(19,'Facebook','5','https://goo.gl/maps/LEy98S7EHX5mcnQZ6','50','011','20','All week','50','2.2','Cairo'),(20,'Netflix','5','https://goo.gl/maps/LEy98S7EHX5mcnQZ6','50','011','20','All week','50','0','Cairo'),(21,'5','5','5','5','55','5','5','5','0','5'),(22,'H','5','https://goo.gl/maps/LEy98S7EHX5mcnQZ6','50','011','20','All','50','2.0','Cairo');
/*!40000 ALTER TABLE `hotel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hotel_facilities`
--

DROP TABLE IF EXISTS `hotel_facilities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hotel_facilities` (
  `hotel_facilities_id` int NOT NULL AUTO_INCREMENT,
  `hotel_facilities_name` varchar(50) DEFAULT NULL,
  `hotel_id` int DEFAULT NULL,
  PRIMARY KEY (`hotel_facilities_id`),
  KEY `fk_hfac_hotel_id_idx` (`hotel_id`),
  CONSTRAINT `fk_hfac_hotel_id` FOREIGN KEY (`hotel_id`) REFERENCES `hotel` (`hotel_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hotel_facilities`
--

LOCK TABLES `hotel_facilities` WRITE;
/*!40000 ALTER TABLE `hotel_facilities` DISABLE KEYS */;
INSERT INTO `hotel_facilities` VALUES (1,'WIFI',4),(2,'Swimming Pool',4),(3,'Beach',5),(4,'Gym',5),(5,'Family Room',6),(6,'Tea Maker',6),(7,'Airport',7),(8,'Cafe',7),(9,'WIFI',8),(10,'Gym',8),(11,'Beach',9),(12,'Cafe',9),(13,'Famliy Room',10),(14,'Coffe Maker',10);
/*!40000 ALTER TABLE `hotel_facilities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meals`
--

DROP TABLE IF EXISTS `meals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meals` (
  `meal_id` int NOT NULL AUTO_INCREMENT,
  `meal_name` varchar(50) DEFAULT NULL,
  `meal_price` varchar(50) DEFAULT NULL,
  `hotel_id` int DEFAULT NULL,
  PRIMARY KEY (`meal_id`),
  KEY `fk_meal_hotel_id_idx` (`hotel_id`),
  CONSTRAINT `fk_meal_hotel_id` FOREIGN KEY (`hotel_id`) REFERENCES `hotel` (`hotel_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meals`
--

LOCK TABLES `meals` WRITE;
/*!40000 ALTER TABLE `meals` DISABLE KEYS */;
INSERT INTO `meals` VALUES (1,'Koshary','120',4),(2,'Milk','50',5),(3,'Grgeer','10',6),(4,'Fatta','200',7),(5,'Duck','100',8),(7,'Foul','10',9),(8,'Tomato','50',10),(9,'Soup','100',11),(10,'Cheese','50',12),(11,'Soup','100',8);
/*!40000 ALTER TABLE `meals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `photos`
--

DROP TABLE IF EXISTS `photos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `photos` (
  `photos_id` int NOT NULL AUTO_INCREMENT,
  `photo` varchar(100) DEFAULT NULL,
  `hotel_id` int DEFAULT NULL,
  PRIMARY KEY (`photos_id`),
  KEY `fk_photos_hotel_id_idx` (`hotel_id`),
  CONSTRAINT `fk_photos_hotel_id` FOREIGN KEY (`hotel_id`) REFERENCES `hotel` (`hotel_id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photos`
--

LOCK TABLES `photos` WRITE;
/*!40000 ALTER TABLE `photos` DISABLE KEYS */;
INSERT INTO `photos` VALUES (1,'apple_abstract-wallpaper-5120x2880.jpg',4),(2,'apple_abstract-wallpaper-5120x2880.jpg',5),(3,'apple_abstract-wallpaper-5120x2880.jpg',6),(4,'apple_abstract-wallpaper-5120x2880.jpg',7),(5,'apple_abstract-wallpaper-5120x2880.jpg',8),(6,'apple_abstract-wallpaper-5120x2880.jpg',9),(7,'apple_abstract-wallpaper-5120x2880.jpg',10),(8,'apple_abstract-wallpaper-5120x2880.jpg',4),(9,'apple_abstract-wallpaper-5120x2880.jpg',4),(10,'apple_abstract-wallpaper-5120x2880.jpg',11),(11,'apple_abstract-wallpaper-5120x2880.jpg',12),(13,'apple_abstract-wallpaper-5120x2880.jpg',17),(14,'apple_abstract-wallpaper-5120x2880.jpg',18),(15,'apple_abstract-wallpaper-5120x2880.jpg',19),(16,'apple_abstract-wallpaper-5120x2880.jpg',20),(17,'apple_abstract-wallpaper-5120x2880.jpg',21),(18,'apple_abstract-wallpaper-5120x2880.jpg',22),(19,'apple_abstract-wallpaper-5120x2880.jpg',13),(20,'apple_abstract-wallpaper-5120x2880.jpg',13),(21,'apple_abstract-wallpaper-5120x2880.jpg',13),(22,'apple_abstract-wallpaper-5120x2880.jpg',13),(23,'apple_abstract-wallpaper-5120x2880.jpg',13),(24,'apple_abstract-wallpaper-5120x2880.jpg',7),(25,'apple_abstract-wallpaper-5120x2880.jpg',7),(26,'apple_abstract-wallpaper-5120x2880.jpg',7),(27,'apple_abstract-wallpaper-5120x2880.jpg',7),(28,'apple_abstract-wallpaper-5120x2880.jpg',7);
/*!40000 ALTER TABLE `photos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rate`
--

DROP TABLE IF EXISTS `rate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rate` (
  `rate_id` int NOT NULL AUTO_INCREMENT,
  `comment` varchar(150) DEFAULT NULL,
  `rate` varchar(50) DEFAULT NULL,
  `hotel_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`rate_id`),
  KEY `fk_rate_hotel_id_idx` (`hotel_id`),
  KEY `fk_rate_user_id_idx` (`user_id`),
  CONSTRAINT `fk_rate_hotel_id` FOREIGN KEY (`hotel_id`) REFERENCES `hotel` (`hotel_id`),
  CONSTRAINT `fk_rate_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rate`
--

LOCK TABLES `rate` WRITE;
/*!40000 ALTER TABLE `rate` DISABLE KEYS */;
INSERT INTO `rate` VALUES (1,'Good','4',4,25),(2,'Very Good','5',5,25),(3,'Very Good','4',6,25),(4,'Excellent','5',7,25),(5,'Good','4',8,25),(6,'Good','5',9,25),(7,'Good','5',10,25),(8,'Very Good','3',11,25),(9,'Good','5',12,25),(10,'A very good hotel to go to and enjoy!','5',4,25),(11,'Very Good Hotel Remses','4',4,25),(12,'Excellent','4',4,25),(13,'Excellent','4',4,25),(14,'VG Hotel','4',4,25),(15,'Good 5','3',4,25),(16,'Goolge','3',4,25),(17,'Good 3','3',9,25),(18,'Good 13','5',13,25),(19,'Good 3','3',13,25),(20,'Good','3',4,25),(21,'Good','0',18,29),(22,'Good','2',18,25),(23,'Good','0',19,29),(24,'Facebook 4','4',19,25),(25,'F2','2',19,25),(26,'F2','2',19,25),(27,'F3','3',19,25),(48,'Ahmed 1','1',22,33),(49,'Tawfik 2','2',22,25),(50,'New 3','3',22,36);
/*!40000 ALTER TABLE `rate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservation`
--

DROP TABLE IF EXISTS `reservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservation` (
  `reservation_id` int NOT NULL AUTO_INCREMENT,
  `reservation_payment` varchar(50) DEFAULT NULL,
  `reservation_check_in` varchar(200) DEFAULT NULL,
  `reservation_check_out` varchar(200) DEFAULT NULL,
  `hotel_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `adults` varchar(45) DEFAULT NULL,
  `children` varchar(45) DEFAULT NULL,
  `no_rooms` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`reservation_id`),
  KEY `fk_user_id_idx` (`user_id`),
  KEY `fk_hotel_id_idx` (`hotel_id`),
  CONSTRAINT `fk_hotel_id_reservation` FOREIGN KEY (`hotel_id`) REFERENCES `hotel` (`hotel_id`),
  CONSTRAINT `fk_user_id_reservation` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation`
--

LOCK TABLES `reservation` WRITE;
/*!40000 ALTER TABLE `reservation` DISABLE KEYS */;
INSERT INTO `reservation` VALUES (27,'1800','16/5/2021','9/7/2021',7,28,'Confirmed','4','6','1');
/*!40000 ALTER TABLE `reservation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reserved_history_rooms`
--

DROP TABLE IF EXISTS `reserved_history_rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reserved_history_rooms` (
  `room_id` int NOT NULL,
  `room_price` varchar(45) DEFAULT NULL,
  `history_id` int DEFAULT NULL,
  `reserved_history_room_id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`reserved_history_room_id`),
  KEY `fk_res_his_idx` (`history_id`),
  CONSTRAINT `fk_res_his` FOREIGN KEY (`history_id`) REFERENCES `history` (`history_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reserved_history_rooms`
--

LOCK TABLES `reserved_history_rooms` WRITE;
/*!40000 ALTER TABLE `reserved_history_rooms` DISABLE KEYS */;
INSERT INTO `reserved_history_rooms` VALUES (1,'50',14,1),(1,'50',15,2),(1,'500',16,3),(6,'570',16,4),(1,'500',17,5),(1,'500',18,6),(1,'500',19,7),(1,'500',20,8),(1,'500',21,9),(1,'500',22,10),(2,'200',22,11),(6,'570',22,12),(11,'22',22,13),(1,'500',23,14),(2,'200',23,15),(6,'570',23,16);
/*!40000 ALTER TABLE `reserved_history_rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reserved_rooms`
--

DROP TABLE IF EXISTS `reserved_rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reserved_rooms` (
  `room_id` int NOT NULL,
  `room_price` varchar(45) DEFAULT NULL,
  `reservation_id` int DEFAULT NULL,
  `reserved_room_id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`reserved_room_id`),
  KEY `fk_res_id_idx` (`reservation_id`),
  CONSTRAINT `fk_res_id` FOREIGN KEY (`reservation_id`) REFERENCES `reservation` (`reservation_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reserved_rooms`
--

LOCK TABLES `reserved_rooms` WRITE;
/*!40000 ALTER TABLE `reserved_rooms` DISABLE KEYS */;
INSERT INTO `reserved_rooms` VALUES (4,'594',27,4);
/*!40000 ALTER TABLE `reserved_rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room`
--

DROP TABLE IF EXISTS `room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room` (
  `room_id` int NOT NULL AUTO_INCREMENT,
  `room_type` varchar(50) DEFAULT NULL,
  `room_availability` varchar(5) DEFAULT NULL,
  `room_price` varchar(50) DEFAULT NULL,
  `hotel_id` int DEFAULT NULL,
  `room_facility` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`room_id`),
  KEY `fk_room_hotel_id_idx` (`hotel_id`),
  CONSTRAINT `fk_room_hotel_id` FOREIGN KEY (`hotel_id`) REFERENCES `hotel` (`hotel_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room`
--

LOCK TABLES `room` WRITE;
/*!40000 ALTER TABLE `room` DISABLE KEYS */;
INSERT INTO `room` VALUES (1,'Family Room','OK','500',4,' Junior Suite Sea View'),(2,'Junior Gold','OK','200',4,'Exclusive Suite Sea View'),(3,'Honey Moon','NO','30',6,'Superior King Room with City View'),(4,'Double','NO','594',7,'Standard Room with Partial Sea View'),(5,'Pool Room','OK','56',8,'Superior King Room with City View'),(6,'King Room Gold','OK','570',4,' Junior Suite Sea View'),(7,'Famliy 2','NO','598',10,'Superior King Room with City View'),(8,'Junior','NO','123',11,'Standard Room with Partial Sea View'),(9,'Honey Moon','OK','123',12,'Exclusive Suite Sea View'),(11,'Great Room','OK','22',4,'Superior King Room with City View'),(14,'Four stars','NO','225',5,'Standard Room with Partial Sea View'),(15,'ff','ff','23',9,'ff');
/*!40000 ALTER TABLE `room` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `display_name` varchar(50) DEFAULT NULL,
  `phone_number` varchar(50) DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (25,'tawfik','tawfekyassertawfek@gmail.com','vG@4@QaU','Tawfik Yasser','01129348206','client'),(28,'alamir','alamirhassan8@gmail.com','lN@5pMrp','Al-Amir Hassan','01127171631','admin'),(29,'Esmat','AbdelrahmanEsmat10@gmail.com','ns\\3qmQL','Abd El-Rhman Esmat','01123508739','admin'),(32,'1','1','qI@820Lo','1','1','client'),(33,'ahmed','ahmed@gmail.com','rQ$8yysH','Ahmed ','01129348206','client'),(34,'man','man@gmail.com','yP$1Dluo','Man','01129348206','client'),(35,'stud','20180075@stud.fci-cu.edu.eg','fW$8MeVY','Student FCAI','20180075','client'),(36,'new','new@gmail.com','sM!95gmH','new','011','client'),(37,'u','u@gmail.com','bY$97q2#','u','1','client');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-15 22:38:27

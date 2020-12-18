-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: csc317db
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
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(64) NOT NULL,
  `email` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `usertype` int NOT NULL DEFAULT '0',
  `active` int NOT NULL DEFAULT '0',
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (13,'Test123456!','test@test.gmail.com','$2b$10$ZHpQsTdc3e.8GOIJKwx65.zLlgN8dVU8k01wXRWcGIm0iu7s2oKWC',0,0,'2020-12-10 11:01:23'),(14,'Test1234567!','test123@gmail.com','$2b$10$oVpAuqOIQHSusBPfXVqHi.lXTqximOQm9/q5wPrH.aujhf323B8A.',0,0,'2020-12-10 11:09:50'),(15,'Test12345678!','testtest@gmail.com','$2b$10$mw1jE6iGSnmrJQ3WevcUUOyiF6zXTI88/QRsPor6wFlaXS6SARftC',0,0,'2020-12-10 11:13:50'),(16,'Refractor1!','refractor@gmail.com','$2b$10$wFIj7hZ0qL6SzroDuhlw..N3RMV2iY30thQvoMAT2NbAtlDU8GhAa',0,0,'2020-12-15 00:49:49'),(17,'UserTesting123!','UserTesting123!@gmail.com','$2b$10$afzIReifmJcZ9icgaPNHfOQa4SyXXiRs3lPcAbAUk7Y2xvdcyk0GO',0,0,'2020-12-16 18:11:38'),(18,'TEST12321434!','test123123@gmail.com','$2b$10$vVC8quTmYCdPHTtLYv1rh.nzHqPMyOy7eAWLYVA/Xk1H0LQHPytlm',0,0,'2020-12-16 22:43:19'),(19,'TESTING123!','testttt@gmail.com','$2b$10$mHyp7LiHU8xgXWVVknhv4e/ik299Vz798iqXX.NgpjMgu374LYGRu',0,0,'2020-12-16 23:24:29'),(20,'Testt1234556!','1234test@gmail.com','$2b$10$XUwMsB9vIzZQ8S4wf1.7Hu6JPs6eTfHoP253VdyAM.p.4m0NTjgjm',0,0,'2020-12-17 15:44:04');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-17 16:06:28

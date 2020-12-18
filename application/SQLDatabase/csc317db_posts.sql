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
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(128) NOT NULL,
  `description` varchar(4096) NOT NULL,
  `photopath` varchar(4096) NOT NULL,
  `thumbnail` varchar(4096) NOT NULL,
  `active` int NOT NULL DEFAULT '0',
  `created` datetime NOT NULL,
  `fk_userid` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `posts to users_idx` (`fk_userid`),
  CONSTRAINT `posts to users` FOREIGN KEY (`fk_userid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (7,'Naruto and Kurama','Super cool Naruto and Kurama Pic!!!','public\\images\\uploads\\f6a6471840282d3bc514be2e74e8766399ad303b099a.png','public/images/uploads/thumbnail-f6a6471840282d3bc514be2e74e8766399ad303b099a.png',0,'2020-12-14 13:58:49',15),(8,'Fairy Tail','AWEE THEY ARE SO CUTE <3','public\\images\\uploads\\9e712c280469e6f27d0fb29f02051980de19e3aa6d6b.jpeg','public/images/uploads/thumbnail-9e712c280469e6f27d0fb29f02051980de19e3aa6d6b.jpeg',0,'2020-12-14 13:59:31',15),(9,'One piece','Damn, I wish I could be as cool as these guys :3','public\\images\\uploads\\c3cae8d6eed369dba3817b47530b6d4d5fca871d365b.jpeg','public/images/uploads/thumbnail-c3cae8d6eed369dba3817b47530b6d4d5fca871d365b.jpeg',0,'2020-12-14 14:00:08',15),(10,'Sword Art Online','LOL, there was some pretty bad arcs XD','public\\images\\uploads\\d179c59f5f10be47525f12fb7e4623d1ac5688fe0710.png','public/images/uploads/thumbnail-d179c59f5f10be47525f12fb7e4623d1ac5688fe0710.png',0,'2020-12-14 14:00:59',15),(11,'Soccer Mon','So cute :o','public\\images\\uploads\\76f2d1b92cf4ab13ee8c8f33588b1514390e29dd0425.jpeg','public/images/uploads/thumbnail-76f2d1b92cf4ab13ee8c8f33588b1514390e29dd0425.jpeg',0,'2020-12-14 14:01:35',15),(12,'Pokemon Eevees','How lovely ^_^','public\\images\\uploads\\82fe8408590c3a4c8be9c05e6412a681ed647412837f.png','public/images/uploads/thumbnail-82fe8408590c3a4c8be9c05e6412a681ed647412837f.png',0,'2020-12-14 14:02:16',15),(13,'Re-Zero','Goddamn Goddamn...','public\\images\\uploads\\ce2b9495c340b315ed00f7b86860a334a98d7ac569bc.png','public/images/uploads/thumbnail-ce2b9495c340b315ed00f7b86860a334a98d7ac569bc.png',0,'2020-12-14 14:02:48',15),(14,'Boku no hero','Dekuuuuuuuuuuuuuu!!!!!!!','public\\images\\uploads\\59f1e5cfd5030ef9510021c70ad090ac6702c111c4e0.png','public/images/uploads/thumbnail-59f1e5cfd5030ef9510021c70ad090ac6702c111c4e0.png',0,'2020-12-14 14:03:43',15),(15,'Rem','Don\'t be sad :(','public\\images\\uploads\\a61b983c345814ba8e849f35f47fec40e0157bdaaf1e.png','public/images/uploads/thumbnail-a61b983c345814ba8e849f35f47fec40e0157bdaaf1e.png',0,'2020-12-14 14:04:25',15),(17,'Kimi no Na wa','So beautiful~','public\\images\\uploads\\7ffcb4c5211dcf188f850bbef363e5b67923aa1f9156.png','public/images/uploads/thumbnail-7ffcb4c5211dcf188f850bbef363e5b67923aa1f9156.png',0,'2020-12-15 18:56:27',15),(19,'Anohana','So sad TT^TT','public\\images\\uploads\\0637ee6399f58cd337d653434a1756f79fdf4af71a77.jpeg','public/images/uploads/thumbnail-0637ee6399f58cd337d653434a1756f79fdf4af71a77.jpeg',0,'2020-12-16 18:34:59',17),(20,'Katekyo Hitman Reborn','The memories!','public\\images\\uploads\\7992d5a6686fec2ab8ec32b71003915e40be8f659728.jpeg','public/images/uploads/thumbnail-7992d5a6686fec2ab8ec32b71003915e40be8f659728.jpeg',0,'2020-12-16 21:13:42',17),(24,'Demon Slayer','WOW!','public\\images\\uploads\\b5dab8bf936270573f08bf2706b47b85fa91e6e4fe8e.jpeg','public/images/uploads/thumbnail-b5dab8bf936270573f08bf2706b47b85fa91e6e4fe8e.jpeg',0,'2020-12-17 15:45:01',20);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
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

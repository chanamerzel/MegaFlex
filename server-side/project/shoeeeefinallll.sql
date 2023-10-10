-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: shoesshop
-- ------------------------------------------------------
-- Server version	8.0.29

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
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `CategoryName` varchar(20) NOT NULL,
  `CategoryCode` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`CategoryCode`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES ('heels',1),('flat',2),('sneakers',3),('sandals',4),('boots',5),('slippers',6),('platforms',7),('keekk',8);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `CustomerID` varchar(20) NOT NULL,
  `FirstName` varchar(20) NOT NULL,
  `Address` varchar(50) NOT NULL,
  `CreditCard` int DEFAULT NULL,
  PRIMARY KEY (`CustomerID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES ('12355@gmail.com','esty','jerusalem',NULL),('23423@gmail.com','avi','tel_aviv',NULL),('234567@gmail.com','dan','Arad',NULL),('35345@gmail.com','shany','netania',NULL),('56789@gmail.com','chaim','tzfat',NULL),('96899@gmail.com','manager','m',NULL),('chanale@gmail.com','chanale','no addres',NULL),('dini@gmail.com','dini','no addres',NULL),('efrat@gmail.com','fsfsdfsd','no addres',NULL);
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items` (
  `ItemName` varchar(50) NOT NULL,
  `CodeItem` int NOT NULL AUTO_INCREMENT,
  `CodeCategory` int NOT NULL,
  `Price` float NOT NULL,
  `QuantityItem` int NOT NULL,
  `description` varchar(600) NOT NULL,
  `path` varchar(600) DEFAULT NULL,
  PRIMARY KEY (`CodeItem`),
  KEY `CodeCategory` (`CodeCategory`),
  CONSTRAINT `items_ibfk_1` FOREIGN KEY (`CodeCategory`) REFERENCES `categories` (`CategoryCode`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES ('green_heels',3,1,233,34,'Elegant olive green heels, 10 cm high','http://localhost:3678/9289029fdabb6d0df7efba415ea4c7ee.jpg'),('furry_slippers',4,6,66,100,'Furry and soft slippers in pink','http://localhost:3678/c9074000256032e355e54bc890cd316f.jpg'),('slipy_sneekers',5,3,456,279,'Cool sneakers with colorful laces','http://localhost:3678/773cc8f8-68d2-4de9-9f9b-683521450d5d.__CR0,0,1469,909_PT0_SX970_V1___.jpg'),('booties',6,5,44,96,'Black nail polish boots with a buckle','http://localhost:3678/ab796c74689836c593d3803c0fa66b52.jpg'),('cowboy_boots',7,5,190,7,'Brown cowboy boots with a platform heel','http://localhost:3678/cowboy-boots-2021-lead-1630591061.jpg'),('flat sandals',8,4,55,190,'Silver flat sandals with diamonds','http://localhost:3678/6402a2fa34e98b86c235e8dcc36fd2e5.jpg'),('gold heels',9,1,300,20,'High heels for events in gold','http://localhost:3678/1af3b81de24d1f28514282449a0799a2.jpg'),('black moccasins',10,2,120,230,'Black everyday moccasins with a gold buckle','http://localhost:3678/54607f7cc684267235f47d918a2b5fed.jpg'),('white chunky sandals',11,4,70,82,'Cool and chunky sandals in white','http://localhost:3678/c8e8246e8ca1f8deccd491ec7e4e1912.jpg'),('caramel flat shoes',12,2,55,320,'Flat, breathable caramel shoes for work','http://localhost:3678/437c960e2464b9b691e73f5968f9f294.jpg'),('gray suede sllipers',13,6,220,150,'High-quality gray suede slippers with particularly pleasant fur','http://localhost:3678/1683a4af1eef2e0f02995ab0868680cd.jpg'),('leopard boots',14,5,190,69,'Elegant black and white mottled boots inspired by a cow','http://localhost:3678/bbb3577d725c9b32cf6ddefc4a8492ba.jpg'),('floral sneakers',15,3,260,9,'Stunning sinkers with a floral sole','http://localhost:3678/2d3145ab40a4cd647fda90d5fedb3507.jpg'),('sparkling low heels',16,1,247,59,'High-gloss glittery heels 4 inches high','http://localhost:3678/6f503f5663319589b8a6efbdacde80e7.jpg'),('biblical sandals',17,4,39,70,'Nostalgic and comfortable brown biblical sandals','http://localhost:3678/261a32de60d907bcca52f1b7b028a652.jpg'),('sports shoes',18,3,340,89,'Quality and comfortable sneakers adapted to fitness and hiking','http://localhost:3678/0dad740e5954591f80797676aa6e7d79.jpg'),('leather boots',19,5,380,23,'Knee-length brown leather boots with heel','http://localhost:3678/411b6389930c76e8ff8a81636d39087c.jpg'),('rabbit fur slippers',20,6,64,240,'Furry slippers in the shape of a sweet rabbit','http://localhost:3678/07d99b818d47c4d311e0485b6318c16d.jpg'),('chunky heeled platform',21,7,87,42,'Metallic high heel platform shoes with white laces','http://localhost:3678/94ff59485ce32fb8a46aa190ea7e48d2.jpg'),('purple platforms',22,7,89,33,'high purple platforms','http://localhost:3678/images (2).jpg');
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `itemsincart`
--

DROP TABLE IF EXISTS `itemsincart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `itemsincart` (
  `ItemInCartCode` int NOT NULL AUTO_INCREMENT,
  `CodeItem` int NOT NULL,
  `OrderID` int NOT NULL,
  `Quantity` int NOT NULL,
  PRIMARY KEY (`ItemInCartCode`),
  KEY `CodeItem` (`CodeItem`),
  KEY `itemsincart_ibfk_1_idx` (`OrderID`),
  CONSTRAINT `itemincart_order` FOREIGN KEY (`OrderID`) REFERENCES `orders` (`OrderCode`),
  CONSTRAINT `itemsincart_ibfk_2` FOREIGN KEY (`CodeItem`) REFERENCES `items` (`CodeItem`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `itemsincart`
--

LOCK TABLES `itemsincart` WRITE;
/*!40000 ALTER TABLE `itemsincart` DISABLE KEYS */;
INSERT INTO `itemsincart` VALUES (1,3,1,2),(2,6,1,2),(3,4,1,2),(4,7,2,2),(5,5,3,2),(6,6,4,2),(17,5,5,1);
/*!40000 ALTER TABLE `itemsincart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `OrderCode` int NOT NULL AUTO_INCREMENT,
  `CustomerID` varchar(20) NOT NULL,
  `OrderPrice` float NOT NULL,
  `DateOrder` date NOT NULL,
  `Status` int NOT NULL,
  PRIMARY KEY (`OrderCode`),
  KEY `CustomerID` (`CustomerID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'56789@gmail.com',840,'2022-07-18',0),(2,'12355@gmail.com',190,'2022-06-10',1),(3,'234567@gmail.com',456,'2022-06-12',1),(4,'35345@gmail.com',88,'2022-04-03',2),(5,'23423@gmail.com',598,'2022-02-02',1),(6,'chanale@gmail.com',0,'2022-07-25',0),(7,'96899@gmail.com',0,'2022-06-25',0),(8,'96899@gmail.com',0,'2022-06-25',0),(9,'96899@gmail.com',0,'2022-06-25',0),(10,'dini@gmail.com',0,'2022-07-25',0),(11,'96899@gmail.com',0,'2022-06-25',0);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-26 11:49:12

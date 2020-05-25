-- MySQL dump 10.13  Distrib 8.0.20, for Linux (x86_64)
--
-- Host: localhost    Database: inspirehubdb
-- ------------------------------------------------------
-- Server version	8.0.20-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `admin_id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`admin_id`),
  KEY `FK_f8a889c4362d78f056960ca6dad` (`userId`),
  CONSTRAINT `FK_f8a889c4362d78f056960ca6dad` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telephone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `customer_id` int NOT NULL AUTO_INCREMENT,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`customer_id`),
  KEY `FK_3f62b42ed23958b120c235f74df` (`userId`),
  CONSTRAINT `FK_3f62b42ed23958b120c235f74df` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `amount` float NOT NULL,
  `status` int NOT NULL,
  `customerCustomerId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_39db5324a2b0834d6b4585c872b` (`customerCustomerId`),
  CONSTRAINT `FK_39db5324a2b0834d6b4585c872b` FOREIGN KEY (`customerCustomerId`) REFERENCES `customer` (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_products_product`
--

DROP TABLE IF EXISTS `order_products_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_products_product` (
  `orderId` int NOT NULL,
  `productId` int NOT NULL,
  PRIMARY KEY (`orderId`,`productId`),
  KEY `IDX_d6c66c08b9c7e84a1b657797df` (`productId`),
  KEY `IDX_1f9ea0b0e59e0d98ade4f2d5e9` (`orderId`),
  CONSTRAINT `FK_1f9ea0b0e59e0d98ade4f2d5e99` FOREIGN KEY (`orderId`) REFERENCES `order` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_d6c66c08b9c7e84a1b657797dff` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_products_product`
--

LOCK TABLES `order_products_product` WRITE;
/*!40000 ALTER TABLE `order_products_product` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_products_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `categoryId` int DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `price` float NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_ff0c0301a95e517153df97f6812` (`categoryId`),
  CONSTRAINT `FK_ff0c0301a95e517153df97f6812` FOREIGN KEY (`categoryId`) REFERENCES `product_category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (2,'iAcademy','School software system that aims to solve and tackle issues related to fee management and student registry in a primary school.',1,'2020-05-19 16:45:41.934867','2020-05-19 16:45:41.934867',70000),(3,'iCollege','School software system that aims to solve and tackle issues related to fee management and student registry in a tertiary school.',1,'2020-05-19 16:46:44.320145','2020-05-19 16:46:44.320145',70000),(4,'Retail POS','A point of sale terminal system for the average retail outlet.',2,'2020-05-19 16:48:33.293269','2020-05-19 16:48:33.293269',80000),(5,'Distributor POS','A point of sale terminal system for wholesale buisinesses as well as distributor and product supply industries',2,'2020-05-19 16:49:38.322980','2020-05-19 16:49:38.322980',100000),(6,'Club POS','A point of sale terminal system for clubs and businesses with an alignment to recreation services',2,'2020-05-19 16:54:23.550374','2020-05-19 16:54:23.550374',80000),(7,'Ujumbe','A bulk sms solution for every business. Includes a package that is both favourable and affordable as well as suitable for any business',3,'2020-05-19 16:55:36.620515','2020-05-19 16:55:36.620515',10500),(8,'Basic Hosting','A hosting service solution for small size websites',4,'2020-05-19 16:56:56.339060','2020-05-19 16:56:56.339060',0),(9,'Silver Hosting','Our featured hosting service suitable for the modern average website. The resources allocated in our servers will ensure reliable as well as affordable web hosting',4,'2020-05-19 16:58:22.518697','2020-05-19 16:58:22.518697',2500),(10,'Gold Hosting','This is as close as one could get to dedicated hosting services. This plan includes 99.99% uptime, as well as unlimited bandwidth and storage just to name a few. It is suitable for the hosting of modern web applications as well as small size mobile applications',4,'2020-05-19 17:00:01.800000','2020-05-19 17:00:01.800000',8000);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_category`
--

DROP TABLE IF EXISTS `product_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_category`
--

LOCK TABLES `product_category` WRITE;
/*!40000 ALTER TABLE `product_category` DISABLE KEYS */;
INSERT INTO `product_category` VALUES (1,'school software solutions','Software solutions geared towards effective running and management of a school. The software are further classified according to the school size and type. For instance Primary Schools, Secondary Schools as well as Tertiary Institutions','2020-05-19 16:22:32.963185','2020-05-19 16:22:33.581813'),(2,'business software solutions','every business needs software for effective and accurate processing of data from various departments of the enterprise such as accounting, finance, sales and marketing. We have a wide range of products that make this a reality.','2020-05-19 16:22:32.963185','2020-05-19 16:22:33.581813'),(3,'bulk sms solutions','Businesses and institutions today need to communicate with the customers on a frequent basis so as to get customer feedback regarding the goods or services that they offer. Our premium sms solutions make sure that you communicate with your users and clients via ussd and sms channels.','2020-05-19 16:22:32.963185','2020-05-19 16:22:33.581813'),(4,'web hosting services','Whether you are a startup or an established business, our web hosting services ensure that your website has maximum uptime as well as security and ease of access. The various packages available ensure that no matter the size of your web hosting needs, we have got you covered.','2020-05-19 16:22:32.963185','2020-05-19 16:22:33.581813'),(5,'web domains','We have partnered with various institions to provide you with domain name registration as well as renewal services. Whether your are wishing to expand your business to the world of digital and ecommerce, we ensure that your brand is seen and recognized online.','2020-05-19 16:22:32.963185','2020-05-19 16:22:33.581813');
/*!40000 ALTER TABLE `product_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'administrator'),(2,'customer'),(3,'reseller');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `emailAddress` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roleId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_c28e52f758e7bbc53828db92194` (`roleId`),
  CONSTRAINT `FK_c28e52f758e7bbc53828db92194` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Admin','User','Developer@123','admin@inspirehub.co.ke',1),(2,'Sean','Baraka','Developer@123','admin@inspirehub.co.ke',NULL),(3,'Sean','Baraka','Developer@123','admin@inspirehub.co.ke',NULL),(4,'Sean','Baraka','Developer@123','admin@inspirehub.co.ke',NULL),(5,'Sean','Baraka','Developer@123','admin@inspirehub.co.ke',NULL),(6,'Sean','Baraka','Developer@123','admin@inspirehub.co.ke',NULL),(7,'sean','baraka','sean@inspirehub.co.ke','sean@inspirehub.co.ke',NULL);
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

-- Dump completed on 2020-05-25 13:19:55

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
  `cust_id` int NOT NULL AUTO_INCREMENT,
  `address` varchar(255) NOT NULL,
  `telephone` varchar(255) NOT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`cust_id`),
  KEY `FK_3f62b42ed23958b120c235f74df` (`userId`),
  CONSTRAINT `FK_3f62b42ed23958b120c235f74df` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'MACHAKOS','07123456',1),(2,'Machakos','0724111111',2),(3,'Machakos','0715653981',3),(4,'Machakos','0724111111',4),(5,'Machakos','0719192207',5),(6,'MACHAKOS','0716613981',6),(7,'MACHAKOS','0728052020',7),(8,'MACHAKOS','0728052020',8),(9,'MACHAKOS','0728052020',9),(10,'MACHAKOS','0728052020',10),(11,'MACHAKOS','0728052020',11),(12,'kitui','0728052020',12),(13,'MACHAKOS','0728052020',13),(14,'MACHAKOS','0728052020',14),(15,'machakos','0713232453',15),(16,'MACHAKOS','0728052020',16),(17,'MACHAKOS','0728052020',17),(18,'MACHAKOS','0730052020',18),(19,'MACHAKOS','0730052020',19),(20,'MACHAKOS','0730052020',20),(21,'MACHAKOS','0730052020',21),(22,'MACHAKOS','0730052020',22),(23,'Machakos','0720202020',23),(24,'Machakos','0715161514',24),(25,'Machakos','0719202122',25),(26,'Machakos','0719202122',26),(27,'Machakos','0710101010',27),(28,'MACHAKOS','0738820456',28),(29,'Machakos','0710101010',29),(30,'Machakos','0712321234',30),(31,'Machakos','0723456789',31),(32,'Machakos','0123456',32),(33,'Machakos','072345677',33),(34,'Nairobi','0202112345',34),(35,'Where','1234567',35),(36,'machakos','071234567',36),(37,'Limuru','0712345678',37),(38,'Machakos','0712345671',38);
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoice`
--

DROP TABLE IF EXISTS `invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invoice` (
  `id` int NOT NULL AUTO_INCREMENT,
  `number` varchar(255) NOT NULL,
  `orderId` int DEFAULT NULL,
  `date` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `duedate` datetime NOT NULL,
  `status` int NOT NULL DEFAULT '0',
  `balance` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_f494ce6746b91e9ec9562af4857` (`orderId`),
  CONSTRAINT `FK_f494ce6746b91e9ec9562af4857` FOREIGN KEY (`orderId`) REFERENCES `order_detail` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoice`
--

LOCK TABLES `invoice` WRITE;
/*!40000 ALTER TABLE `invoice` DISABLE KEYS */;
INSERT INTO `invoice` VALUES (2,'INV30411',23,'2020-05-30 14:43:11.871253','2020-06-29 14:43:12',2,15000),(3,'INV30426',24,'2020-05-30 14:54:26.147664','2020-06-29 14:54:26',2,58000),(5,'INV30434',26,'2020-05-30 16:42:34.931568','2020-06-29 16:42:35',2,29000),(6,'INV30458',27,'2020-05-30 17:18:58.646524','2020-06-29 17:18:59',2,40000),(7,'INV3045',28,'2020-05-30 17:29:05.930577','2020-06-29 17:29:06',1,0),(8,'INV30441',29,'2020-05-30 17:43:41.084449','2020-06-29 17:43:41',2,58048);
/*!40000 ALTER TABLE `invoice` ENABLE KEYS */;
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
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `amount` float NOT NULL,
  `customerId` int DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  PRIMARY KEY (`id`),
  KEY `FK_124456e637cca7a415897dce659` (`customerId`),
  CONSTRAINT `FK_124456e637cca7a415897dce659` FOREIGN KEY (`customerId`) REFERENCES `customer` (`cust_id`)
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
-- Table structure for table `order_detail`
--

DROP TABLE IF EXISTS `order_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_detail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `amount` float NOT NULL,
  `customerCustId` int DEFAULT NULL,
  `orderNumber` varchar(255) NOT NULL,
  `status` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `FK_5da1f960b4acd2c160f16e959cb` (`customerCustId`),
  CONSTRAINT `FK_5da1f960b4acd2c160f16e959cb` FOREIGN KEY (`customerCustId`) REFERENCES `customer` (`cust_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_detail`
--

LOCK TABLES `order_detail` WRITE;
/*!40000 ALTER TABLE `order_detail` DISABLE KEYS */;
INSERT INTO `order_detail` VALUES (1,'2020-05-25 14:27:33.219943','2020-05-25 14:27:33.219943',80000,1,'',0),(3,'2020-05-25 19:41:30.257510','2020-05-25 19:41:30.257510',90000,3,'',0),(4,'2020-05-26 10:05:55.073813','2020-05-26 10:05:55.073813',90000,4,'',0),(5,'2020-05-26 11:11:08.619178','2020-05-26 11:11:08.619178',90000,5,'',0),(7,'2020-05-28 12:28:06.469328','2020-05-28 12:28:06.469328',80000,7,'',0),(8,'2020-05-28 12:31:04.045193','2020-05-28 12:31:04.045193',90000,8,'',0),(9,'2020-05-28 12:38:47.320892','2020-05-28 12:38:47.320892',80000,9,'',0),(10,'2020-05-28 12:41:19.867349','2020-05-28 12:41:19.867349',80000,10,'',0),(11,'2020-05-28 12:45:27.204053','2020-05-28 12:45:27.204053',80000,11,'',0),(12,'2020-05-28 12:48:22.289486','2020-05-28 12:48:22.289486',10000,12,'',0),(13,'2020-05-28 12:52:37.923339','2020-05-28 12:52:37.923339',80000,13,'',0),(14,'2020-05-28 14:59:56.580588','2020-05-28 14:59:56.580588',220000,14,'',0),(17,'2020-05-28 16:47:07.473720','2020-05-28 16:47:07.473720',45000,17,'#ON2847',0),(18,'2020-05-30 14:12:52.591263','2020-05-30 14:12:52.591263',70000,18,'#ON30451',0),(19,'2020-05-30 14:19:13.542484','2020-05-30 14:19:13.542484',70000,19,'#ON30413',0),(20,'2020-05-30 14:26:52.823919','2020-05-30 14:26:52.823919',45000,20,'#ON30452',0),(21,'2020-05-30 14:36:02.823773','2020-05-30 14:36:02.823773',80000,21,'#ON3042',0),(22,'2020-05-30 14:40:29.549325','2020-05-30 14:40:29.549325',80000,22,'#ON30429',0),(23,'2020-05-30 14:43:11.727439','2020-05-30 14:43:11.727439',80000,23,'#ON30411',0),(24,'2020-05-30 14:54:25.986178','2020-05-30 14:54:25.986178',170000,24,'#ON30425',0),(25,'2020-05-30 14:57:29.018295','2020-05-30 14:57:29.018295',90000,25,'#ON30428',0),(26,'2020-05-30 16:42:34.789425','2020-05-30 16:42:34.789425',80000,26,'#ON30434',0),(27,'2020-05-30 17:18:58.547526','2020-05-30 17:18:58.547526',90000,27,'#ON30458',0),(28,'2020-05-30 17:29:05.821069','2020-05-30 17:29:05.821069',70000,28,'#ON3045',0),(29,'2020-05-30 17:43:40.930437','2020-05-30 17:43:40.930437',265000,29,'#ON30440',0);
/*!40000 ALTER TABLE `order_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_detail_product_product`
--

DROP TABLE IF EXISTS `order_detail_product_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_detail_product_product` (
  `orderDetailId` int NOT NULL,
  `productId` int NOT NULL,
  PRIMARY KEY (`orderDetailId`,`productId`),
  KEY `IDX_eb69c1ddce45940605ce24a5ac` (`orderDetailId`),
  KEY `IDX_99b0ef4a3a0a71ac38ab3e0023` (`productId`),
  CONSTRAINT `FK_99b0ef4a3a0a71ac38ab3e00238` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_eb69c1ddce45940605ce24a5ac3` FOREIGN KEY (`orderDetailId`) REFERENCES `order_detail` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_detail_product_product`
--

LOCK TABLES `order_detail_product_product` WRITE;
/*!40000 ALTER TABLE `order_detail_product_product` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_detail_product_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_detail_products_product`
--

DROP TABLE IF EXISTS `order_detail_products_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_detail_products_product` (
  `orderDetailId` int NOT NULL,
  `productId` int NOT NULL,
  PRIMARY KEY (`orderDetailId`,`productId`),
  KEY `IDX_ba400383a42d98a45c92d51277` (`orderDetailId`),
  KEY `IDX_93f8c696735d93f11b7f210bf0` (`productId`),
  CONSTRAINT `FK_93f8c696735d93f11b7f210bf09` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_ba400383a42d98a45c92d512771` FOREIGN KEY (`orderDetailId`) REFERENCES `order_detail` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_detail_products_product`
--

LOCK TABLES `order_detail_products_product` WRITE;
/*!40000 ALTER TABLE `order_detail_products_product` DISABLE KEYS */;
INSERT INTO `order_detail_products_product` VALUES (1,4),(3,6),(3,7),(4,5),(4,6),(5,5),(5,6),(7,5),(8,5),(8,6),(9,7),(10,5),(11,7),(12,6),(13,7),(14,5),(14,8),(14,9),(17,10),(18,8),(19,8),(20,10),(21,5),(22,7),(23,5),(24,5),(24,6),(24,7),(25,5),(25,6),(26,5),(27,5),(27,6),(28,8),(29,5),(29,8),(29,9),(29,10);
/*!40000 ALTER TABLE `order_detail_products_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `balance` int NOT NULL,
  `invoiceId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_87223c7f1d4c2ca51cf69927844` (`invoiceId`),
  CONSTRAINT `FK_87223c7f1d4c2ca51cf69927844` FOREIGN KEY (`invoiceId`) REFERENCES `invoice` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (1,'2020-07-20 17:51:02.188868','2020-07-20 17:51:02.188868',0,7),(2,'2020-07-20 17:52:01.509249','2020-07-20 17:52:01.509249',65000,8);
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `price` float NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `categoryId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_ff0c0301a95e517153df97f6812` (`categoryId`),
  CONSTRAINT `FK_ff0c0301a95e517153df97f6812` FOREIGN KEY (`categoryId`) REFERENCES `product_category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Gold Hosting','This is as close as one could get to dedicated hosting services. This plan includes 99.99% uptime, as well as unlimited bandwidth and storage just to name a few. It is suitable for the hosting of modern web applications as well as small size mobile applications',8000,'2020-05-25 13:57:00.651638','2020-05-25 13:57:00.651638',4),(2,'Silver Hosting','Our featured hosting service suitable for the modern average website. The resources allocated in our servers will ensure reliable as well as affordable web hosting',2500,'2020-05-25 13:57:11.922727','2020-05-25 13:57:11.922727',4),(3,'Basic Hosting','A hosting service solution for small size websites',0,'2020-05-25 13:57:20.554324','2020-05-25 13:57:20.554324',4),(4,'Ujumbe','A bulk sms solution for every business. Includes a package that is both favourable and affordable as well as suitable for any business',10500,'2020-05-25 13:57:29.789267','2020-05-25 13:57:29.789267',3),(5,'Club POS','A point of sale terminal system for clubs and businesses with an alignment to recreation services',80000,'2020-05-25 13:57:40.699346','2020-05-25 13:57:40.699346',2),(6,'Distributor POS','A point of sale terminal system for wholesale buisinesses as well as distributor and product supply industries',10000,'2020-05-25 13:58:24.488691','2020-05-25 13:58:24.488691',2),(7,'Retail POS','A point of sale terminal system for the average retail outlet.',80000,'2020-05-25 13:58:32.485876','2020-05-25 13:58:32.485876',2),(8,'iCollege','School software system that aims to solve and tackle issues related to fee management and student registry in a tertiary school.',70000,'2020-05-25 13:58:50.615401','2020-05-25 13:58:50.615401',1),(9,'my-tenant','a software solution tailored for the real estate industry. Caters for tenant record keeping as well as rent payments and reminders',70000,'2020-05-28 13:59:19.469750','2020-05-28 13:59:19.469750',6),(10,'iDiary','a software solution for diary farmers for keeping milk sales record',45000,'2020-05-28 14:20:33.761865','2020-05-28 14:20:33.761865',7),(11,'iAcademy','Student registry system for primary schools. Comes with an inbuilt exam management system',50000,'2020-06-20 00:29:44.014983','2020-06-20 00:29:44.014983',2),(12,'iAcademy','school software solution for primary schools.',50000,'2020-06-20 00:31:50.604482','2020-06-20 00:31:50.604482',1),(13,'.co.ke ','domain name extension for all businesses based in kenya',500,'2020-06-20 00:48:14.401680','2020-06-20 00:48:14.401680',5),(14,'Ujumbe Premium','Ujumbe premium service is an advanced bulk sms solution for all businesses and corp-orates dealing with large masses of people',20000,'2020-06-20 00:54:08.007597','2020-06-20 00:54:08.007597',3),(15,'dddde','hhhh',10000,'2020-06-23 17:37:24.098267','2020-06-23 17:37:24.098267',1),(16,'eeee','rrrr',20000,'2020-06-23 17:38:07.460202','2020-06-23 17:38:07.460202',1);
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
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_category`
--

LOCK TABLES `product_category` WRITE;
/*!40000 ALTER TABLE `product_category` DISABLE KEYS */;
INSERT INTO `product_category` VALUES (1,'school software solutions','Software solutions geared towards effective running and management of a school. The software are further classified according to the school size and type. For instance Primary Schools, Secondary Schools as well as Tertiary Institutions','2020-05-19 16:22:32.963185','2020-05-19 16:22:33.581813'),(2,'business software solutions','every business needs software for effective and accurate processing of data from various departments of the enterprise such as accounting, finance, sales and marketing. We have a wide range of products that make this a reality.','2020-05-19 16:22:32.963185','2020-05-19 16:22:33.581813'),(3,'bulk sms solutions','Businesses and institutions today need to communicate with the customers on a frequent basis so as to get customer feedback regarding the goods or services that they offer. Our premium sms solutions make sure that you communicate with your users and clients via ussd and sms channels.','2020-05-19 16:22:32.963185','2020-05-19 16:22:33.581813'),(4,'web hosting services','Whether you are a startup or an established business, our web hosting services ensure that your website has maximum uptime as well as security and ease of access. The various packages available ensure that no matter the size of your web hosting needs, we have got you covered.','2020-05-19 16:22:32.963185','2020-05-19 16:22:33.581813'),(5,'web domains','We have partnered with various institions to provide you with domain name registration as well as renewal services. Whether your are wishing to expand your business to the world of digital and ecommerce, we ensure that your brand is seen and recognized online.','2020-05-19 16:22:32.963185','2020-05-19 16:22:33.581813'),(6,'real-estate software solution','a software solution tailored for appartment owners as well as those in the real-estate business at large.','2020-05-28 13:56:08.349251','2020-05-28 13:56:08.349251'),(7,'farming software solution','a software solution for the small scale, average and large scale farmer. Will cater for inventory as well financial record keeping','2020-05-28 14:18:04.471260','2020-05-28 14:18:04.471260');
/*!40000 ALTER TABLE `product_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quotation`
--

DROP TABLE IF EXISTS `quotation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quotation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `number` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `customerCustId` int DEFAULT NULL,
  `amount` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_2769101b4aa9e97a41c283c3644` (`customerCustId`),
  CONSTRAINT `FK_2769101b4aa9e97a41c283c3644` FOREIGN KEY (`customerCustId`) REFERENCES `customer` (`cust_id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quotation`
--

LOCK TABLES `quotation` WRITE;
/*!40000 ALTER TABLE `quotation` DISABLE KEYS */;
INSERT INTO `quotation` VALUES (9,'2020-06-16 18:03:57.156982','2020-06-16 18:03:57.156982','QT1535716','Point of sale system',6,93000),(10,'2020-06-16 22:00:30.804448','2020-06-16 22:00:30.804448','QT8003016','Quotation Sample ten',26,45000),(22,'2020-06-16 22:57:05.816991','2020-06-16 22:57:05.816991','QT814516','School Software Package',26,72500),(30,'2020-06-19 12:32:53.137942','2020-06-19 12:32:53.137942','QT1355319','Quotation ya music software',38,10500),(35,'2020-07-21 16:52:15.259085','2020-07-21 16:52:15.259085','QT2571521','Some quotation here',6,80000),(37,'2020-07-23 12:30:37.174580','2020-07-23 12:30:37.174580','QT393723','Pos Web hosting',25,88000),(39,'2020-07-23 12:31:40.296103','2020-07-23 12:31:40.296103','QT2944023','J',28,80000),(41,'2020-07-23 12:39:23.286944','2020-07-23 12:39:23.286944','QT2842323','Some quotation here',38,20000),(43,'2020-07-23 12:43:04.247899','2020-07-23 12:43:04.247899','QT245423','Trial Quotation',5,80000),(45,'2020-07-23 12:44:41.046257','2020-07-23 12:44:41.046257','QT434123','Some quotation here',6,80000),(47,'2020-07-23 12:47:08.764954','2020-07-23 12:47:08.764954','QT761823','Some quotation here',37,80000),(48,'2020-07-23 12:48:12.214824','2020-07-23 12:48:12.214824','QT2101223','Another Some quotation here',31,0),(50,'2020-07-23 12:50:33.248599','2020-07-23 12:50:33.248599','QT2473323','Some quotation here',36,80000);
/*!40000 ALTER TABLE `quotation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quotation_products_product`
--

DROP TABLE IF EXISTS `quotation_products_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quotation_products_product` (
  `quotationId` int NOT NULL,
  `productId` int NOT NULL,
  PRIMARY KEY (`quotationId`,`productId`),
  KEY `IDX_ac5493729de1cb41e4118d8673` (`quotationId`),
  KEY `IDX_21cc041b9d7dab198b1262e240` (`productId`),
  CONSTRAINT `FK_21cc041b9d7dab198b1262e2404` FOREIGN KEY (`productId`) REFERENCES `product` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_ac5493729de1cb41e4118d86731` FOREIGN KEY (`quotationId`) REFERENCES `quotation` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quotation_products_product`
--

LOCK TABLES `quotation_products_product` WRITE;
/*!40000 ALTER TABLE `quotation_products_product` DISABLE KEYS */;
INSERT INTO `quotation_products_product` VALUES (9,2),(9,4),(9,7),(10,3),(10,10),(22,2),(22,8),(30,4),(35,7),(37,1),(37,5),(39,7),(41,16),(43,5),(45,5),(47,7),(48,3),(50,7);
/*!40000 ALTER TABLE `quotation_products_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
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
-- Table structure for table `statement`
--

DROP TABLE IF EXISTS `statement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `statement` (
  `id` int NOT NULL AUTO_INCREMENT,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `refNumber` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `debit` int NOT NULL DEFAULT '0',
  `credit` int NOT NULL DEFAULT '0',
  `balance` int NOT NULL,
  `customerCustId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_b780701d7e9ce7c4216422669e0` (`customerCustId`),
  CONSTRAINT `FK_b780701d7e9ce7c4216422669e0` FOREIGN KEY (`customerCustId`) REFERENCES `customer` (`cust_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `statement`
--

LOCK TABLES `statement` WRITE;
/*!40000 ALTER TABLE `statement` DISABLE KEYS */;
INSERT INTO `statement` VALUES (1,'2020-07-21 17:42:00.963122','2020-07-21 17:42:00.963122','INV30441','Payment - cash20INV30441',0,100,94048,29),(2,'2020-07-21 17:42:54.246871','2020-07-21 17:42:54.246871','INV30429','Payment - cash20INV30429',0,40000,20000,22),(3,'2020-07-21 17:44:08.669785','2020-07-21 17:44:08.669785','INV30411','Payment - cash20INV30411',0,50000,30000,23),(4,'2020-07-21 17:44:41.432232','2020-07-21 17:44:41.432232','INV30426','Payment - mpesa- qjwe43jdj4 20INV30426',0,100000,70000,24),(5,'2020-07-21 17:44:55.838026','2020-07-21 17:44:55.838026','INV30429','Payment - cash20INV30429',0,90000,-70000,22),(6,'2020-07-21 17:48:44.402268','2020-07-21 17:48:44.402268','INV30429','Payment - cash20INV30429',0,10000,-80000,22),(7,'2020-07-21 17:55:39.943008','2020-07-21 17:55:39.943008','INV3045','Payment - mpesa- qwe2345gt6 20INV3045',0,70000,0,28),(8,'2020-07-21 17:57:54.671197','2020-07-21 17:57:54.671197','INV30434','Payment - cash20INV30434',0,50000,29700,26),(9,'2020-07-21 17:58:14.496938','2020-07-21 17:58:14.496938','INV30458','Payment - cash20INV30458',0,40000,50000,27),(10,'2020-07-21 18:09:32.017386','2020-07-21 18:09:32.017386','INV30434','Payment - mpesa- q4e123456y 20INV30434',0,700,29000,26),(11,'2020-07-23 09:41:13.346069','2020-07-23 09:41:13.346069','INV30411','Payment - cash20INV30411',0,15000,15000,23),(12,'2020-07-23 10:38:22.181711','2020-07-23 10:38:22.181711','INV30426','Payment - cash20INV30426',0,12000,58000,24),(13,'2020-07-23 16:48:36.187090','2020-07-23 16:48:36.187090','INV30458','Payment - mpesa- qj3wedj4kj 20INV30458',0,10000,40000,27),(14,'2020-07-23 16:51:20.839834','2020-07-23 16:51:20.839834','INV30441','Payment - mpesa- QWEKJ2J3KJ',0,20000,74048,29),(15,'2020-07-23 16:52:01.504847','2020-07-23 16:52:01.504847','INV30441','Payment - cash20INV30441',0,16000,58048,29);
/*!40000 ALTER TABLE `statement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction` (
  `id` int NOT NULL AUTO_INCREMENT,
  `refNumber` varchar(255) NOT NULL,
  `modeOfPayment` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `amountPaid` int NOT NULL,
  `invoiceId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_17b930b7e4c1e8175fcb5ebca4b` (`invoiceId`),
  CONSTRAINT `FK_17b930b7e4c1e8175fcb5ebca4b` FOREIGN KEY (`invoiceId`) REFERENCES `invoice` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
INSERT INTO `transaction` VALUES (1,'cashundefined','cash','2020-07-20 18:10:33.017252',300,5),(3,'cash20undefined','cash','2020-07-21 16:52:45.690835',1000,8),(4,'cash20undefined','cash','2020-07-21 16:58:33.946809',800,8),(5,'cash20INV30441','cash','2020-07-21 17:08:23.726738',800,8),(6,'cash20INV30441','cash','2020-07-21 17:11:01.600740',1000,8),(7,'cash20INV30441','cash','2020-07-21 17:13:42.834027',1000,8),(8,'cash20INV30441','cash','2020-07-21 17:14:32.881061',1000,8),(9,'cash20INV30441','cash','2020-07-21 17:15:17.422561',1000,8),(10,'cash20INV30441','cash','2020-07-21 17:15:57.055521',1000,8),(11,'cash20INV30441','cash','2020-07-21 17:16:40.268298',50,8),(12,'cash20INV30441','cash','2020-07-21 17:20:46.867560',1001,8),(13,'cash20INV30441','cash','2020-07-21 17:21:21.801564',102,8),(14,'cash20INV30441','cash','2020-07-21 17:21:56.314886',103,8),(15,'cash20INV30441','cash','2020-07-21 17:22:50.438995',104,8),(16,'cash20INV30441','cash','2020-07-21 17:26:44.440098',50000,8),(17,'cash20INV30441','cash','2020-07-21 17:27:43.818042',100000,8),(18,'cash20INV30441','cash','2020-07-21 17:29:38.132914',80,8),(19,'cash20INV30441','cash','2020-07-21 17:31:04.011058',301,8),(20,'cash20INV30441','cash','2020-07-21 17:32:09.885094',10500,8),(21,'cash20INV30441','cash','2020-07-21 17:35:34.908908',500,8),(22,'cash20INV30441','cash','2020-07-21 17:36:30.618107',501,8),(23,'cash20INV30441','cash','2020-07-21 17:37:53.719643',10,8),(24,'cash20INV30441','cash','2020-07-21 17:42:00.497588',100,8),(26,'cash20INV30411','cash','2020-07-21 17:44:08.374730',50000,2),(27,'mpesa- qjwe43jdj4 20INV30426','mpesa','2020-07-21 17:44:41.119677',100000,3),(30,'mpesa- qwe2345gt6 20INV3045','mpesa','2020-07-21 17:55:39.456741',70000,7),(31,'cash20INV30434','cash','2020-07-21 17:57:54.341519',50000,5),(32,'cash20INV30458','cash','2020-07-21 17:58:14.016437',40000,6),(33,'mpesa- q4e123456y 20INV30434','mpesa','2020-07-21 18:09:31.795243',700,5),(34,'cash20INV30411','cash','2020-07-23 09:41:12.769333',15000,2),(35,'cash20INV30426','cash','2020-07-23 10:38:21.667451',12000,3),(36,'mpesa- qj3wedj4kj 20INV30458','mpesa','2020-07-23 16:48:35.038971',10000,6),(37,'mpesa- QWEKJ2J3KJ','mpesa','2020-07-23 16:51:20.334896',20000,8),(38,'cash20INV30441','cash','2020-07-23 16:52:00.929626',16000,8);
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `emailAddress` varchar(255) NOT NULL,
  `roleId` int DEFAULT NULL,
  `salt` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  KEY `FK_c28e52f758e7bbc53828db92194` (`roleId`),
  CONSTRAINT `FK_c28e52f758e7bbc53828db92194` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Sean','Baraka','12345678','sean@mail.com',NULL,'','2020-06-05 17:07:00.660476','2020-06-05 17:07:01.267102'),(2,'Sean','Baraka','1746c4f39cfd01866232335ba2c3ea9a3c3324d498f0881cd31ea625469baa17adadbb058c32894f1616bb905d1f92fcc82eb777414d2a7a75271e6c4fdbb746','seanbaraka@gmail.com',NULL,'82c37a11b048cca8eedd5e69b7be59c4','2020-06-05 17:07:00.660476','2020-06-05 17:07:01.267102'),(3,'Mule','Kitavi','1746c4f39cfd01866232335ba2c3ea9a3c3324d498f0881cd31ea625469baa17adadbb058c32894f1616bb905d1f92fcc82eb777414d2a7a75271e6c4fdbb746','kitavi.kitavi@gmail.com',NULL,'82c37a11b048cca8eedd5e69b7be59c4','2020-06-05 17:07:00.660476','2020-06-05 17:07:01.267102'),(4,'Benjamin','Kitonga','b801273def033b6d029e949e74532ad639a3d95c2654417e93cf787c2471a46be979cfa72bc7d2aafa1f5ba5620b555f3cb81153e8ebc22e302126bf2a9ee7c3','benja@inspirehub.co.ke',2,'7e45f297b3ebb1010d667a4b5fdad3e8','2020-06-05 17:07:00.660476','2020-06-05 17:07:01.267102'),(5,'Kitavi','Dan','21d46ca5e33735ecdd783943e7807d1fcec9cb93c4d1a73000eb4b161c60b7ac7dcb5884bc8ffa365023b29d78dbdcb40783a6add8a3840bbc1278124063cd51','kitavi@inspirehub.co.ke',2,'cb3ff2ffbd65a9b153f853501caf9460','2020-06-05 17:07:00.660476','2020-06-05 17:07:01.267102'),(6,'Dennis','Kitonga','b1dac11e47ae786a8831ee4c4db696784e6dfbfae7e8ed379fb793e7b767a406db1e033aa902932bf4340c8681a6bd36a3681d3ec12e06ed54002b9c7bea12d5','kitongabenja34@gmail.com',2,'9b1d7b736a924f7fd644d0d9e672b7ef','2020-06-05 17:07:00.660476','2020-06-05 17:07:01.267102'),(7,'Emma','kitonga','65b3c28ef6517d485100aa503ee3f5486c1af7afabf54c6205e10ccd24bb01a222f8db437097383cc1f7f444edac40c48e06fc048902ad581e69b6ef9dc9c88d','benja12@gmail.com',2,'4cd66d35bc210bce8b65468ffc9f1b13','2020-06-05 17:07:00.660476','2020-06-05 17:07:01.267102'),(8,'John ','mumo','0718f965d3e19cccb15c94bd766b0bb7cf149d58270ae1a02644630082c8a0f09089c1085b55dd1140ed8bf1d8732d08ee4f843717d898c37c9cbb8d4a3cd5a5','john12@gmail.com',2,'584df9d0e0c82b45822d74d6568cfd01','2020-06-05 17:07:00.660476','2020-06-05 17:07:01.267102'),(9,'Sila','Ps','0fa54cc76bf212d9e5591da2016fd76e8db16783947323c8ac83349f7de6259a208a5b5854cc3e58edfc8761529fc5096f7844f2bcd7797b3d676bfaf81705f0','Sila12@gmail.com',2,'ed4e9e483e47a180000d2ad278b42537','2020-06-05 17:07:00.660476','2020-06-05 17:07:01.267102'),(10,'James ','Mutunga','73e68f992e58d97393a73e00e2fa03567c0db926b1941d75fb6ca685519a18a4ea12a4ec665d5369fe6affefdd8539907f7ef93deaa45c625a6ee0084791ce68','james12@gmail.com',2,'4476821ba47df9dfeaacaceca024a1ec','2020-06-05 17:07:00.660476','2020-06-05 17:07:01.267102'),(11,'Timo','Timothy','3e92ce352d33059c0cd86624a8556001dc9e7ff23a8ed9f16db2e6914b850e44c506e83da9eed35a10f97dc21593137160322efdde3335dc0b9d428af8a381b6','Timo12@gmail.com',2,'eb75d5a07dc17330c31b694257eaa61a','2020-06-05 17:07:00.660476','2020-06-05 17:07:01.267102'),(12,'Erick ','Leo','c2b50345c6474d08ec9375744028be96e9e91ad8b99385b74d7de3a0b5e0508324f8232ffaecb772c148d25bd7a44dd9de5b7de4365e7a8e1b68e3c6e852254e','erick12@gmail.com',2,'591215d0d30912a1365f02da989b083b','2020-06-05 17:07:00.660476','2020-06-05 17:07:01.267102'),(13,'Dancan','Maingi','24979e9a685b8f17cd5da3e89c733d7c33dbd3ab41d1e7fb624d23f1fa28b391caf4e2dd82860dc27dc4cf3b0d28574364c15b8018b1223459275a18afb5df68','dancan12@gmail.com',2,'9b1e99b4f4e32159fae5dde340f816bf','2020-06-05 17:07:00.660476','2020-06-05 17:07:01.267102'),(14,'Mato','MasterMind','bb971323d99ebb397d97466a693eb324f6aa1fa96ad02ded8f47eabf400646a505bf3ee0141c2308a61321fa336ff29961de36de0c090a7b9cc94756aa76c438','Mato12@gmail.com',2,'e9e8446f3d607adbd283eb65ab64e930','2020-06-05 17:07:00.660476','2020-06-05 17:07:01.267102'),(15,'Dan','maingi','31336827f51d423a371da7b815284c187e81e99431219702998765942dae6f2b3af5669d119779e80c26bb3bc510140243b4c9b632ceca6e5345e111880fe3c9','maingi.maingi94@gmail.com',2,'1e873a6b0a17c293c2524a98561bbd3c','2020-06-05 17:07:00.660476','2020-06-05 17:07:01.267102'),(16,'Mumba ','Musyoki','272e5cbf565a8b0580ba6dd82d30fcd2530176e7bbfcd9c528ac82facfad6dd5333848b7730bd81567488ed6e057edbe5fbff6bf1001d2473380ede6a6e87a7f','mumba12@gmail.com',2,'adf13dfcf96fbd7e9cd53f6c6f13e3fa','2020-06-05 17:07:00.660476','2020-06-05 17:07:01.267102'),(17,'Joyce ','Mwikali','477c2cc7634c8601b4d97d2a4109db15fe9eafeb79672368096550f816b3349ef48f238d1abac2682f9fff7331f1f5488cd2ec1a24053a4ab380133b63de6255','joyce12@gmail.com',2,'e7eb2dbd1465f95638c227b4887298f5','2020-06-05 17:07:00.660476','2020-06-05 17:07:01.267102'),(18,'MAGIX ','ENGA','cde73520749ff45aa0d5f7a348e94efa594bb1588dc11cb86b5ed0cdd73037e06efd9f397c7d4f34a8bec7588abca08e99b3fc5b437f904193843ea70fc8abf7','magixenga12@gmail.com',2,'3fc2cfe69ed470ba75c94586538a798a','2020-06-05 17:07:00.660476','2020-06-05 17:07:01.267102'),(19,'MAGIX','ENGA','e88066ffd1b037b2848f8cff5e200751b4cd30901054774d23f081887259e270d17874dde7401dc359581cefd1ee68f5a114cbb14e696b4953aa73a4d9f8389b','magixenga12@gmail.com',2,'d504c58b85f06dd9cf8cd05d7a3c0a7f','2020-06-05 17:07:00.660476','2020-06-05 17:07:01.267102'),(20,'MAGIX','ENGA','03a2a8ba88e381aaf68638cfc2538e0e7d8f2513a2ff0e3dc2ec8c51985d9e2057b8f4c06aceedb444ddeb39f620560087c6323353d94c65cd36e7e3a3dd1e49','magixenga12@gmail.com',2,'07400f0fa6cfdc08cef17d7c9612acad','2020-06-05 17:07:00.660476','2020-06-05 17:07:01.267102'),(21,'MAGIX','ENGA','0363e4c0c0f3e672db2dd953d090105e581547f5bd3ea12e03d3204231ab213663ed9ec1ad426c56c90a4e99f2af31790a662316fa71b96b958f29695c59e2ef','magixenga12@gmail.com',2,'bdb2bfd5c1951688a9d15535e80b68a3','2020-06-05 17:07:00.660476','2020-06-05 17:07:01.267102'),(22,'MAGIX','ENGA','cbf88cb56d352c3d7c1221c1453a14f30423714f30c4df5af103c24bff6d4484997d92ff10559fcc98ad1d88130c1b48adc33f86d07cbb0993c8a521d0cc6064','magixenga12@gmail.com',2,'d5b6d8b75e2d2925e4bf22ad9ca31118','2020-06-05 17:07:00.660476','2020-06-05 17:07:01.267102'),(23,'Matenzawa','Mundu','30c225f8772b06b88af43596df21ddb65407ddee71b29d943ff021cabfa4e16f1658be2eb8a4246a19412f2135dff39389b594b852786a5e8145940250337788','powelldunish@gmail.com',2,'f8d5a2d87d0db1e433f33b9c3e2906d3','2020-06-05 17:07:00.660476','2020-06-05 17:07:01.267102'),(24,'John','Mundu','42c21b6fb2f7cc4ea73edb61c202a068041920cf986d75946c908692b678e31f2a6edee15cfae2690f41328924df4235b1d5a336bd46abf308f8623e0b793784','mnl5998@gmail.com',2,'4a63eb42d8d8ace8d581a3a0393164e3','2020-06-05 17:07:00.660476','2020-06-05 17:07:01.267102'),(25,'John','Mundu','84669fdb1cda8861856ba6b43172d2628bf72e8af55ed7903aa411c03dfa5eca24bea97863da3dab48fbfe950e2fc5e7bfcaa6a2a0e2b304f245656915d63f16','seanbaraka@gmail.com',2,'0b8b744153fc2e9f72d09ec7ad8af0ef','2020-06-05 17:07:00.660476','2020-06-05 17:07:01.267102'),(26,'Baraka','Sean','ac7dd5b0b57fb23731c1ee9ce069f95097f17fdf0002b6711444dd8f5af5e81efb70966bfd27d6effb483de320de4b9cab9580bb97d691c193c38416dec6c7d5','seanbaraka1@gmail.com',2,'75a853c55ba2efa505cf7b745f74e912','2020-06-05 17:07:00.660476','2020-06-05 17:07:01.267102'),(27,'Shadrack','Kitavi','7cb3666b78a08f0149e88498b3e9eec25fbde13aecf33725c009ebccc473277988bcbcb043aa306f998a527dc2cf92ba94def2da5d6242820497d13b021ee404','kitavi@mail.com',2,'b45a8cde319eeaab86ef750d85d0e99d','2020-06-05 17:07:00.660476','2020-06-05 17:07:01.267102'),(28,'Jane ','Kanyole','8c18295bc5ce8af2b85f5454883bd247073c1ea5a486b137b4e548d0b46caf31a562f1bec904d47963508ca44d6f272a9f69195da618631348f9c607179ba037','jane12@gmail.com',2,'900e8e30adc40fc29a2414c39b51f234','2020-06-05 17:07:00.660476','2020-06-05 17:07:01.267102'),(29,'Baraka','Mwau','64c9b7587f98fa809d72947a45f73fdcd667ff761c24468e5af3bee3949197bf96945fb299d01106f837bc5fd87815a82d02b11c06a8045cf2ef9719511bc08b','powelldunish@gmail.com',2,'a3d4d5f3d551a21f332a27fef0c9559f','2020-06-05 17:07:00.660476','2020-06-05 17:07:01.267102'),(30,'BenjaminK','KitongaK','e16c76c35145fe3cb05425ad213a354d18adcfa1b78ff0dd25933826cb822045b9d5769ccd140dd3ee56fb621239acebf1d43bac0474ead83066c5326f7069a5','benjaminkk@gmail.com',2,'3a408a0834c88cf88cb0a69d7dec4679','2020-06-17 15:55:12.317257','2020-06-17 15:55:12.317257'),(31,'SeanBaraka','Mwau','607fd6625f83c06e9a47f1f6fd05d3d49fad219e7c922c830f2bb92a57a2ad833dd26468d9c7779565bdc5252600bacb0fb402926ba2440edccc2ffc0d5459c8','mwausean@mail.com',2,'4f7821d07eb745d45c89748a3aa5e0be','2020-06-17 16:00:55.394330','2020-06-17 16:00:55.394330'),(32,'Mule','Kitavi','e2cee9f206f74c540dbe11fb0d404b435f8f8dcdd823aec7542b7b3e4bae372d76dc97f80681296e46c7a39db8b6f49ecc3487ee0e6d5c0f467c833f19205c0c','mulek@mail.com',2,'69b2f05de816de340b30f4005a3a11c9','2020-06-17 18:04:28.573511','2020-06-17 18:04:28.573511'),(33,'Baraka','Mwau','38cb95e653afc7c8499df23fc99d007a74ba713614acc9629fa9826f805ef4265e16577a597fea4051a6ba372b7956ea72f57da294fa771ea3f9d794c50cd31f','barakam@mail.com',2,'3d1973167caee11a62b7ebe479ceda2d','2020-06-17 22:53:42.090055','2020-06-17 22:53:42.090055'),(34,'James','Rodrigo','f24c3e599aa4c638c2658883330a49b81c130150f00ed4bbe2d846a037368d1b1d7e2012cc5fa65fddeac6ff849e1eeda8b01adfa1cef432319e296ff08a074f','jamo@mail.com',2,'4aadc85e0efc3d35a4d1dc3487a654e5','2020-06-17 22:56:39.919961','2020-06-17 22:56:39.919961'),(35,'Who','Are','7a155421033f9a23a33cb059094158262d1948b5e53db78c188cd50e70b9c5ab84601d81ac615b565fa1e72f81199f97ea74d09d4d795e3a9fdcc8bd8a52f4f3','who@you.com',2,'470b6ba20d1b11bb1a5b1e87cc8bf1a9','2020-06-17 23:00:45.041717','2020-06-17 23:00:45.041717'),(36,'Sean','n','de05335b8fff9b032ac7654f786fc056ae09cd294aa4934031ef9c566cce2ad14882b0f170f52bbe45147801701679bb12d00d9ed0ac6ba9065dbfa83dffed01','v@mail.com',2,'f6aea55a250c8f07751069e44addba5c','2020-06-17 23:06:00.406870','2020-06-17 23:06:00.406870'),(37,'Joyce','Limuru','45badc456cc6d53baeb46b3d46ac25b9fb643e1e6d6f2dcd9a4f99c6078a4c4ca305832fe3d95708e18455e553af7fea93108207a0d4bfb6aa74e0b45ca81ec6','joyce@limuru.com',2,'46cc3dbbd50ed556f2f17a737e488678','2020-06-17 23:08:37.473701','2020-06-17 23:08:37.473701'),(38,'Zacky','Gee','019cbd82021ecd23f8c8536ad2092d1d97a806051cff82b8b86cbb09e6b240c626d53c715cc0224788de513a5576a52b9f44d7bf1561dd0dad9b3a7f0bb59520','zaky@mail.com',2,'8906fba459aa354fde56585dbe82b330','2020-06-19 12:31:55.057772','2020-06-19 12:31:55.057772');
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

-- Dump completed on 2020-07-28 23:01:22

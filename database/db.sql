/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;




--
-- Table structure for table `Customers`
--

DROP TABLE IF EXISTS `Customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Customers` (
  `customer_id` INT(11) NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Customers`
--

LOCK TABLES `Customers` WRITE;
/*!40000 ALTER TABLE `Customers` DISABLE KEYS */;
INSERT INTO `Customers`(first_name, last_name, email) VALUES ('Steve', 'Turner', 'fakeemail@notreal.com'), ('Jeff', 'Bezos', 'blue@origin.com'), ('Elon', 'Musk', 'mars@mars.com');
/*!40000 ALTER TABLE `Customers` ENABLE KEYS */;
UNLOCK TABLES;






-- Technically topping prices and calories should be variable based on pizza size with a range of 6-50 inches

--
-- Table structure for table `Toppings`
--

DROP TABLE IF EXISTS `Toppings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Toppings` (
  `topping_id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `calories` INT(11),
  `price` DECIMAL(14, 2),
  `has_been_deleted` BOOLEAN,
  PRIMARY KEY (`topping_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Toppings`
--

LOCK TABLES `Toppings` WRITE;
/*!40000 ALTER TABLE `Toppings` DISABLE KEYS */;
INSERT INTO `Toppings`(name, calories, price, has_been_deleted) VALUES ('None', 0, 0.00, FALSE), ('Truffle Oil', 119, 5.00, FALSE), ('Goat Cheese', 103, 2.50, FALSE), ('Pork Belly', 399, 4.00, FALSE);
/*!40000 ALTER TABLE `Toppings` ENABLE KEYS */;
UNLOCK TABLES;





--
-- Table structure for table `Topping_Sets`
--

DROP TABLE IF EXISTS `Topping_Sets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Topping_Sets` (
  `topping_sets_id` int(11) NOT NULL AUTO_INCREMENT,
  `topping_id_1` int(11),
  `topping_id_2` int(11),
  `topping_id_3` int(11),
  PRIMARY KEY (`topping_sets_id`),
  KEY `topping_id_1` (`topping_id_1`),
  KEY `topping_id_2` (`topping_id_2`),
  KEY `topping_id_3` (`topping_id_3`),
  `has_been_deleted` BOOLEAN,
  CONSTRAINT `Toppings_fk_1` FOREIGN KEY (`topping_id_1`) REFERENCES `Toppings` (`topping_id`),
  CONSTRAINT `Toppings_fk_2` FOREIGN KEY (`topping_id_2`) REFERENCES `Toppings` (`topping_id`),
  CONSTRAINT `Toppings_fk_3` FOREIGN KEY (`topping_id_3`) REFERENCES `Toppings` (`topping_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;


--
-- Dumping data for table `Topping_Sets`
--

LOCK TABLES `Topping_Sets` WRITE,
			      `Toppings` READ,
			      `Toppings` AS `top1` READ,
            `Toppings` AS `top2` READ,
            `Toppings` AS `top3` READ;
/*!40000 ALTER TABLE `Topping_Sets` DISABLE KEYS */;
INSERT INTO `Topping_Sets`(topping_id_1, topping_id_2, topping_id_3, has_been_deleted) 
VALUES(
    (SELECT `topping_id` FROM `Toppings` AS `top1` WHERE `name` = 'Truffle Oil'),
    (SELECT `topping_id` FROM `Toppings` AS `top2` WHERE `name` = 'Goat Cheese'),
    (SELECT `topping_id` FROM `Toppings` AS `top3` WHERE `name` = 'Pork Belly' ),
    FALSE
    );
/*!40000 ALTER TABLE `Topping_Sets` ENABLE KEYS */;
UNLOCK TABLES;



-- https://stackoverflow.com/questions/56663787/lock-multiple-tables-with-aliases-doesnt-work
-- Page I used to lock multiple tables. Alias is needed when referring to table multiple times


--
-- Table structure for table `Pizzas`
--

DROP TABLE IF EXISTS `Pizzas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Pizzas` (
  `pizza_id` INT(11) NOT NULL AUTO_INCREMENT,
  `size` INT(11) NOT NULL,
  `topping_sets_id` INT(11) NOT NULL,
  `total_price` DECIMAL(14, 2) NOT NULL,
  `total_calories` INT(11) NOT NULL,
  PRIMARY KEY (`pizza_id`),
  CONSTRAINT `Toppings_Sets_1` FOREIGN KEY (`topping_sets_id`) REFERENCES `Topping_Sets` (`topping_sets_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Pizzas`
--

LOCK TABLES `Pizzas` WRITE,
			`Toppings` READ,
			`Toppings` AS `top1` READ,
            `Toppings` AS `top2` READ,
            `Toppings` AS `top3` READ,
            `Toppings` AS `top1_cals` READ,
            `Toppings` AS `top2_cals` READ,
            `Toppings` AS `top3_cals` READ,
            `Topping_Sets` READ,
            `Topping_Sets` AS `cals` READ;
/*!40000 ALTER TABLE `Pizzas` DISABLE KEYS */;
INSERT INTO `Pizzas`(size, topping_sets_id, total_price, total_calories)
	VALUES (
    	   10,  -- Size choice which will be given by user (form) and inserted using JS
         1,  -- Topping ID which will be inserted by JS after either new Topping_Sets is created or existing is used
         (10 * 1 +  -- Size (10) taken from form multiplied by arbitrary multiplier (1)

         (SELECT top1.price + top2.price + top3.price  -- grab price from all 3 toppings and sum
            FROM (`Topping_Sets`
            INNER JOIN `Toppings` as `top1` ON Topping_Sets.topping_id_1 = top1.topping_id
            INNER JOIN `Toppings` as `top2` ON Topping_Sets.topping_id_2 = top2.topping_id
            INNER JOIN `Toppings` as `top3` ON Topping_Sets.topping_id_3 = top3.topping_id)
            WHERE Topping_Sets.topping_sets_id = 1)),

          (10 * 75 +  -- Similar arbitrary multiplier (75) used for calorie calculation
          (SELECT top1_cals.calories + top2_cals.calories + top3_cals.calories
            FROM (`Topping_Sets` as `cals`
            INNER JOIN `Toppings` as `top1_cals` ON cals.topping_id_1 = top1_cals.topping_id
            INNER JOIN `Toppings` as `top2_cals` ON cals.topping_id_2 = top2_cals.topping_id
            INNER JOIN `Toppings` as `top3_cals` ON cals.topping_id_3 = top3_cals.topping_id)
            WHERE cals.topping_sets_id = 1))
    );
/*!40000 ALTER TABLE `Pizzas` ENABLE KEYS */;
UNLOCK TABLES;





--
-- Table structure for table `Set_Of_Pizzas`
--

DROP TABLE IF EXISTS `Set_Of_Pizzas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Set_Of_Pizzas` (
  `BLANK` int(11) NOT NULL AUTO_INCREMENT,
  `BLANK` varchar(255) NOT NULL,
  PRIMARY KEY (`BLANK`),
  UNIQUE KEY `BLANK` (`BLANK`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Set_Of_Pizzas`
--

LOCK TABLES `Set_Of_Pizzas` WRITE;
/*!40000 ALTER TABLE `Set_Of_Pizzas` DISABLE KEYS */;
INSERT INTO `Set_Of_Pizzas` VALUES ();
/*!40000 ALTER TABLE `Set_Of_Pizzas` ENABLE KEYS */;
UNLOCK TABLES;








--
-- Table structure for table `Kids_Menus`
--

DROP TABLE IF EXISTS `Kids_Menus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Kids_Menus` (
  `BLANK` int(11) NOT NULL AUTO_INCREMENT,
  `BLANK` varchar(255) NOT NULL,
  PRIMARY KEY (`BLANK`),
  UNIQUE KEY `BLANK` (`BLANK`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Kids_Menus`
--

LOCK TABLES `Kids_Menus` WRITE;
/*!40000 ALTER TABLE `Kids_Menus` DISABLE KEYS */;
INSERT INTO `Kids_Menus` VALUES ();
/*!40000 ALTER TABLE `Kids_Menus` ENABLE KEYS */;
UNLOCK TABLES;








--
-- Table structure for table `Customer_Orders`
--

DROP TABLE IF EXISTS `Customer_Orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Customer_Orders` (
  `BLANK` int(11) NOT NULL AUTO_INCREMENT,
  `BLANK` varchar(255) NOT NULL,
  PRIMARY KEY (`BLANK`),
  UNIQUE KEY `BLANK` (`BLANK`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Customer_Orders`
--

LOCK TABLES `Customer_Orders` WRITE;
/*!40000 ALTER TABLE `Kids_Menus` DISABLE KEYS */;
INSERT INTO `Customer_Orders` VALUES ();
/*!40000 ALTER TABLE `Kids_Menus` ENABLE KEYS */;
UNLOCK TABLES;








/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2013-02-04 12:54:40

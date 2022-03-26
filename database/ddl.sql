
--
-- Table structure for table `Customers`
--

DROP TABLE IF EXISTS`Customers`;
CREATE TABLE `Customers` (
  `customer_id` INT(11) NOT NULL AUTO_INCREMENT UNIQUE,
  `first_name` VARCHAR(255) NOT NULL,
  `last_name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`customer_id`)
) ENGINE=InnoDB;

--
-- Table structure for table `Toppings`
--

DROP TABLE IF EXISTS `Toppings`;
CREATE TABLE `Toppings` (
  `topping_id` INT(11) NOT NULL AUTO_INCREMENT UNIQUE,
  `name` VARCHAR(255) NOT NULL,
  `calories` INT(11),
  `price` DECIMAL(14, 2),
  `has_been_deleted` BOOLEAN,
  PRIMARY KEY (`topping_id`)
) ENGINE=InnoDB;

--
-- Table structure for table `Kids_Menus`
--

DROP TABLE IF EXISTS `Kids_Menus`;
CREATE TABLE `Kids_Menus` (
  `kid_id` int(11) NOT NULL AUTO_INCREMENT UNIQUE,
  `balloon_choice` BOOL DEFAULT FALSE NOT NULL,
  `candy_choice` BOOL DEFAULT FALSE NOT NULL,
  `ball_choice` BOOL DEFAULT FALSE NOT NULL,
  `autographed_item_choice` BOOL DEFAULT FALSE NOT NULL,
  PRIMARY KEY (`kid_id`)
) ENGINE=InnoDB;

--
-- Table structure for table `Topping_Sets`
--

DROP TABLE IF EXISTS `Topping_Sets`;
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
) ENGINE=InnoDB;

--
-- Table structure for table `Pizzas`
--

DROP TABLE IF EXISTS `Pizzas`;
CREATE TABLE `Pizzas` (
  `pizza_id` INT(11) NOT NULL AUTO_INCREMENT UNIQUE,
  `size` INT(11) NOT NULL,
  `topping_sets_id` INT(11) NOT NULL,
  `total_price` DECIMAL(14, 2) NOT NULL,
  `total_calories` INT(11) NOT NULL,
  PRIMARY KEY (`pizza_id`),
  CONSTRAINT `toppings_sets_1` FOREIGN KEY (`topping_sets_id`) REFERENCES `Topping_Sets` (`topping_sets_id`)
 ) ENGINE=InnoDB;

--
-- Table structure for table `Set_Of_Pizzas`
--

DROP TABLE IF EXISTS `Set_Of_Pizzas`;
CREATE TABLE `Set_Of_Pizzas` (
  `set_of_pizza_id` int(11) NOT NULL AUTO_INCREMENT UNIQUE,
  `pizza_id_1` int(11),
  `pizza_id_2` int(11),
  `pizza_id_3` int(11),
  `pizza_id_4` int(11),
  `pizza_id_5` int(11),
  `pizza_id_6` int(11),
  `pizza_id_7` int(11),
  `pizza_id_8` int(11),
  `pizza_id_9` int(11),
  `pizza_id_10` int(11),
  `total_price` DECIMAL(14,2),
  PRIMARY KEY (`set_of_pizza_id`),
  CONSTRAINT `pizza1` FOREIGN KEY (`pizza_id_1`) REFERENCES `Pizzas` (`pizza_id`),
  CONSTRAINT `pizza2` FOREIGN KEY (`pizza_id_2`) REFERENCES `Pizzas` (`pizza_id`),
  CONSTRAINT `pizza3` FOREIGN KEY (`pizza_id_3`) REFERENCES `Pizzas` (`pizza_id`),
  CONSTRAINT `pizza4` FOREIGN KEY (`pizza_id_4`) REFERENCES `Pizzas` (`pizza_id`),
  CONSTRAINT `pizza5` FOREIGN KEY (`pizza_id_5`) REFERENCES `Pizzas` (`pizza_id`),
  CONSTRAINT `pizza6` FOREIGN KEY (`pizza_id_6`) REFERENCES `Pizzas` (`pizza_id`),
  CONSTRAINT `pizza7` FOREIGN KEY (`pizza_id_7`) REFERENCES `Pizzas` (`pizza_id`),
  CONSTRAINT `pizza8` FOREIGN KEY (`pizza_id_8`) REFERENCES `Pizzas` (`pizza_id`),
  CONSTRAINT `pizza9` FOREIGN KEY (`pizza_id_9`) REFERENCES `Pizzas` (`pizza_id`),
  CONSTRAINT `pizza10` FOREIGN KEY (`pizza_id_10`) REFERENCES `Pizzas` (`pizza_id`)
) ENGINE=InnoDB;

--
-- Table structure for table `Customer_Orders`
--

DROP TABLE IF EXISTS `Customer_Orders`;
CREATE TABLE `Customer_Orders` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT UNIQUE,
  `customer_id` int(11) NOT NULL,
  `set_of_pizza_id` int(11) NOT NULL,
  `kid_id` int(11) NOT NULL,
  `order_date` DATE,
  `price` DECIMAL(14,2),
  PRIMARY KEY (`order_id`),
  CONSTRAINT `cust_id` FOREIGN KEY (`customer_id`) REFERENCES `Customers` (`customer_id`),
  CONSTRAINT `set_pizza_id` FOREIGN KEY (`set_of_pizza_id`) REFERENCES `Set_Of_Pizzas` (`set_of_pizza_id`),
  CONSTRAINT `kiddie_id` FOREIGN KEY (`kid_id`) REFERENCES `Kids_Menus` (`kid_id`)
) ENGINE=InnoDB;





--
-- Dumping data for table `Customers`
--

LOCK TABLES `Customers` WRITE;
/*!40000 ALTER TABLE `Customers` DISABLE KEYS */;
INSERT INTO `Customers`(first_name, last_name, email) 
VALUES ('Steve', 'Turner', 'fakeemail@notreal.com'), ('Jeff', 'Bezos', 'blue@origin.com'), ('Elon', 'Musk', 'mars@mars.com');
/*!40000 ALTER TABLE `Customers` ENABLE KEYS */;
UNLOCK TABLES;

-- Technically topping prices and calories should be variable based on pizza size with a range of 6-50 inches

--
-- Dumping data for table `Toppings`
--

LOCK TABLES `Toppings` WRITE;
/*!40000 ALTER TABLE `Toppings` DISABLE KEYS */;
INSERT INTO `Toppings`(name, calories, price, has_been_deleted) 
VALUES ('None', 0, 0.00, FALSE), ('Truffle Oil', 119, 5.00, FALSE), ('Goat Cheese', 103, 2.50, FALSE), ('Pork Belly', 399, 4.00, FALSE);
/*!40000 ALTER TABLE `Toppings` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `Set_Of_Pizzas`
--


-- NOTE - before inserting into this, there must be 10 items in Pizzas
LOCK TABLES `Set_Of_Pizzas` WRITE,
/*!40000 ALTER TABLE `Set_Of_Pizzas` DISABLE KEYS */;
INSERT INTO `Set_Of_Pizzas` VALUES ();
/*!40000 ALTER TABLE `Set_Of_Pizzas` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Dumping data for table `Kids_Menus`
--

LOCK TABLES `Kids_Menus` WRITE,
/*!40000 ALTER TABLE `Kids_Menus` DISABLE KEYS */;
INSERT INTO `Kids_Menus` (balloon_choice, candy_choice, ball_choice, autographed_item_choice) 
VALUES (TRUE, TRUE, FALSE, FALSE), (FALSE, TRUE, FALSE, FALSE),(TRUE, TRUE, TRUE, TRUE);
/*!40000 ALTER TABLE `Kids_Menus` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Dumping data for table `Customer_Orders`
--

LOCK TABLES `Customer_Orders` WRITE,
/*!40000 ALTER TABLE `Kids_Menus` DISABLE KEYS */;
INSERT INTO `Customer_Orders` VALUES ();
/*!40000 ALTER TABLE `Kids_Menus` ENABLE KEYS */;
UNLOCK TABLES;

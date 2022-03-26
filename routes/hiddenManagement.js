
var express = require('express');

// Database
var db = require('../database/db-connector');
var connection = db.pool;
// router
var router = express.Router();


var createCustomers = 
    "CREATE TABLE `Customers` (" +
    "`customer_id` INT(11) NOT NULL AUTO_INCREMENT UNIQUE," +
    "`first_name` VARCHAR(255) NOT NULL," +
    "`last_name` VARCHAR(255) NOT NULL," +
    "`email` VARCHAR(255) NOT NULL," +
    "PRIMARY KEY (`customer_id`)" +
    ") ENGINE=InnoDB;";

router.get('/', function(req, res){
    res.render('hiddenManagement');
});

// fill tables with sample data
router.post('/', function (req, res, next) {

    connection.getConnection()
    .then(conn => {conn.query(createCustomers);})

    .catch(err=>{console.log('problem creating Customers Table');});
    console.log(req.body);
    res.render('hiddenManagement');
});

module.exports = router;
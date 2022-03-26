
var express = require('express');

// Database
var db = require('../database/db-connector');
var connection = db.pool;
// router
var router = express.Router();


// Toppings Table
router.get('/', function(req, res)
{  
    res.render('toppings');
});

module.exports = router;
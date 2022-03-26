var express = require('express');

// Database
var db = require('../database/db-connector');
var connection = db.pool;
// router
var router = express.Router();



// Kids_Menus Table
router.get('/', function(req, res)
{  
    res.render('kidsMenus');
});


module.exports = router;
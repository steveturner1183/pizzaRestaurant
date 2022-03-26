
var express = require('express');

// Database
var db = require('../database/db-connector');
var connection = db.pool;
// router
var router = express.Router();

// add user account
router.post('/', function (req, res, next) {


    console.log(req.body);
    res.render('accountManagement');
});

// delete user account
router.delete('/', function (req, res, next) {


    console.log(req.body);

    res.render('accountManagement');

    // deleteCustomer(req, res, next);

});

// update existing user account
router.patch('/', function (req, res, next) {


    console.log(req.body);
    // res.render('accountManagement');
});

// display page
router.get('/', function (req, res, next) {

    console.log(req.body);
    res.render('accountManagement');
});

// display table
router.get('/table', function (req, res, next) {

    console.log(req.body);
    getTable(res, next);
});

function getTable(res, next){
    var sqlOut = "SELECT customer_id, first_name, last_name, email FROM Customers";
  
    connection.getConnection()
    .then(conn => {conn.query(sqlOut)
        .then((rows) => {
            console.log(rows);
            var customerTable = [];
            for (var row in rows){
                customerTable.push({
                    'customer_id':rows[row].customer_id,
                    'first_name':rows[row].first_name,
                    'last_name':rows[row].last_name,
                    'email':rows[row].email
                });
            }
            res.json({rows:rows});
        })
        })
        

}


function deleteCustomer(req, res, next){
    var sqlOut = "SELECT customer_id, first_name, last_name, email FROM Customers WHERE customer_id=?";
    var sqlDelete = "DELETE FROM Customers WHERE customer_id=?";
  
    console.log(req.body.customer_id);
    connection.query(sqlOut, [req.body.customer_id], function (err, rows, fields) {
          if (err) {
              console.log(err);
              next();
              return;
          }
          console.log(rows);
          if (rows[0].customer_id != req.body.customer_id){
            console.log("error finding customer_id");
            next();
            return;
          }
          connection.query(sqlDelete, [req.body.customer_id], function (err, rows, fields) {
            if (err) {
                console.log(err);
                next();
                return;
            }
            console.log(rows);
            console.log("I deleted " + rows.affectedRows + " rows");
  
            connection.query(sqlOut, [req.body.customer_id], function (err, rows, fields) {
              if (err) {
                  console.log(err);
                  next();
                  return;
              }
              console.log("new");
              console.log(rows);
              getTable(res, next);
            });
  
            return;
          })
      });
  }

function addCustomer(req, res, next){
    var sqlOut = "SELECT customer_id, first_name, last_name, email FROM Customers WHERE customer_id=1";
    // var sqlOut = "INSERT INTO `Customers` (first_name, last_name, email) VALUES (?,?,?)";
  
    connection.getConnection()
    .then(conn => {conn.query(sqlOut, [req.body.first_name, req.body.last_name, req.body.email])
        .then((rows) => {
            console.log(rows);
            conn.release();
            res.json({rows:rows});
        }).catch(err => {console.log('row error');conn.release();})
    }).catch(err => {console.log('query error');conn.release();})


}


module.exports = router;

// function (err, rows, fields)
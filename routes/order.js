
var express = require('express');

// Database
var db = require('../database/db-connector');
var connection = db.pool;
// router
var router = express.Router();


// Order page
router.get('/', function(req, res)
{   
    var context = {};

    // Create number of Pizzas and id tags
    var numPizza = [];

    for (var i = 1; i < 11; i++) {
        numPizza.push({
            'num':i,
            'sizeId':'size'+i,
            'topping1Id':'topping1'+i,
            'topping2Id':'topping2'+i,
            'topping3Id':'topping3'+i,
        });
    }

    context.pizza = numPizza;

    // Create size
    var sizePizza = [];

    for (var i = 6; i < 51; i++) {
        sizePizza.push({'size':i});
    }

    context.size = sizePizza

    // Add toppings
    
    connection.getConnection()
    .then(conn => {conn.query('SELECT * FROM Toppings')
        .then(rows => {
            console.log(rows);

        
        // if(err) {
        //     next(err);
        //     return;
        // }
            var toppingTable = [];
            for (var row in rows) {
                toppingTable.push({
                    'topping_id':rows[row].topping_id,
                    'name':rows[row].name
                });       
            }
            context.toppings = toppingTable;
            conn.release();
            res.render('order', context);
        })
        .catch(err=>{   console.log('row problem');
                        conn.release();})
        })
    .catch(err=>{   console.log('ordering problem');
                    conn.release();});
});

module.exports = router;

var express = require('express');

// Database
var db = require('../database/db-connector');

// router
var router = express.Router();

router.get('/', function(req, res) {
    result = req.query.result;
    res.render('checkout', result);
});



// Checkout page
// Loads when submit button is clicked on order page
router.post('/', function(req, res) {

        
    var pizzaIds = [];
    var totalPrice = 0.00;

    // Create variables for query data
    let topping1 = req.query.topping1.split(",");
    let topping2 = req.query.topping2.split(",");
    let topping3 = req.query.topping3.split(",");
    
    let size = req.query.size.split(",");
    
    let customerId = req.query.customerId;

    let balloonChoice = req.query.balloonChoice;
    let candyChoice = req.query.candyChoice;
    let ballChoice = req.query.ballChoice;
    let autographChoice = req.query.autographChoice;

    if (balloonChoice == 1) {
        balloonChoice = 'TRUE';
    } else {
        balloonChoice = 'FALSE';
    }

    if (candyChoice == 1) {
        candyChoice = 'TRUE';
    } else {
        candyChoice = 'FALSE';
    }

    if (ballChoice == 1) {
        ballChoice = 'TRUE';
    } else {
        ballChoice = 'FALSE';
    }

    if (autographChoice == 1) {
        autographChoice = 'TRUE';
    } else {
        autographChoice = 'FALSE';
    }

    // Set date of order
    var today = new Date();
    var dd = String(today.getDate()).padStart(2,'0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;

    
    async function insertPizzaData() {
        try {
            
            for (let i=0; i<10; i++) {

                // Insert selectred toppings into Topping_Sets
                let toppingInsert = await db.pool.query('INSERT INTO `Topping_Sets`(`topping_id_1`, `topping_id_2`, `topping_id_3`) VALUES (?,?,?)',
                 [topping1[i], topping2[i], topping3[i]]);

                // Select prices for processing
                let toppingPrice = await db.pool.query('SELECT top1.price + top2.price + top3.price AS price\
                    FROM (`Topping_Sets`\
                    INNER JOIN `Toppings` as `top1` ON Topping_Sets.topping_id_1 = top1.topping_id\
                    INNER JOIN `Toppings` as `top2` ON Topping_Sets.topping_id_2 = top2.topping_id\
                    INNER JOIN `Toppings` as `top3` ON Topping_Sets.topping_id_3 = top3.topping_id)\
                    WHERE Topping_Sets.topping_sets_id = ?', 
                    [toppingInsert.insertId]);
                  
                // Select calories for processing
                let toppingCals = await db.pool.query('SELECT top1.calories + top2.calories + top3.calories AS cals\
                    FROM (`Topping_Sets`\
                    INNER JOIN `Toppings` as `top1` ON Topping_Sets.topping_id_1 = top1.topping_id\
                    INNER JOIN `Toppings` as `top2` ON Topping_Sets.topping_id_2 = top2.topping_id\
                    INNER JOIN `Toppings` as `top3` ON Topping_Sets.topping_id_3 = top3.topping_id)\
                    WHERE Topping_Sets.topping_sets_id = ?', 
                    [toppingInsert.insertId]);

                let pizzaPrice = toppingPrice[0].price + size[i] * 1.20;
                totalPrice += pizzaPrice;

                let pizzaInsert = await db.pool.query('INSERT INTO `Pizzas`(`size`, `topping_sets_id`, `total_price`, `total_calories`) VALUES (?, ?, ?, ?)', 
                [size[i], toppingInsert.insertId, pizzaPrice, toppingCals[0].cals + size[i] * 50]);
               
                let pizzaIdsInserted = pizzaIds.push(pizzaInsert.insertId);
                }

            let setOfPizzasInsert = await db.pool.query('INSERT INTO `Set_Of_Pizzas` (`pizza_id_1`, `pizza_id_2`, `pizza_id_3`, `pizza_id_4`, `pizza_id_5`, `pizza_id_6`, `pizza_id_7`, `pizza_id_8`, `pizza_id_9`, `pizza_id_10`, `total_price`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
            [pizzaIds[0], pizzaIds[1], pizzaIds[2], pizzaIds[3], pizzaIds[4], pizzaIds[5], pizzaIds[6], pizzaIds[7], pizzaIds[8], pizzaIds[9], 100.00]);
            
            let kidsMenusInsert = await db.pool.query('INSERT INTO `Kids_Menus`(`balloon_choice`, `candy_choice`, `ball_choice`, `autographed_item_choice`)\
                VALUES(' + balloonChoice + ', ' + candyChoice + ', ' + ballChoice + ', ' + autographChoice +')');
            
            let customerOrdersInsert = await db.pool.query('INSERT INTO `Customer_Orders` (`customer_id`, `set_of_pizza_id`, `kid_id`, `order_date`, `price`) VALUES (?,?,?,?,?)',
                [customerId, setOfPizzasInsert.insertId, kidsMenusInsert.insertId, today, totalPrice]);
        
        } catch(err) {
            throw err;

        } finally {
            return;
        }
    } 

    insertPizzaData();

    res.send(null);
});

module.exports = router;
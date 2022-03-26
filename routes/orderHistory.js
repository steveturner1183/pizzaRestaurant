
var express = require('express');

// Database
var db = require('../database/db-connector');
var connection = db.pool;
// router
var router = express.Router();


// Order history page
router.get('/', function(req, res)
{  

    res.render('orderHistory');
    });

// Order history page
router.get('/history', function(req, res)
{  
    var payload = {};
    var data = [];
    let id = req.query.id;
    let select = req.query.select;

    async function selectHistory () {
        try {
            /**************Initialize Data*****************/

            // Find customer with matching Id
            let customerOrder = await db.pool.query('SELECT * FROM `Customer_Orders` WHERE `customer_id` = ?',[id]);           
            
            for (let i=0; i<customerOrder.length; i++) {
                let customerId = customerOrder[i].customer_id; // Store customer Id
                let pizzaSetId = customerOrder[i].set_of_pizza_id;  // Store pizza set Id
                let kidsMenu = customerOrder[i].kid_id; // Store kids menu id

                // Find pizzas in pizza set
                let pizzaList = [];
                let selectPizzaSet = await db.pool.query('SELECT * FROM `Set_Of_Pizzas` WHERE `set_of_pizza_id` = ?', [pizzaSetId]);

                pizzaList[0] = selectPizzaSet[0].pizza_id_1;
                pizzaList[1] = selectPizzaSet[0].pizza_id_2;
                pizzaList[2] = selectPizzaSet[0].pizza_id_3;
                pizzaList[3] = selectPizzaSet[0].pizza_id_4;
                pizzaList[4] = selectPizzaSet[0].pizza_id_5;
                pizzaList[5] = selectPizzaSet[0].pizza_id_6;
                pizzaList[6] = selectPizzaSet[0].pizza_id_7;
                pizzaList[7] = selectPizzaSet[0].pizza_id_8;
                pizzaList[8] = selectPizzaSet[0].pizza_id_9;
                pizzaList[9] = selectPizzaSet[0].pizza_id_10;
                
            
                // Find matching topping sets

                let toppingSetsList = [];
                let pizzas = [];

                for (let i=0; i<10; i++) {
                    let selectPizzas = await db.pool.query('SELECT * FROM `Pizzas` WHERE `pizza_id` = ?', [pizzaList[i]]);
                    pizzas[i] = selectPizzas[0];

                    let selectToppingSets = await db.pool.query('SELECT * FROM `Topping_Sets` WHERE `topping_sets_id` = ?',
                    [selectPizzas[0].topping_sets_id]);

                    toppingSetsList[i] = selectToppingSets[0];
                }
                
                // Record matching toppings
                
                let toppingsOuter = [];

                for (let i=0; i<10; i++) {
                    let topping1Select = await db.pool.query('SELECT * FROM `Toppings` WHERE `topping_id` = ?', [toppingSetsList[i].topping_id_1]);
                    let topping2Select = await db.pool.query('SELECT * FROM `Toppings` WHERE `topping_id` = ?', [toppingSetsList[i].topping_id_2]);
                    let topping3Select = await db.pool.query('SELECT * FROM `Toppings` WHERE `topping_id` = ?', [toppingSetsList[i].topping_id_3]);
                    let toppingsInner = [topping1Select, topping2Select, topping3Select];
                    toppingsOuter[i] = toppingsInner;
                }


                let dataSet = {};

                if (select == "Customer_Orders") {
                    /******************** Customer Order History *********************/
                    dataSet.orderId = customerOrder[0].order_id;
                    dataSet.pizzaSetId = customerOrder[0].set_of_pizza_id;
                    dataSet.kidsMenu = customerOrder[0].kid_id;
                    dataSet.orderDate = customerOrder[0].order_date;
                    dataSet.price = customerOrder[0].price;
                    data[i] = dataSet;
                }


                /******************* Pizza Set History *********************/
                if (select == "Set_Of_Pizzas") {
                    dataSet.pizzaSetId = selectPizzaSet[0].set_of_pizza_id;
                    dataSet.pizza1 = selectPizzaSet[0].pizza_id_1;
                    dataSet.pizza2 = selectPizzaSet[0].pizza_id_2;
                    dataSet.pizza3 = selectPizzaSet[0].pizza_id_3;
                    dataSet.pizza4 = selectPizzaSet[0].pizza_id_4;
                    dataSet.pizza5 = selectPizzaSet[0].pizza_id_5;
                    dataSet.pizza6 = selectPizzaSet[0].pizza_id_6;
                    dataSet.pizza7 = selectPizzaSet[0].pizza_id_7;
                    dataSet.pizza8 = selectPizzaSet[0].pizza_id_8;
                    dataSet.pizza9 = selectPizzaSet[0].pizza_id_9;
                    dataSet.pizza10 = selectPizzaSet[0].pizza_id_10;
                    data[i] = dataSet;
                }
                


                /******************* Pizzas History *********************/
                if (select == "Pizzas") {
                    let ids = [];
                    let sizes = [];
                    let toppingSet = [];
                    let prices = [];
                    let cals = [];
                    for (let i=0; i<10; i++) {
                        ids[i] = pizzas[i].pizza_id;
                        sizes[i] = pizzas[i].size;
                        toppingSet[i] = pizzas[i].topping_sets_id;
                        prices[i] = pizzas[i].total_price;
                        cals[i] = pizzas[i].total_calories;
                    }
                    dataSet.ids = ids;
                    dataSet.sizes = sizes;
                    dataSet.toppingSets = toppingSet;
                    dataSet.prices = prices;
                    dataSet.cals = cals;
                    data[i] = dataSet;
                }
                

                /******************* Topping Sets History *********************/
                let toppingSetsInfo = {};
                



                /******************* Toppings *********************/
                let toppingInfo = {};


            }
        payload.data = data;
        res.send(JSON.stringify(payload));
            
        } catch(err) {
            throw(err);
        }
        
        finally {
            return 
        }

    }
    selectHistory();

    
    

    });

module.exports = router;
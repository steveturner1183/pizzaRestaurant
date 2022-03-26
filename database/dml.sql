-- Customers

SELECT customer_id, first_name, last_name, email FROM `Customers`

INSERT INTO `Customers` (first_name, last_name, email) VALUES(:fname, :lname, :email)

DELETE FROM `Customers` WHERE customer_id = :customer_id_selected

UPDATE `Customers` SET first_name=:fname, last_name=:lname, email=:email WHERE id=:customer_id_selected



-- Toppings

SELECT topping_id, name, calories, price, has_been_deleted FROM `Toppings`

INSERT INTO `Toppings` (name, calories, price, has_been_deleted) VALUES(:name, :calories, :price, :has_been_deleted)

DELETE FROM `Toppings` WHERE topping_id=:topping_id_selected

UPDATE `Toppings` SET name=:name, calories=:calories, price=:price, has_been_deleted=:has_been_deleted



-- Topping_Sets

SELECT topping_sets_id, topping_id_1, topping_id_2, topping_id_3 FROM `Topping_Sets`

INSERT INTO `Topping_Sets` (topping_id_1, topping_id_2, topping_id_3) VALUES (:topping_id_1, :topping_id_2, :topping_id_3)

DELETE FROM `Topping_Sets` WHERE topping_sets_id = :topping_sets_id_selected

UPDATE `Topping_Sets` SET topping_id_1 = :topping_id_1, topping_id_2 = :topping_id_2, topping_id_3 = :topping_id_3



-- Pizzas

SELECT pizza_id, size, topping_sets_id, total_price, total_calories FROM `Pizzas`

INSERT INTO `Pizzas` (size, topping_sets_id, total_price, total_calories) 
VALUES (:size, :topping_sets_id,
    -- Cost calculation
    (:size * 1 +  --  multiplied by arbitrary multiplier (1) for cost per inch

         (SELECT top1.price + top2.price + top3.price  -- grab price from all 3 toppings and sum
            FROM (`Topping_Sets`
            INNER JOIN `Toppings` as `top1` ON Topping_Sets.topping_id_1 = top1.topping_id
            INNER JOIN `Toppings` as `top2` ON Topping_Sets.topping_id_2 = top2.topping_id
            INNER JOIN `Toppings` as `top3` ON Topping_Sets.topping_id_3 = top3.topping_id)
            WHERE Topping_Sets.topping_sets_id = :topping_sets_id)),

    -- Calorie Calculation
    (:size * 75 +  -- arbitrary multiplier (75) used for calories per inch
          (SELECT top1_cals.calories + top2_cals.calories + top3_cals.calories
            FROM (`Topping_Sets` as `cals`
            INNER JOIN `Toppings` as `top1_cals` ON cals.topping_id_1 = top1_cals.topping_id
            INNER JOIN `Toppings` as `top2_cals` ON cals.topping_id_2 = top2_cals.topping_id
            INNER JOIN `Toppings` as `top3_cals` ON cals.topping_id_3 = top3_cals.topping_id)
            WHERE cals.topping_sets_id = 1))
       

DELETE FROM `Pizzas` WHERE pizza_id=:pizza_id_selected

UPDATE `Pizzas` SET size=:size, topping_sets_id=:topping_sets_id, total_price=:total_price, total_calories=:total_calories



-- Kids_Menus

SELECT kid_id, balloon_choice, candy_choice, ball_choice, autographed_item_choice FROM `Kids_Menus`

INSERT INTO `Kids_Menus` (balloon_choice, candy_choice, ball_choice, autographed_item_choice) VALUES(:balloon_choice, :candy_choice, :ball_choice, :autographed_item_choice)

DELETE FROM `Kids_Menus` WHERE  kid_id=:kid_id_selected

UPDATE `Kids_Menus` SET balloon_choice=:balloon_choice, candy_choice=:candy_choice, ball_choice=:ball_choice, autographed_item_choice=:autographed_item_choice




-- Set_Of_Pizzas

SELECT pizza_id_1, pizza_id_2, pizza_id_3, pizza_id_4, pizza_id_5,
       pizza_id_6, pizza_id_7, pizza_id_8, pizza_id_9, pizza_id_10, total_price
    FROM `Set_Of_Pizzas`
    WHERE set_of_pizza_id = :set_of_pizza_id_selected

INSERT INTO `Set_Of_Pizzas` (pizza_id_1, pizza_id_2, pizza_id_3, pizza_id_4, pizza_id_5,
       pizza_id_6, pizza_id_7, pizza_id_8, pizza_id_9, pizza_id_10, total_price)
       VALUES (:pizza_id_1, :pizza_id_2, :pizza_id_3, :pizza_id_4, :pizza_id_5,  -- taken from form
       :pizza_id_6, :pizza_id_7, :pizza_id_8, :pizza_id_9, :pizza_id_10, 
           (SELECT SUM(pizzasPrice.price)  -- sum all price from pizzas ordered
                FROM (`Set_Of_Pizzas` INNER JOIN `Pizzas` AS `p` ON
                    p.pizza_id = :pizza_id_1 OR
                    p.pizza_id = :pizza_id_2 OR
                    p.pizza_id = :pizza_id_3 OR
                    p.pizza_id = :pizza_id_4 OR
                    p.pizza_id = :pizza_id_5 OR
                    p.pizza_id = :pizza_id_6 OR
                    p.pizza_id = :pizza_id_7 OR
                    p.pizza_id = :pizza_id_8 OR
                    p.pizza_id = :pizza_id_9 OR
                    p.pizza_id = :pizza_id_10 OR
                ) AS `pizzasPrice`
            )    
       )

DELETE FROM `Set_Of_Pizzas` WHERE set_of_pizza_id = :set_of_pizza_id_selected

UPDATE `Set_Of_Pizzas` SET pizza_id_1 = :pizza_id_1, pizza_id_2=pizza_id_2, pizza_id_3=:pizza_id_3, 
        pizza_id_4=:pizza_id_4, pizza_id_5=:pizza_id_5, pizza_id_6=:pizza_id_6, pizza_id_7=:pizza_id_7,
        pizza_id_8=:pizza_id_8, pizza_id_9=:pizza_id_9, pizza_id_10=pizza_id_9, total_price:=total_price





-- Customer_Orders

SELECT customer_id, set_of_pizza_id, kids_id, order_date, price FROM `Customer_Orders`

INSERT INTO `Customer_Orders` (customer_id, set_of_pizza_id, kids_id, order_date, price)
VALUES (:customer_id, :set_of_pizza_id, :kids_id, :order_date, 
    (
        SELECT total_price FROM `Set_Of_Pizzas` WHERE set_of_pizza_i = :set_of_pizza_id
    ))

DELETE FROM `Customer_Orders` WHERE order_id = :order_id

UPDATE `Customer_Orders` SET customer_id = :customer_id, set_of_pizza_id = :set_of_pizza_id, kids_id = :kids_id, order_date = :order_date, price = :price







-- JOINS

-- Display information on all customers past orders

SELECT p.size, top1.name, top2.name, top3.name, p.total_price
 	FROM (`Customer_Orders` as `c`
    INNER JOIN `Set_Of_Pizzas` as `sp` ON c.set_of_pizza_id = sp.set_of_pizza_id
    INNER JOIN `Pizzas` as `p` ON sp.pizza_id_1 = p.pizza_id
    INNER JOIN `Pizzas` as `p` ON sp.pizza_id_2 = p.pizza_id
    INNER JOIN `Pizzas` as `p` ON sp.pizza_id_3 = p.pizza_id
    INNER JOIN `Pizzas` as `p` ON sp.pizza_id_4 = p.pizza_id
    INNER JOIN `Pizzas` as `p` ON sp.pizza_id_5 = p.pizza_id
    INNER JOIN `Pizzas` as `p` ON sp.pizza_id_6 = p.pizza_id
    INNER JOIN `Pizzas` as `p` ON sp.pizza_id_7 = p.pizza_id
    INNER JOIN `Pizzas` as `p` ON sp.pizza_id_8 = p.pizza_id
    INNER JOIN `Pizzas` as `p` ON sp.pizza_id_9 = p.pizza_id
    INNER JOIN `Pizzas` as `p` ON sp.pizza_id_10 = p.pizza_id
    INNER JOIN `Topping_Sets` as `ts` ON p.topping_sets_id = ts.topping_sets_id
    INNER JOIN `Toppings` as `top1` ON ts.topping_id_1 = top1.topping_id
    INNER JOIN `Toppings` as `top2` ON ts.topping_id_2 = top2.topping_id
    INNER JOIN `Toppings` as `top3` ON ts.topping_id_3 = top3.topping_id)
    WHERE c.customer_id = :customer_id


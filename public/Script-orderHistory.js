console.log("connected to Script-orderHistory.js");

document.getElementById("orderSearch").addEventListener("click", function(event) {

    document.getElementById("historyBody").remove();
    var select = document.getElementById("historySelect").value;
    var historySelected = "select=" + document.getElementById("historySelect").value;
    var id = "&id=" + document.getElementById("customerId").value;
       
    req = new XMLHttpRequest();
    
    req.open("GET", "/orderHistory/history?" + historySelected + id, true);

    req.addEventListener("load",  function() {
        if (req.status >= 200 && req.status <= 400) {
            let response = JSON.parse(req.responseText).data;
            console.log(response);
            let table = document.getElementById("historyDisplay");
            let body = document.createElement("tbody");
            body.setAttribute("id", "historyBody");
            body.setAttribute("class", "table");
            table.appendChild(body);

            /*************** Customer_Orders Display ***********/
            if (select == "Customer_Orders") {
                /**************Create Headers ****************/
                let row = document.createElement("tr");
                body.appendChild(row);

                    let ohead = document.createElement("td");
                    ohead.textContent = "Order Id";
                    row.appendChild(ohead);

                    let phead = document.createElement("td");
                    phead.textContent = "Pizza Set";
                    row.appendChild(phead);

                    let khead = document.createElement("td");
                    khead.textContent = "Kids Menus";
                    row.appendChild(khead);

                    let dhead = document.createElement("td");
                    dhead.textContent = "Order Date";
                    row.appendChild(dhead);

                    let prhead = document.createElement("td");
                    prhead.textContent = "Price";
                    row.appendChild(prhead);

                /************Display values from queries ***************/
                for (let i=0; i<response.length; i++) {
                    let row = document.createElement("tr");
                    body.appendChild(row);

                        let orderId = response[i].orderId;
                        let orderCell = document.createElement("td");
                        orderCell.textContent = orderId;
                        row.appendChild(orderCell);

                        let pizzaSet = response[i].pizzaSetId;
                        let pizzaSetCell = document.createElement("td");
                        pizzaSetCell.textContent = pizzaSet;
                        row.appendChild(pizzaSetCell);

                        let kidsMenus = response[i].kidsMenu;
                        let kidsCell = document.createElement("td");
                        kidsCell.textContent = kidsMenus;
                        row.appendChild(kidsCell);

                        let orderDate = response[i].orderDate;
                        let dateCell = document.createElement("td");
                        dateCell.textContent = orderDate;
                        row.appendChild(dateCell);

                        let price = response[i].price;
                        let priceCell = document.createElement("td");
                        priceCell.textContent = price;
                        row.appendChild(priceCell);
                
            
                }
            }
            /********* Set_Of_Pizzas *******************/
            if (select == "Set_Of_Pizzas") {
                let row = document.createElement("tr");
                body.appendChild(row);

                    let pizSetId = document.createElement("td");
                    pizSetId.textContent = "Pizza Set Id";
                    row.appendChild(pizSetId);

                    let pizSet1 = document.createElement("td");
                    pizSet1.textContent = "Pizza Id 1";
                    row.appendChild(pizSet1);

                    let pizSet2 = document.createElement("td");
                    pizSet2.textContent = "Pizza Id 2";
                    row.appendChild(pizSet2);

                    let pizSet3 = document.createElement("td");
                    pizSet3.textContent = "Pizza Id 3";
                    row.appendChild(pizSet3);

                    let pizSet4 = document.createElement("td");
                    pizSet4.textContent = "Pizza Id 4";
                    row.appendChild(pizSet4);

                    let pizSet5 = document.createElement("td");
                    pizSet5.textContent = "Pizza Id 5";
                    row.appendChild(pizSet5);

                    let pizSet6 = document.createElement("td");
                    pizSet6.textContent = "Pizza Id 6";
                    row.appendChild(pizSet6);

                    let pizSet7 = document.createElement("td");
                    pizSet7.textContent = "Pizza Id 7";
                    row.appendChild(pizSet7);
                    
                    let pizSet8 = document.createElement("td");
                    pizSet8.textContent = "Pizza Id 8";
                    row.appendChild(pizSet8);

                    let pizSet9 = document.createElement("td");
                    pizSet9.textContent = "Pizza Id 9";
                    row.appendChild(pizSet9);

                    let pizSet10 = document.createElement("td");
                    pizSet10.textContent = "Pizza Id 10";
                    row.appendChild(pizSet10);

                /************Display values from queries ***************/
                for (let i=0; i<response.length; i++) {
                    let row = document.createElement("tr");
                    body.appendChild(row);

                        let pizzaSetId = response[i].pizzaSetId;
                        let pizzaSetCell = document.createElement("td");
                        pizzaSetCell.textContent = pizzaSetId;
                        row.appendChild(pizzaSetCell);

                        let pizzaId1 = response[i].pizza1;
                        let pizza1Cell = document.createElement("td");
                        pizza1Cell.textContent = pizzaId1;
                        row.appendChild(pizza1Cell);

                        let pizzaId2 = response[i].pizza2;
                        let pizza2Cell = document.createElement("td");
                        pizza2Cell.textContent = pizzaId2;
                        row.appendChild(pizza2Cell);

                        let pizzaId3 = response[i].pizza3;
                        let pizza3Cell = document.createElement("td");
                        pizza3Cell.textContent = pizzaId3;
                        row.appendChild(pizza3Cell);

                        let pizzaId4 = response[i].pizza4;
                        let pizza4Cell = document.createElement("td");
                        pizza4Cell.textContent = pizzaId4;
                        row.appendChild(pizza4Cell);

                        let pizzaId5 = response[i].pizza5;
                        let pizza5Cell = document.createElement("td");
                        pizza5Cell.textContent = pizzaId5;
                        row.appendChild(pizza5Cell);

                        let pizzaId6 = response[i].pizza6;
                        let pizza6Cell = document.createElement("td");
                        pizza6Cell.textContent = pizzaId6;
                        row.appendChild(pizza6Cell);

                        let pizzaId7 = response[i].pizza7;
                        let pizza7Cell = document.createElement("td");
                        pizza7Cell.textContent = pizzaId7;
                        row.appendChild(pizza7Cell);

                        let pizzaId8 = response[i].pizza8;
                        let pizza8Cell = document.createElement("td");
                        pizza8Cell.textContent = pizzaId8;
                        row.appendChild(pizza8Cell);

                        let pizzaId9 = response[i].pizza9;
                        let pizza9Cell = document.createElement("td");
                        pizza9Cell.textContent = pizzaId9;
                        row.appendChild(pizza9Cell);

                        let pizzaId10 = response[i].pizza10;
                        let pizza10Cell = document.createElement("td");
                        pizza10Cell.textContent = pizzaId10;
                        row.appendChild(pizza10Cell);

                    }
                }

            /********* Pizzas *******************/
            if (select == "Pizzas") {
                let row = document.createElement("tr");
                body.appendChild(row);

                let pizId = document.createElement("td");
                pizId.textContent = "Pizza Id";
                row.appendChild(pizId);

                let sizeId = document.createElement("td");
                sizeId.textContent = "Size";
                row.appendChild(sizeId);

                let topId = document.createElement("td");
                topId.textContent = "Topping Set";
                row.appendChild(topId);

                let priceId = document.createElement("td");
                priceId.textContent = "Price";
                row.appendChild(priceId);

                let calId = document.createElement("td");
                calId.textContent = "Calories";
                row.appendChild(calId);

                for (let i=0; i<response.length; i++) {
                        for (let j=0; j<10; j++) {
                           
                        /************Display values from queries ***************/
                            let row = document.createElement("tr");
                            body.appendChild(row);

                            let pizzaId = response[i].ids[j];
                            let pizzaIdCell = document.createElement("td");
                            pizzaIdCell.textContent = pizzaId;
                            row.appendChild(pizzaIdCell);

                            let size = response[i].sizes[j];
                            let sizeCell = document.createElement("td");
                            sizeCell.textContent = size;
                            row.appendChild(sizeCell);

                            let topping = response[i].toppingSets[j];
                            let toppingSetCell = document.createElement("td");
                            toppingSetCell.textContent = topping;
                            row.appendChild(toppingSetCell);

                            let price = response[i].prices[j];
                            let priceCell = document.createElement("td");
                            priceCell.textContent = price;
                            row.appendChild(priceCell);

                            let calz = response[i].cals[j];
                            let calCell = document.createElement("td");
                            calCell.textContent = calz;
                            row.appendChild(calCell);


                            
                        }
                    }
                }
            }
    });



    req.send(null);
    });
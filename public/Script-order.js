console.log("connected to Script-order.js");

document.getElementById("order").addEventListener("click", function(event) {
    var sizeArr = [];
    var topping1Arr = [];
    var topping2Arr = [];
    var topping3Arr = [];

    for (var i=0; i<10; i++) {
        // collect form data
        sizeArr[i] = document.getElementById("size"+(i+1)).value;
        topping1Arr[i] = document.getElementById("topping1"+(i+1)).value;
        topping2Arr[i] = document.getElementById("topping2"+(i+1)).value;
        topping3Arr[i] = document.getElementById("topping3"+(i+1)).value;
    }

    var balloonCheck = document.getElementById("balloonChoiceId").checked ? 1:0;
    var candyCheck = document.getElementById("candyChoiceId").checked ? 1:0;
    var ballCheck = document.getElementById("ballChoiceId").checked ? 1:0;
    var autographCheck = document.getElementById("autographChoiceId").checked ? 1:0;

    customerId = "&customerId=" + document.getElementById("customerId").value;


    size = "size=" + sizeArr;
    topping1 = "&topping1=" + topping1Arr;
    topping2 = "&topping2=" + topping2Arr;
    topping3 = "&topping3=" + topping3Arr;
    balloonChoice = "&balloonChoice=" + balloonCheck;
    candyChoice = "&candyChoice=" + candyCheck;
    ballChoice = "&ballChoice=" + ballCheck;
    autographChoice = "&autographChoice=" + autographCheck;



    var req = new XMLHttpRequest();

    req.open("POST", "/checkout?" + size + customerId + topping1 + topping2 + topping3 + balloonChoice + candyChoice + ballChoice + autographChoice, false);

    req.send(size + customerId + topping1 + topping2 + topping3 + balloonChoice + candyChoice + ballChoice + autographChoice, false);


    //window.location.replace("/checkout?result=" + "load", false);
    
});
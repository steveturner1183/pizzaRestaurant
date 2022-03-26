/*
    SETUP
*/
var express = require('express');
var helmet = require('helmet');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

var app = express();
// immediately create header security options 
// app.use(helmet({contentSecurityPolicy: false,}));
// app.use(helmet.referrerPolicy({ policy: 'no-referrer' }));

// set using info
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.set('port', process.env.PORT || 5001);
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// make url encoded info in query string usable
var queryParams = function(req, res, next) {
    res.parts = req.query;
    next();
};
app.use(queryParams);

// Database
var db = require('./database/db-connector.js')

//New Functions for each section
app.set('connection', db.pool);
app.use('/accountManagement', require('./routes/accountManagement.js'));
app.use('/checkout', require('./routes/checkout.js'));
app.use('/kidsMenus', require('./routes/kidsMenus.js'));
app.use('/order', require('./routes/order.js','./public/style.css'));
app.use('/orderHistory', require('./routes/orderHistory.js'));
app.use('/toppings', require('./routes/toppings.js'));
app.use('/hiddenManagement', require('./routes/hiddenManagement.js'));


// Homepage
app.get('/', function(req, res)
{  
        res.render('index');
});

// About page
app.get('/about', function(req, res)
{  
    res.render('about');
    });


// // Pizzas Table
// app.get('/about', function(req, res)
// {  
//     res.render('about');
//     });

// // Set_Of_Pizzas Table
// app.get('/about', function(req, res)
// {  
//     res.render('about');
//     });

// // Customer_Orders Table
// app.get('/about', function(req, res)
// {  
//     res.render('about');
//     });

// 404 error route
app.use(function(req,res){
    res.status(404);
    res.render('404');
  });
    
  // 500 server error route
app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
  });

/*
    LISTENER
*/
app.listen(app.get('port'), function(){
    console.log('Express started on http://' + process.env.HOSTNAME + ':' + app.get('port') + '; press Ctrl-C to terminate.')
});

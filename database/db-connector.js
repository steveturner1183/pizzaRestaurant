// Get an instance of mysql we can use in the app
var mysql = require('mariadb')

// Create a 'connection pool' using the provided credentials
// var pool = mysql.createPool({
//     connectionLimit : 10,
//     host            : 'classmysql.engr.oregonstate.edu',
//     user            : 'cs340_[your_onid]',
//     password        : '[your_db_password]',
//     database        : 'cs340_[your_onid]'
// })

var pool = mysql.createPool(process.env.JAWSDB_MARIA_URL);
pool.getConnection().then(conn => {
    console.log("Good database connection");
    conn.end();
})
.catch(err =>{
    console.log('Error connection to database ' + err.message);
});

// Export it for use in our applicaiton
module.exports.pool = pool;
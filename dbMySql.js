// var mysql = require('mysql');

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root@localhost",
//   password: "alapan@123"
// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

// Import mysql module
let mysql = require('mysql');

// Setup database connection parameter
let connection = mysql.createConnection({
host: 'localhost',
user: 'root',
password: 'Alapan@123',
database: 'new_schema1'
});

// Connect with the database
connection.connect(function(e) {
if (e) {

// Show error messaage on failure
return console.error('error: ' + e.message);
}

// Show success message if connected
console.log('\nConnected to the MySQL server...\n');
});

// Set the query message
$query = 'SELECT * from shop';

// Execute the database query
connection.query($query, function(e, rows) {
if(e){

// Show the error message
console.log("Error ocurred in executing the query.");
return;
}
/* Display the formatted data retrieved from 'book' table
using for loop */
console.log("The records of shop table:\n");
console.log("Article\t\t\t\t Dealer\t\tprice\n");
for(let row of rows) {
  console.log(row['article'],"\t\t",row['dealer'],"\t","$",row['price']);
}
});

// Close the database connection
connection.end(function(){
console.log('\nConnection closed.\n');
});

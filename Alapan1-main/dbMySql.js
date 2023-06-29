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

const message2 =require("./logic");

console.log(message2.message);

let mysql = require('mysql');

// Setup database connection parameter
let connection = mysql.createConnection({
host: 'localhost',
user: 'root',
password: 'Avi@1999',
database: 'user_list'
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

//import from logic

const ticket = require('./logic');

// console.log("--Ticket_list--\n"+ticket.passVar());

//Insert into DB

const insertQuery = 'INSERT INTO tickets (ticket_id,tickets) VALUES("A1","B1");';

// console.error('Error inserting data into MySQL database:', err);
connection.query(insertQuery, (err, result) => {
  if (err) {  return;}
  console.log('Data inserted successfully');
  console.log('Inserted ID:', result.insertId);
});

// Set the display query message
$query = 'SELECT * from tickets';

// Execute the database query
connection.query($query, function(e, rows) {
if(e){

// Show the error message
console.log("Error ocurred in executing the query.");
return;
}
/* Display the formatted data retrieved from table
using for loop */
console.log("The records of tickets table:\n");
console.log("Ticket_id\tTickets\n");
for(let row of rows) {
  console.log(row['ticket_id'],"\t\t",row['tickets']);
}
});

// Close the database connection
connection.end(function(){
console.log('\nConnection closed.\n');
});

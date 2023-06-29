const express = require('express');
const mysql = require('mysql');

const app = express();

// Configure middleware to parse request body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Create MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Avi@1999',
  database: 'user_list',
});

// Define a route for user login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Perform database query using MySQL connection pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error establishing database connection:', err);
      return res.status(500).json({ error: 'Database connection error' });
    }

    // Check if the username and password match a user in the database
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    connection.query(query, [username, password], (error, results) => {
      connection.release(); // Release the connection back to the pool

      if (error) {
        console.error('Error executing database query:', error);
        return res.status(500).json({ error: 'Database query error' });
      }

      // Check if a user with the provided credentials exists
      if (results.length === 0) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }

      // Login successful
      return res.status(200).json({ message: 'Login successful' });
    });
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

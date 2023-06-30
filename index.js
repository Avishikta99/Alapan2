const express = require('express');
const { body, validationResult } = require('express-validator');
const mysql = require('mysql');

const app = express();

// Configure middleware to parse request body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Create MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Alapan@123',
  database: 'new_schema1'

});

// Define a route with validation and MySQL interaction
app.post('/register', [
  body('username')
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 5 })
    .withMessage('Username must be at least 5 characters long')
    .isAlphanumeric()
    .withMessage('Username can only contain letters and numbers')
    .trim()
    .escape(),
  body('email')
    .isEmail()
    .withMessage('Invalid email address')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
], (req, res) => {
  // Handle the request and validate the inputs
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Inputs are valid, proceed with registration
  const { username, email, password } = req.body;

  // Perform database query using MySQL connection pool
  pool.getConnection((err, connection) => {
    if (err) {
      console.error('Error establishing database connection:', err);
      return res.status(500).json({ error: 'Database connection error' });
    }

    // Insert user data into the database
    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    connection.query(query, [username, email, password], (error, results) => {
      connection.release(); // Release the connection back to the pool

      if (error) {
        console.error('Error executing database query:', error);
        return res.status(500).json({ error: 'Database query error' });
      }

      // Registration successful
      return res.status(200).json({ message: 'Registration successful' });
    });
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

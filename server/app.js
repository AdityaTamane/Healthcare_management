require('dotenv').config(); 
const express = require('express');
const app = express();
const mysql = require('mysql2');
const authRoutes = require('./routes/auth');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
    return;
  }
  console.log('Connected to database');
});

app.use(express.json());
app.use('/api', authRoutes);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});



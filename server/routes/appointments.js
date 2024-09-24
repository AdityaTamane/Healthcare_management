// server/routes/appointments.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Get all appointments
router.get('/appointments', (req, res) => {
  const query = 'SELECT * FROM appointments';
  
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Create a new appointment
router.post('/appointments', (req, res) => {
  const { patientName, doctor, date, status } = req.body;
  const query = 'INSERT INTO appointments (patientName, doctor, date, status) VALUES (?, ?, ?, ?)';
  
  db.query(query, [patientName, doctor, date, status], (err, result) => {
    if (err) throw err;
    res.json({ success: true, message: 'Appointment added' });
  });
});

module.exports = router;


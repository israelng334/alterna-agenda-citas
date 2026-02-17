// Basic Express server setup

const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
const Appointment = require('./Appointment');

// Example booking route

app.get('/api/bookings', (req, res) => {
  res.json({ message: 'Bookings endpoint' });
});

// Create appointment
app.post('/api/appointments', async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Example admin route
app.get('/api/admin', (req, res) => {
  res.json({ message: 'Admin endpoint' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

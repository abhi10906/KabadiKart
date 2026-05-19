require('dotenv').config({ path: './.env' });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const bookingRoutes = require('./routes/bookingRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// ✅ Middleware FIRST — before any routes
app.use(cors());
app.use(express.json());

// ✅ Routes AFTER middleware
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);

app.get('/', (req, res) => {
  res.send('KabadiKart Backend is Running!');
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected');
    app.listen(5000, () => console.log('Server running on port 5000'));
  })
  .catch((err) => console.log(err));
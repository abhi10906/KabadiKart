const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// TEST ROUTE (for debugging)
router.delete('/test', (req, res) => {
  res.send("DELETE WORKING");
});

// POST
router.post('/', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    const saved = await booking.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET
router.get('/', async (req, res) => {
  const bookings = await Booking.find();
  res.json(bookings);
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: 'Booking deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE booking
router.put('/:id', async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,   // which booking
      req.body,        // new data
      { new: true, runValidators: true } // return updated + validate
    );

    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json(updatedBooking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
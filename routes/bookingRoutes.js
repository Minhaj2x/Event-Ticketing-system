const express = require('express');
const Booking = require('../models/Booking');
const Event = require('../models/Event');
const { authenticateUser } = require('../middleware/auth');

const router = express.Router();

// GET /api/bookings - user’s bookings
router.get('/', authenticateUser, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.userId }).populate('event');
    res.json(bookings);
  } catch (err) {
    console.error('Get bookings error:', err);
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
});

// POST /api/bookings - book event tickets
router.post('/', authenticateUser, async (req, res) => {
  const { eventId, quantity } = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    if (event.bookedSeats + quantity > event.seatCapacity) {
      return res.status(400).json({ message: 'Not enough seats available' });
    }

    event.bookedSeats += quantity;
    await event.save();

    const booking = await Booking.create({
      user: req.user.userId,
      event: eventId,
      quantity
    });

    res.status(201).json({ message: 'Booking successful', booking });
  } catch (err) {
    console.error('Create booking error:', err);
    res.status(500).json({ message: 'Failed to book event' });
  }
});

module.exports = router;

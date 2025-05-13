const express = require('express');
const Event = require('../models/Event');
const { authenticateUser, authorizeAdmin } = require('../middleware/auth');

const router = express.Router();

// GET /api/events - list all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    console.error('Fetch events error:', err);
    res.status(500).json({ message: 'Failed to fetch events' });
  }
});

// POST /api/events - create event (admin only)
router.post('/', authenticateUser, authorizeAdmin, async (req, res) => {
  const {
    title,
    description,
    category,
    venue,
    date,
    time,
    seatCapacity,
    price
  } = req.body;

  try {
    const newEvent = await Event.create({
      title,
      description,
      category,
      venue,
      date,
      time,
      seatCapacity,
      price
    });

    res.status(201).json({ message: 'Event created', event: newEvent });
  } catch (err) {
    console.error('Create event error:', err);
    res.status(500).json({ message: 'Failed to create event' });
  }
});

module.exports = router;

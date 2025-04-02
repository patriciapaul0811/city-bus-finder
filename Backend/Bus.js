// models/Bus.js - MongoDB model for bus routes

const mongoose = require('mongoose');

const BusSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  startPoint: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  destination: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  departureTime: {
    type: String,
    required: true
  },
  arrivalTime: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  daysOfOperation: {
    type: [String],
    default: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Bus', BusSchema);

// routes/busRoutes.js - API routes for bus operations

const express = require('express');
const router = express.Router();
const Bus = require('../models/Bus');

// Get all buses
router.get('/', async (req, res) => {
  try {
    const buses = await Bus.find({ active: true });
    res.json(buses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Search buses by route
router.get('/search', async (req, res) => {
  try {
    const { startPoint, destination, date } = req.query;
    
    if (!startPoint || !destination) {
      return res.status(400).json({ message: 'Start point and destination are required' });
    }
    
    // Convert the date to a day of the week
    const dayOfWeek = date ? new Date(date).toLocaleDateString('en-US', { weekday: 'long' }) : null;
    
    const query = {
      startPoint: { $regex: startPoint, $options: 'i' },
      destination: { $regex: destination, $options: 'i' },
      active: true
    };
    
    // Add day of week filter if provided
    if (dayOfWeek) {
      query.daysOfOperation = dayOfWeek;
    }
    
    const buses = await Bus.find(query);
    
    if (buses.length === 0) {
      return res.status(404).json({ message: 'No buses found for this route' });
    }
    
    res.json(buses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get bus by ID
router.get('/:id', async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (!bus) {
      return res.status(404).json({ message: 'Bus not found' });
    }
    res.json(bus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add new bus route
router.post('/', async (req, res) => {
  const bus = new Bus(req.body);
  
  try {
    const newBus = await bus.save();
    res.status(201).json(newBus);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update bus route
router.patch('/:id', async (req, res) => {
  try {
    const bus = await Bus.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!bus) {
      return res.status(404).json({ message: 'Bus not found' });
    }
    res.json(bus);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete bus route
router.delete('/:id', async (req, res) => {
  try {
    const bus = await Bus.findByIdAndDelete(req.params.id);
    if (!bus) {
      return res.status(404).json({ message: 'Bus not found' });
    }
    res.json({ message: 'Bus deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
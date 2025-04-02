const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
  routeNumber: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: String,
  stops: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BusStop' }],
  active: { type: Boolean, default: true },
  schedule: [{ 
    day: String, 
    departureTime: [String],
    frequency: Number // in minutes
  }]
});

// Create indexes for frequently queried fields
routeSchema.index({ routeNumber: 1 });
routeSchema.index({ active: 1 });

module.exports = mongoose.model('Route', routeSchema);
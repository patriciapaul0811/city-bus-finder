const mongoose = require('mongoose');

const busStopSchema = new mongoose.Schema({
  stopId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number] // [longitude, latitude]
  },
  routes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Route' }],
  amenities: {
    shelter: Boolean,
    bench: Boolean,
    lighting: Boolean
  }
});

// Create indexes for geospatial queries and frequent lookups
busStopSchema.index({ location: '2dsphere' });
busStopSchema.index({ stopId: 1 });
busStopSchema.index({ name: 'text' }); // For text search on stop names

module.exports = mongoose.model('BusStop', busStopSchema);
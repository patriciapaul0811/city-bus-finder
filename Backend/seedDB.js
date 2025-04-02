// scripts/seedDB.js - Script to populate the database with initial bus data

const mongoose = require('mongoose');
const Bus = require('../models/Bus');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cityBusFinder', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Initial bus data
const busSeedData = [
  {
    name: "Express X1",
    startPoint: "downtown",
    destination: "airport",
    departureTime: "07:30",
    arrivalTime: "08:15",
    duration: "45 min",
    daysOfOperation: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  },
  {
    name: "Airport Shuttle",
    startPoint: "downtown",
    destination: "airport",
    departureTime: "08:00",
    arrivalTime: "08:55",
    duration: "55 min",
    daysOfOperation: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  },
  {
    name: "Express X1",
    startPoint: "downtown",
    destination: "airport",
    departureTime: "08:30",
    arrivalTime: "09:15",
    duration: "45 min",
    daysOfOperation: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  },
  {
    name: "Route 42",
    startPoint: "downtown",
    destination: "university",
    departureTime: "07:15",
    arrivalTime: "07:45",
    duration: "30 min",
    daysOfOperation: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
  },
  {
    name: "Campus Express",
    startPoint: "downtown",
    destination: "university",
    departureTime: "07:45",
    arrivalTime: "08:10",
    duration: "25 min",
    daysOfOperation: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
  },
  {
    name: "City Link",
    startPoint: "suburb",
    destination: "downtown",
    departureTime: "06:30",
    arrivalTime: "07:15",
    duration: "45 min",
    daysOfOperation: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
  },
  {
    name: "Commuter 99",
    startPoint: "suburb",
    destination: "downtown",
    departureTime: "07:00",
    arrivalTime: "07:40",
    duration: "40 min",
    daysOfOperation: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
  },
  {
    name: "Commuter 99",
    startPoint: "suburb",
    destination: "downtown",
    departureTime: "07:30",
    arrivalTime: "08:10",
    duration: "40 min",
    daysOfOperation: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
  },
  {
    name: "Coastal Line",
    startPoint: "mall",
    destination: "beach",
    departureTime: "09:00",
    arrivalTime: "09:45",
    duration: "45 min",
    daysOfOperation: ["Saturday", "Sunday"]
  },
  {
    name: "Beach Express",
    startPoint: "mall",
    destination: "beach",
    departureTime: "10:30",
    arrivalTime: "11:05",
    duration: "35 min",
    daysOfOperation: ["Saturday", "Sunday"]
  }
];

// Function to seed the database
async function seedDB() {
  try {
    // Delete existing data
    await Bus.deleteMany({});
    console.log('Previous bus data deleted');
    
    // Insert new data
    const insertedBuses = await Bus.insertMany(busSeedData);
    console.log(`${insertedBuses.length} buses inserted into the database`);
    
    // Close connection
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDB();
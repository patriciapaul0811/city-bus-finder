const express = require('express');
const dotenv = require('dotenv');
const { errorHandler } = require('./middleware/errorHandler');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

// Route files
const routeRoutes = require('./routes/routeRoutes');
const stopRoutes = require('./routes/stopRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Body parser
app.use(express.json());

// Mount routers
app.use('/api/v1/routes', routeRoutes);
app.use('/api/v1/stops', stopRoutes);
app.use('/api/v1/auth', authRoutes);

// Error handler middleware
app.use(errorHandler);

module.exports = app;
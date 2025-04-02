const Route = require('../models/route');

// CREATE - Add a new route
exports.createRoute = async (req, res, next) => {
  try {
    const newRoute = new Route(req.body);
    const savedRoute = await newRoute.save();
    res.status(201).json({
      success: true,
      data: savedRoute
    });
  } catch (error) {
    next(error);
  }
};

// READ - Get all routes
exports.getAllRoutes = async (req, res, next) => {
  try {
    const routes = await Route.find().populate('stops');
    res.status(200).json({
      success: true,
      count: routes.length,
      data: routes
    });
  } catch (error) {
    next(error);
  }
};

// READ - Get single route
exports.getRoute = async (req, res, next) => {
  try {
    const route = await Route.findById(req.params.id).populate('stops');
    if (!route) {
      return res.status(404).json({
        success: false,
        message: 'Route not found'
      });
    }
    res.status(200).json({
      success: true,
      data: route
    });
  } catch (error) {
    next(error);
  }
};

// UPDATE - Update a route
exports.updateRoute = async (req, res, next) => {
  try {
    const route = await Route.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!route) {
      return res.status(404).json({
        success: false,
        message: 'Route not found'
      });
    }
    res.status(200).json({
      success: true,
      data: route
    });
  } catch (error) {
    next(error);
  }
};

// DELETE - Delete a route
exports.deleteRoute = async (req, res, next) => {
  try {
    const route = await Route.findByIdAndDelete(req.params.id);
    if (!route) {
      return res.status(404).json({
        success: false,
        message: 'Route not found'
      });
    }
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};
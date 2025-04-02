const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

const {
  createRoute,
  getAllRoutes,
  getRoute,
  updateRoute,
  deleteRoute
} = require('../controllers/routeController');

router
  .route('/')
  .get(getAllRoutes)
  .post(protect, authorize('admin'), createRoute);

router
  .route('/:id')
  .get(getRoute)
  .put(protect, authorize('admin'), updateRoute)
  .delete(protect, authorize('admin'), deleteRoute);

module.exports = router;

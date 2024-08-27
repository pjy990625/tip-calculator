const express = require('express');
const router = express.Router();
const { getAllLocations, getLocationById } = require('../controllers/locationController');

// Define a route to get all locations
router.get('/locations', getAllLocations);
// Define a route to get the selected location
router.get('/locations/:location_id', getLocationById);

module.exports = router;

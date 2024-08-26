const express = require('express');
const router = express.Router();
const { getAllLocations } = require('../controllers/locationController');

// Define a route to get all locations
router.get('/locations', getAllLocations);

module.exports = router;

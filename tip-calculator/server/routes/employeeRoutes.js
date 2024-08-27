const express = require('express');
const router = express.Router();
const {
    getServers,
    getKitchenStaff
} = require('../controllers/employeeController');

// Define a route to get all servers in a specific location
router.get('/:location_id/servers', getServers);

// Define a route to get all kitchen staff in a specific location
router.get('/:location_id/kitchen-staff', getKitchenStaff);

module.exports = router;

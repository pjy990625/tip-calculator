const express = require('express');
const router = express.Router();
const {
    getServers,
    getKitchenStaff,
    addAnEmployee
} = require('../controllers/employeeController');

// Define a route to get all servers in a specific location
router.get('/:location_id/servers', getServers);

// Define a route to get all kitchen staff in a specific location
router.get('/:location_id/kitchen-staff', getKitchenStaff);

// Define a route to add an employee
router.post('/:location_id', addAnEmployee);

module.exports = router;

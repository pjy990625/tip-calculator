const express = require('express');
const router = express.Router();
const {
    getServersInPoco,
    getKitchenStaffInPoco,
    getServersInLangley,
    getKitchenStaffInLangley
} = require('../controllers/employeeController');


// ----- Port Coquiltam Location -----
// Define a route to get tips
router.get('/poco/tips', getServersInPoco);

// Define a route to get all kitchen staff
router.get('/poco/kitchen-staff', getKitchenStaffInPoco);

// ----- Langley Location -----
// Define a route to get all servers
router.get('/langley/servers', getServersInLangley);

// Define a route to get all kitchen staff
router.get('/langley/kitchen-staff', getKitchenStaffInLangley);

module.exports = router;
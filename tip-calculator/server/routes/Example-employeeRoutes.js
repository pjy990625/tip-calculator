const express = require('express');
const router = express.Router();
const {
    getServersInPoco,
    getKitchenStaffInPoco,
    getServersInLangley,
    getKitchenStaffInLangley
} = require('../controllers/Example- employeeController');


// ----- Port Coquiltam Location -----
// Define a route to get all servers
router.get('/:branch_id/servers', getServersInPoco);

// Define a route to get all kitchen staff
router.get('/:branch_id/kitchen-staff', getKitchenStaffInPoco);

// ----- Langley Location -----
// Define a route to get all servers
router.get('/langley/servers', getServersInLangley);

// Define a route to get all kitchen staff
router.get('/langley/kitchen-staff', getKitchenStaffInLangley);
// // ----- Port Coquiltam Location -----
// // Define a route to get all servers
// router.get('/poco/servers', getServersInPoco);

// // Define a route to get all kitchen staff
// router.get('/poco/kitchen-staff', getKitchenStaffInPoco);

// // ----- Langley Location -----
// // Define a route to get all servers
// router.get('/langley/servers', getServersInLangley);

// // Define a route to get all kitchen staff
// router.get('/langley/kitchen-staff', getKitchenStaffInLangley);

module.exports = router;
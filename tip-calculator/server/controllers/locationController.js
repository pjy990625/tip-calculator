const pool = require('../db/db');

// Function to get all locations
const getAllLocations = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT * FROM locations`
        );
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching locations', err);
        res.status(500).json({ error: 'Database error' });
    }
}

// Function to get all servers
// const getBranchByName = async (req, res) => {
//     try {
//         const { branch_name } = req.query; // Read branch_name from query parameters
//         console.log(branch_name)

//         const result = await pool.query(
//             `SELECT employee_name FROM employees WHERE branch_id = ${branch_id}`
//         );
//         res.status(200).json(result.rows);
//     } catch (err) {
//         console.error('Error fetching branch', err);
//         res.status(500).json({ error: 'Database error' });
//     }
// }

module.exports = { getAllLocations };
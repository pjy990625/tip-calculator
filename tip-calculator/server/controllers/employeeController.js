const pool = require('../db/db');

// Function to get all servers in select location
const getServers = async (req, res) => {
    try {
        const { location_id } = req.query; // Read location_id from query parameters
        console.log(location_id);

        if (!location_id) {
            return res.status(400).json({ error: 'Location id is missing' });
        }

        const result = await pool.query(
            `SELECT * FROM employees WHERE location_id = ${location_id} AND employee_role = 'S'`
        );
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching servers', err);
        res.status(500).json({ error: 'Database error' });
    }
}

// Function to get all kitchen staff in select location
const getKitchenStaff = async (req, res) => {
    try {
        const { location_id } = req.query; // Read location_id from query parameters
        console.log(location_id);

        if (!location_id) {
            return res.status(400).json({ error: 'Location id is missing' });
        }

        const result = await pool.query(
            `SELECT * FROM employees WHERE location_id = ${location_id} AND employee_role = 'K'`
        );
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching kitchen staff', err);
        res.status(500).json({ error: 'Database error' });
    }
}

module.exports = { getServers, getKitchenStaff };
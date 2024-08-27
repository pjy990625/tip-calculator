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

// Function to get the selected location by id
const getLocationById = async (req, res) => {
    try {
        const { location_id } = req.query;

        const result = await pool.query(
            `SELECT * FROM locations where location_id = ${location_id}`
        );
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error('Error fetching the selected location', err);
        res.status(500).json({ error: 'Database error' });
    }
}

module.exports = { getAllLocations, getLocationById };
const pool = require('../db/db');

// Get all servers in select location
const getServers = async (req, res) => {
    try {
        const { location_id } = req.query; // Read location_id from query parameters
        console.log(location_id);

        if (!location_id) {
            return res.status(400).json({ error: 'Location id is missing!' });
        }

        const result = await pool.query(
            `SELECT * FROM employees WHERE location_id = ${location_id} AND employee_role = 'S'`
        );
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching servers', err);
        res.status(500).json({ error: 'Database error!' });
    }
}

// Get all kitchen staff in select location
const getKitchenStaff = async (req, res) => {
    try {
        const { location_id } = req.query; // Read location_id from query parameters
        console.log(location_id);

        if (!location_id) {
            return res.status(400).json({ error: 'Location id is missing!' });
        }

        const result = await pool.query(
            `SELECT * FROM employees WHERE location_id = ${location_id} AND employee_role = 'K'`
        );
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching kitchen staff', err);
        res.status(500).json({ error: 'Database error!' });
    }
}

// Add an employee
const addAnEmployee = async (req, res) => {
    const { employee_name, employee_role } = req.body;

    if (!employee_name || employee_role) {
        return res.status(400).json({ error: 'Both name and role are needed!' });
    }

    try {
        const result = await pool.query(
            `INSERT INTO employees (employee_name, employee_role) VALUES (${employee_name}, ${employee_role}) RETURNING *`,
            [employee_name, employee_role]
            );
            res.json(result.rows[0]);
        } catch(err) {
            res.status(500).json({ error: 'Database error!' });
    }
}

module.exports = { getServers, getKitchenStaff, addAnEmployee };
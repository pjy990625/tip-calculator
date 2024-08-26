const pool = require('../db/db');

// Function to get all servers
const getServers = async (req, res) => {
    try {
        const { branch_id } = req.query; // Read branch_id from query parameters
        console.log(branch_id)

        const result = await pool.query(
            `SELECT employee_name FROM employees WHERE branch_id = ${branch_id} AND employee_role = 'S'`
        );
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching servers', err);
        res.status(500).json({ error: 'Database error' });
    }
}

// Function to get all kitchen staff
const getKitchenStaff = async (req, res) => {
    try {
        const { branch_id } = req.query; // Read branch_id from query parameters
        console.log(branch_id)
        
        const result = await pool.query(
            `SELECT employee_name FROM employees WHERE branch_id = ${branch_id} AND employee_role = 'K'`
        );
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching kitchen staff', err);
        res.status(500).json({ error: 'Database error' });
    }
}

module.exports = { getServers, getKitchenStaff };
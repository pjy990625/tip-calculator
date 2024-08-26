const pool = require('../db/db');

// ----- Port Coquitlam Location -----
// Function to get servers
const getServersInPoco = async (req, res) => {
    try {
        const { branch_name } = req.query; // Read branch_name from query parameters
        console.log(branch_name)

        const result = await pool.query(
            `SELECT employee_name FROM employees WHERE branch_id = 1 AND employee_role = 'S'`
        );
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching Poco servers', err);
        res.status(500).json({ error: 'Database error' });
    }
}

// Function to get kitchen staff
const getKitchenStaffInPoco = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT employee_name FROM employees WHERE branch_id = 1 AND employee_role = 'K'`
        );
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching Poco kitchen staff', err);
        res.status(500).json({ error: 'Database error' });
    }
}

// ----- Langley Location -----
// Function to get servers
const getServersInLangley = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT employee_name FROM employees WHERE branch_id = 2 AND employee_role = 'S'`
        );
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching Langley servers', err);
        res.status(500).json({ error: 'Database error' });
    }
}

// Function to get kitchen staff
const getKitchenStaffInLangley = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT employee_name FROM employees WHERE branch_id = 2 AND employee_role = 'K'`
        );
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching Langley kitchen staff', err);
        res.status(500).json({ error: 'Database error' });
    }
}

module.exports = { getServersInPoco, getKitchenStaffInPoco, getServersInLangley, getKitchenStaffInLangley };
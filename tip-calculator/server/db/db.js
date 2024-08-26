const Pool = require('pg').Pool;

require('dotenv').config();

// Create a pool to manage multiple connections
const pool = new Pool({
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.DBPORT,
    database: 'kai'
});

module.exports = pool;
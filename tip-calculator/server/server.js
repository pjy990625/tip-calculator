const express = require('express');
const cors = require('cors');
const locationRoutes = require('./routes/locationRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();

// Enable CORS for all routes
app.use(cors());

// Use JSON for request body parsing
app.use(express.json());

// Set up API routes
app.use('/api', locationRoutes);
app.use('/api', employeeRoutes);

app.get('/', (req, res) => {
    res.send('hello')
})

// Start the server
const PORT = process.env.PORT ?? 8000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
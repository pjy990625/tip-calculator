const PORT = process.env.PORT ?? 8000
const express = require('express')
const app = express()
const pool = require('./db')

// app.get('/', (req, res) => {
//     res.send('hello')
// })

//get all branches
app.get('/branches', async (req, res) => {
    try {
        const kai = await pool.query('SELECT * FROM branches')
        res.json(kai.rows)
    } catch (err) {
        console.log(err);
    }
})

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))
const express = require('express')
const router = express.Router()

// Login
router.get('/login', (req, res) => res.send('Welcome to /login'))
// Register
router.get('/register', (req, res) => res.send('Welcome to /users'))

module.exports = router

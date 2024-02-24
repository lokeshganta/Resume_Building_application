// authRoutes.js

const express = require('express');
const router = express.Router();

// Register route
router.get('/register', (req, res) => {
  // Render your registration form or send a response
  res.send('This is the registration page');
});

// Login route
router.get('/login', (req, res) => {
  // Render your login form or send a response
  res.send('This is the login page');
});

module.exports = router;

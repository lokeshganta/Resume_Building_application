// routes/api.js
const express = require('express');
const isAuthenticated = require('../middleware/isAuthenticated');

const router = express.Router();

router.get('/data', isAuthenticated, (req, res) => {
  res.json({ message: 'Protected data accessed' });
});

module.exports = router;

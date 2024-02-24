const express = require('express');
const passport = require('passport');
const router = express.Router();
const isAuthenticated = require('../middleware/isAuthenticated');

router.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ message: 'Login successful', user: req.user });
});

router.post('/logout', (req, res) => {
  req.logout();
  res.json({ message: 'Logout successful' });
});

router.get('/user', isAuthenticated, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;

// routes/profile.js
const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Profile Route
router.get('/profile', async (req, res) => {
  try {
    // Assuming you have some authentication middleware to set req.user
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

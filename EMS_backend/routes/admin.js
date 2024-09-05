// routes/admin.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Admin creates a new user
router.post('/create-user', async (req, res) => {
  try {
    const { username, email, role, password } = req.body;

    const newUser = new User({
      username,
      email,
      role,
      password // Admin sets the initial password
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully', newUser });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

module.exports = router;

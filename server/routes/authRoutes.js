const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { generateAdminToken } = require('../middleware/adminAuth');

// @route   POST /api/auth/login
// @desc    Admin login
// @access  Public
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate input
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide username and password'
            });
        }

        // Check credentials against environment variables
        const validUsername = process.env.ADMIN_USERNAME;
        const validPassword = process.env.ADMIN_PASSWORD;

        if (username !== validUsername || password !== validPassword) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        // Generate JWT token
        const token = generateAdminToken();

        res.json({
            success: true,
            message: 'Login successful',
            token
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// @route   GET /api/auth/verify
// @desc    Verify token validity
// @access  Private
router.get('/verify', require('../middleware/adminAuth').adminAuth, (req, res) => {
    res.json({
        success: true,
        message: 'Token is valid',
        admin: req.admin
    });
});

module.exports = router;

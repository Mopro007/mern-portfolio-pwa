const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile.model.js');
const { adminAuth } = require('../middleware/adminAuth');

// @route   GET /api/profile
// @desc    Get profile (public)
// @access  Public
router.get('/', async (req, res) => {
    try {
        const profile = await Profile.getProfile();
        res.json({
            success: true,
            data: profile
        });
    } catch (error) {
        console.error('Get profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// @route   PUT /api/profile
// @desc    Update profile
// @access  Private (Admin)
const upload = require('../middleware/uploadConfig');

// @route   POST /api/profile/upload
// @desc    Upload file to Cloudinary
// @access  Private (Admin)
router.post('/upload', adminAuth, upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: 'No file uploaded'
        });
    }

    res.json({
        success: true,
        message: 'File uploaded successfully',
        url: req.file.path
    });
});

// @route   PUT /api/profile
// @desc    Update profile
// @access  Private (Admin)
router.put('/', adminAuth, async (req, res) => {
    try {
        const profile = await Profile.getProfile();

        // Fields that can be updated
        const updateFields = [
            'name', 'title', 'subtitle', 'bio', 'about_me_text',
            'contact_info', // Updated from email/phone
            'social_links', // Updated from object to array
            'profile_image_url', 'resume_url',
            'stats', 'skills', 'services',
            'education', 'experience' // New fields
        ];

        // Update only provided fields
        updateFields.forEach(field => {
            if (req.body[field] !== undefined) {
                profile[field] = req.body[field];
            }
        });

        await profile.save();

        res.json({
            success: true,
            message: 'Profile updated successfully',
            data: profile
        });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// @route   PUT /api/profile/skills
// @desc    Update skills only
// @access  Private (Admin)
router.put('/skills', adminAuth, async (req, res) => {
    try {
        const profile = await Profile.getProfile();

        if (!Array.isArray(req.body.skills)) {
            return res.status(400).json({
                success: false,
                message: 'Skills must be an array'
            });
        }

        profile.skills = req.body.skills;
        await profile.save();

        res.json({
            success: true,
            message: 'Skills updated successfully',
            data: profile.skills
        });
    } catch (error) {
        console.error('Update skills error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

// @route   PUT /api/profile/services
// @desc    Update services only
// @access  Private (Admin)
router.put('/services', adminAuth, async (req, res) => {
    try {
        const profile = await Profile.getProfile();

        if (!Array.isArray(req.body.services)) {
            return res.status(400).json({
                success: false,
                message: 'Services must be an array'
            });
        }

        profile.services = req.body.services;
        await profile.save();

        res.json({
            success: true,
            message: 'Services updated successfully',
            data: profile.services
        });
    } catch (error) {
        console.error('Update services error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
});

module.exports = router;

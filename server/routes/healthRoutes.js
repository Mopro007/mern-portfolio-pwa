const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

/**
 * @route   GET /api/health
 * @desc    Check server and database health
 * @access  Public
 */
router.get('/', async (req, res) => {
    try {
        const dbStatus = mongoose.connection.readyState;
        const dbStatusMap = {
            0: 'Disconnected',
            1: 'Connected',
            2: 'Connecting',
            3: 'Disconnecting',
            99: 'Uninitialized',
        };

        const healthcheck = {
            uptime: process.uptime(),
            timestamp: Date.now(),
            date: new Date().toISOString(),
            status: 'OK',
            database: {
                status: dbStatusMap[dbStatus] || 'Unknown',
                code: dbStatus
            },
            memory: {
                rss: Math.round(process.memoryUsage().rss / 1024 / 1024) + " MB",
                heapTotal: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + " MB",
                heapUsed: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + " MB",
            },
            server: {
                nodeVersion: process.version,
                platform: process.platform,
                pid: process.pid
            }
        };

        if (dbStatus !== 1) {
            healthcheck.status = 'Error';
            healthcheck.error = 'Database not connected';
            return res.status(503).json(healthcheck);
        }

        res.status(200).json(healthcheck);
    } catch (error) {
        healthcheck.status = 'Error';
        healthcheck.error = error.message;
        res.status(503).json(healthcheck);
    }
});

module.exports = router;

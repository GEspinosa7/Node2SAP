const express = require('express');

const { getSAPUserDetail } = require('./controllers/sap');

const router = express();

router.get('/test', (req, res) => {
    try {
        return res.status(200).json({ success: 'running...' });
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
});

router.get('/user/:username', getSAPUserDetail);

module.exports = router;
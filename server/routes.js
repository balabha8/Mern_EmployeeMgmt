const express = require('express');

const router = express.Router();
const orgRoutes = require('./Routes/orgRoutes');
const empRoutes = require('./Routes/empRoutes');

router.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Organization and Employee management APIs.',
    });
});

router.use('/org', orgRoutes)
router.use('/emp', empRoutes)

module.exports = router;
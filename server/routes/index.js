const express = require('express');
const router = express.Router();

router.use('/admin', require('./admin_routes'));
router.use('/user', require('./user_routes'));

module.exports = router;
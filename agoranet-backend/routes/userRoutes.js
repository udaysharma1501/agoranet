const express = require('express');
const router = express.Router();
const { getCurrentUser } = require('../controllers/userController');
// const authenticateToken = require('../middleware/authenticateToken');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/me', authenticateToken, getCurrentUser);

module.exports = router;

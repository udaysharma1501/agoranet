const express = require('express');
const router = express.Router();
const { getCurrentUser } = require('../controllers/userController');
const { register } = require('../controllers/authController');
// const authenticateToken = require('../middleware/authenticateToken');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/me', authenticateToken, getCurrentUser);
router.post('/signup', register);

module.exports = router;

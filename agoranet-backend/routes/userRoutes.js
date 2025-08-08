const express = require('express');
const router = express.Router();
const { getCurrentUser } = require('../controllers/userController');
const { signupUser } = require('../controllers/authController');
// const authenticateToken = require('../middleware/authenticateToken');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/me', authenticateToken, getCurrentUser);
router.post('/signup', signupUser);

module.exports = router;

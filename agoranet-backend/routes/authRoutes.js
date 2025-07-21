const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);

// Protected test route
router.get("/me", authMiddleware, (req, res) => {
  res.json({ msg: `Hello, your user ID is ${req.user}` });
});

module.exports = router;

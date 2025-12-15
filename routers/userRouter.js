const express = require("express");
const router = express.Router();
const { loginUser, signupUser, getMe } = require("../controllers/userController");
const requireAuth = require("../middleware/requireAuth");

// Signup route
router.post("/signup", signupUser);

// Login route
router.post("/login", loginUser);

// Protected /me route
router.get("/me", requireAuth, getMe);

module.exports = router;

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// These must match the names in authController.js exactly
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
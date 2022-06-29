const express = require('express');
const router = express.Router();
const { registerValidation, loginValidation } = require('../validation/auth.validation.js');
const authController = require('../controllers/authController');

router.post('/login', loginValidation, authController.login);
router.post('/register', registerValidation, authController.register);

router.post('/verfication-email', authController.verifyEmail);

module.exports = router;
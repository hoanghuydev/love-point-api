const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const checkRules = require('../middleware/checkRules');
router.post('/login', authController.login);
router.post('/logout', checkRules.origin, authController.logout);
module.exports = router;

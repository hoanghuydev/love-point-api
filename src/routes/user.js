const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const checkRules = require('../middleware/checkRules');
router.get('/:userId', checkRules.checkSelfToken, userController.getInfoUser);
router.put('/:userId/point', checkRules.checkAdmin, userController.changePoint);
module.exports = router;

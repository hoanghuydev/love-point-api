const express = require('express');
const router = express.Router();
const giftController = require('../controller/giftController');
const checkRules = require('../middleware/checkRules');
router.get('/list', checkRules.origin, giftController.getGiftList);
router.post('/add', checkRules.checkAdmin, giftController.addGift);
router.delete(
    '/remove/:giftId',
    checkRules.checkAdmin,
    giftController.removeGift
);
router.get('/received', checkRules.origin, giftController.getGiftReceived);
router.post(
    '/received/add/:giftId',
    checkRules.origin,
    giftController.addGiftReceived
);
module.exports = router;

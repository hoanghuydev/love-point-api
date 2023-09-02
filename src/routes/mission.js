const express = require('express');
const router = express.Router();
const missionController = require('../controller/missionController');
const checkRules = require('../middleware/checkRules');
router.get('/list', checkRules.origin, missionController.getMissionList);
router.post('/add', checkRules.checkAdmin, missionController.addMission);
router.delete(
    '/remove',
    checkRules.checkAdmin,
    missionController.removeMission
);
router.put(
    '/status/change/:missionId',
    checkRules.checkAdmin,
    missionController.changeStatus
);
router.post(
    '/sendmail/:missionId',
    checkRules.origin,
    missionController.sendMailOfMission
);
router.put(
    '/review/add/:missionId',
    checkRules.origin,
    missionController.addMissionReviewing
);
router.put(
    '/review/refuse/:missionId',
    checkRules.checkAdmin,
    missionController.refuseReview
);
router.put(
    '/review/accept/:missionId',
    checkRules.checkAdmin,
    missionController.accpectReview
);
router.get(
    '/review/list',
    checkRules.origin,
    missionController.getMissionReviewList
);
router.get('/:missionId', checkRules.origin, missionController.getMission);

module.exports = router;

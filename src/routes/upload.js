const express = require('express');
const router = express.Router();
const uploadController = require('../controller/uploadCotroller');
const checkRules = require('../middleware/checkRules');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
router.post('/proof', upload.single('file'), uploadController.uploadFileProof);
module.exports = router;

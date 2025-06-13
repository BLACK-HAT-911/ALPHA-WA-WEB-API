const express = require('express');
const router = express.Router();
const PairingController = require('../controllers/pairing.controller');

router.post('/initiate', PairingController.initiatePairing);
router.post('/verify', PairingController.verifyPairing);
router.get('/status/:userId', PairingController.checkStatus);

module.exports = router;
const express = require('express');
const { createDonation } = require('../controllers/donationController.js');

const router = express.Router();

router.post('/donate', createDonation);

module.exports = router;

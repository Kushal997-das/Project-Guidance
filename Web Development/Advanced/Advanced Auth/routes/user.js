const express = require('express');
const router = express.Router();
const { updateProfile } = require('../controllers/user');

router.route('/updateprofile').post(updateProfile);

module.exports = router;

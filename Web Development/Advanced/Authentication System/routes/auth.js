const express = require('express');
const router = express.Router();
const { register, login, verifyMailToken } = require('../controllers/auth');
router.route('/register').post(register);
router.route('/:id/verify/:token').get(verifyMailToken);
router.route('/login').post(login);
module.exports = router;

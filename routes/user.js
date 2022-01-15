const express = require('express');
const {} = require('../controllers/user');
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
} = require('../controllers/auth');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

module.exports = router;

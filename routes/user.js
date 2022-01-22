const express = require('express');
const { updateMe, deleteMe } = require('../controllers/user');
const { authLimiter } = require('../middlewares/authLimiter');
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
} = require('../controllers/auth');

const router = express.Router();

router.post('/signup', authLimiter, signup);
router.post('/login', authLimiter, login);
router.post('/forgotPassword', authLimiter, forgotPassword);
router.patch('/resetPassword/:token', authLimiter, resetPassword);
router.patch('/updateMyPassword', authLimiter, protect, updatePassword);
router.patch('/updateMe', protect, updateMe);
router.delete('/deleteMe', protect, deleteMe);

module.exports = router;

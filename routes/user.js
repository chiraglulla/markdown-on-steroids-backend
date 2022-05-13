const express = require('express');
const { getMe, updateMe, deleteMe } = require('../controllers/user');
const { authLimiter } = require('../middlewares/authLimiter');
const {
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword,
  updatePassword,
  protect,
  isAuthenticated,
} = require('../controllers/auth');

const router = express.Router();

router.get('/isAuthenticated', authLimiter, protect, isAuthenticated);
router.post('/signup', authLimiter, signup);
router.post('/login', authLimiter, login);
router.get('/logout', authLimiter, logout);
router.post('/forgotPassword', authLimiter, forgotPassword);
router.patch('/resetPassword/:token', authLimiter, resetPassword);
router.patch('/updateMyPassword', authLimiter, protect, updatePassword);
router.get('/me', authLimiter, protect, getMe);
router.patch('/updateMe', protect, updateMe);
router.delete('/deleteMe', protect, deleteMe);

module.exports = router;

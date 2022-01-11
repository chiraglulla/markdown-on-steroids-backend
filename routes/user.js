const express = require('express');
const {} = require('../controllers/user');
const { signup, login } = require('../controllers/auth');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

module.exports = router;

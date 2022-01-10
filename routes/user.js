const express = require('express');
const {} = require('../controllers/user');
const { signup } = require('../controllers/auth');

const router = express.Router();

router.post('/signup', signup);

module.exports = router;

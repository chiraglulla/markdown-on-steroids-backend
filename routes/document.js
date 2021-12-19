const express = require('express');
const { getAllDocuments } = require('../controllers/document');

const router = express.Router();

router.route('/').get(getAllDocuments);

module.exports = router;

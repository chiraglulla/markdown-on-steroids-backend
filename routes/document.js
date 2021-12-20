const express = require('express');
const {
  getAllDocuments,
  getDocument,
  createDocument,
  deleteDocument,
} = require('../controllers/document');

const router = express.Router();

router.route('/').get(getAllDocuments).post(createDocument);
router.route('/:id').get(getDocument).delete(deleteDocument);

module.exports = router;

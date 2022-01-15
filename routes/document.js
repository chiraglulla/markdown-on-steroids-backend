const express = require('express');
const {
  getAllDocuments,
  getDocument,
  createDocument,
  deleteDocument,
  updateDocument,
} = require('../controllers/document');
const { protect } = require('../controllers/auth');

const router = express.Router();

router.route('/').get(protect, getAllDocuments).post(protect, createDocument);
router
  .route('/:id')
  .get(protect, getDocument)
  .patch(protect, updateDocument)
  .delete(protect, deleteDocument);

module.exports = router;

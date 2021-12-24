const mongoose = require('mongoose');

const documentsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A document must have a name'],
    trim: true,
  },
  text: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Document = mongoose.model('Document', documentsSchema);

module.exports = Document;

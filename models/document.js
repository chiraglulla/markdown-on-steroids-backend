const mongoose = require('mongoose');
const User = require('./user');

const documentsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A document must have a name'],
      trim: true,
    },
    text: String,
    owner: {
      type: mongoose.Types.ObjectId,
      required: [true, 'A document must have a owner'],
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Document = mongoose.model('Document', documentsSchema);

module.exports = Document;

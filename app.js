const express = require('express');
const morgan = require('morgan');
const documentRouter = require('./routes/document');

const app = express();

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(express.json());

app.use('/api/v1/document', documentRouter);

module.exports = app;

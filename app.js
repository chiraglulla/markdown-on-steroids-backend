const express = require('express');
const morgan = require('morgan');
const documentRouter = require('./routes/document');

const app = express();

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, DELETE, PATCH, OPTIONS'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Content-Length, X-Requested-With'
  );
  next();
});

app.use('/api/v1/document', documentRouter);

module.exports = app;

const express = require('express');
const morgan = require('morgan');
const documentRouter = require('./routes/document');
const addHeaders = require('./middlewares/addHeaders');

const app = express();

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(express.json());
app.use(addHeaders);

app.use('/api/v1/document', documentRouter);

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server`,
  });
});

module.exports = app;

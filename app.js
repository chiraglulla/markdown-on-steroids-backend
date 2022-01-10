const express = require('express');
const morgan = require('morgan');
const documentRouter = require('./routes/document');
const userRouter = require('./routes/user');
const addHeaders = require('./middlewares/addHeaders');
const { handleUnhandledRoutes } = require('./controllers/error');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(express.json());
app.use(addHeaders);

app.use('/api/v1/document', documentRouter);
app.use('/api/v1/user', userRouter);

app.all('*', handleUnhandledRoutes);

app.use(errorHandler);

module.exports = app;

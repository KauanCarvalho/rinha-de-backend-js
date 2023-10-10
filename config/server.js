'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const { errorHandler } = require('@middlewares/payload');
const peopleRouter = require('@routers/people');
const rootRouter = require('@routers/root');

const app = express();

// Middlewares.
app.use(bodyParser.json());
app.use(errorHandler);

// Routers.
app.use('/', rootRouter);
app.use('/pessoas', peopleRouter);

module.exports = app;

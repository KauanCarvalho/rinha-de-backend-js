'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const { errorHandler } = require('@middlewares/payload');
const peopleRouter = require('@routers/people');
const { peopleCount } = require('@config/database');

const app = express();

app.use(bodyParser.json());
app.use(errorHandler);
app.use('/pessoas', peopleRouter);

app.get('/contagem-pessoas', (_, response) => {
  peopleCount()
    .then(queryResult => {
      const [countResult] = queryResult.rows;

      response.send(countResult.count).end();
    })
    .catch(() => {
      response.status(422).end();
    });
});

module.exports = app;

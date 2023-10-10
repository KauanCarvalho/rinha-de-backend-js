'use-strict';

const { Router } = require('express');
const { peopleCount } = require('@app/database');

const rootRouter = Router();

rootRouter.get('/contagem-pessoas', (_, response) => {
  peopleCount()
    .then(queryResult => {
      const [countResult] = queryResult.rows;

      response.send(countResult.count).end();
    })
    .catch(() => {
      response.status(422).end();
    });
});

module.exports = rootRouter;

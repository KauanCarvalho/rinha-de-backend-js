'use-strict';

const { Router } = require('express');
const { v4: uuidv4 } = require('uuid');
const { validationFilter } = require('@middlewares/payload');
const { insertPerson, findPersonById, finPeopledByTerm } = require('@app/database');

const peopleRouter = Router();

peopleRouter.post('/', validationFilter, (req, res, _) => {
  const id = uuidv4();

  insertPerson(id, req.body)
    .then(() => {
      res.status(201).location(`/pessoas/${id}`).end();
    })
    .catch(() => {
      res.status(422).end();
    });
});

peopleRouter.get('/:id', (req, res, _) => {
  findPersonById(req.params.id)
    .then(queryResult => {
      const [result] = queryResult.rows;

      if (!result) {
        return res.status(404).end();
      }

      res.json(result).end();
    })
    .catch(() => {
      res.status(404).end();
    });
});

peopleRouter.get('/', (req, res, _) => {
  if (!req.query.t) {
    return res.status(400).end();
  }

  finPeopledByTerm(req.query.t)
    .then(queryResults => {
      res.json(queryResults.rows).end();
    })
    .catch(() => {
      res.status(404).end();
    });
});

module.exports = peopleRouter;

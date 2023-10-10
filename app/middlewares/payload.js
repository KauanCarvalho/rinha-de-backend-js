'use-strict';

const _ = require('lodash');
const { parse } = require('date-fns');

module.exports.validateBody = req => {
  const { apelido, nome, nascimento, stack } = req.body;

  if (typeof apelido !== 'string' || apelido.length > 32) return false;
  if (typeof nome !== 'string' || nome.length > 100) return false;
  if (typeof nascimento !== 'string' || isNaN(parse(nascimento, 'yyyy-MM-dd', new Date()))) {
    return false;
  }

  if (_.isUndefined(stack) || _.isNull(stack)) {
    req.body.stack = '';
  } else if (!Array.isArray(stack)) {
    return false;
  } else if (stack.some(s => !_.isString(s) || s.length > 32)) {
    return false;
  } else {
    req.body.stack = stack.map(s => s.toLowerCase()).join(' ');
  }

  return true;
};

module.exports.validationFilter = (req, res, next) => {
  if (!this.validateBody(req)) return res.status(422).end();

  next();
};

module.exports.errorHandler = (err, _req, res, _) => {
  res.status(err.status || 500).end();
};

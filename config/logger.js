'use-strict';

const config = require('@config/config');
const pino = require('pino');

module.exports.logger = pino({
  disabled: config.logger.enabled,
  minLength: 4096,
  sync: false,
  level: config.logger.level
});

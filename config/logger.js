'use-strict';

const config = require('@config/config');
const pino = require('pino');

const logger = pino({
  name: config.app.name,
  enabled: config.logger.enabled,
  minLength: 4_096,
  sync: false,
  level: config.logger.level
});

module.exports = logger;

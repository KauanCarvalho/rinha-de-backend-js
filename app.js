'use strict';

require('module-alias/register');

const config = require('@app/config');
const server = require('@app/server');
const logger = require('@app/logger');

server.listen(config.app.port, () => {
  logger.info(`Server listening on port + ${config.app.port}`);
});

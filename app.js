'use strict';

require('module-alias/register');

const config = require('@config/config');
const server = require('@config/server');
const { logger } = require('@config/logger');

server.listen(config.app.port, () => {
  logger.info(`Server listening on port + ${config.app.port}`);
});

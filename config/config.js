'use-strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const config = {
  app: {
    port: process.env.PORT || 8080
  },
  db: {
    url: process.env.DB_URL
  },
  logger: {
    level: process.env.PINO_LOG_LEVEL || 'debug',
    enabled: process.env.NO_LOG !== 'true'
  }
};

module.exports = config;

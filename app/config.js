'use-strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const config = {
  app: {
    name: process.env.APP_NAME,
    port: process.env.PORT
  },
  db: {
    url: process.env.DB_URL,
    pool: Number(process.env.DB_POOL) || 70
  },
  logger: {
    level: process.env.PINO_LOG_LEVEL || 'debug',
    enabled: process.env.LOG_ENABLED === 'true'
  }
};

module.exports = config;

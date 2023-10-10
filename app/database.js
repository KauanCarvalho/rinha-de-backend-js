'use-strict';

const pg = require('pg');

const logger = require('@app/logger');
const config = require('@app/config');
const pool = new pg.Pool({
  connectionString: config.db.url,
  max: config.db.pool,
  idleTimeoutMillis: 0,
  connectionTimeoutMillis: 10_000
});

pool.on('error', connect);

pool.once('connect', () => {
  return pool.query(`
    CREATE EXTENSION IF NOT EXISTS pg_trgm;

    CREATE TABLE IF NOT EXISTS people (
      id UUID PRIMARY KEY,
      nickname VARCHAR(32) UNIQUE NOT NULL,
      name VARCHAR(100) NOT NULL,
      birth_date DATE NOT NULL,
      stack VARCHAR(1024),
      search VARCHAR(1160) GENERATED ALWAYS AS (
        LOWER(name || ' ' || nickname || ' ' || stack)
      ) STORED
    );

    CREATE INDEX IF NOT EXISTS people_search_idx ON people USING GIST (search gist_trgm_ops);
  `);
});

module.exports.insertPerson = async function (id, { apelido, nome, nascimento, stack }) {
  const query = `
    INSERT INTO
      people(
        id,
        nickname,
        name,
        birth_date,
        stack
      )
    VALUES (
      $1,
      $2,
      $3,
      $4,
      $5
    )
  `;

  return pool.query(query, [id, apelido, nome, nascimento, stack]);
};

module.exports.findPersonById = async function findPersonById(id) {
  const query = `
    SELECT
      id,
      nickname,
      name,
      to_char(birth_date, 'YYYY-MM-DD') as birth_date,
      stack
    FROM
      people
    WHERE "id" = $1;
  `;

  return pool.query(query, [id]);
};

module.exports.finPeopledByTerm = async function finPeopledByTerm(term) {
  const query = `
    SELECT
      id,
      nickname,
      name,
      to_char(birth_date, 'YYYY-MM-DD') as birth_date,
      stack
    FROM
      people
    WHERE
      search LIKE $1
    LIMIT 50;
  `;

  return pool.query(query, [`%${term.toLowerCase()}%`]);
};

module.exports.peopleCount = async function peopleCount() {
  return pool.query(`SELECT COUNT(1) FROM people`);
};

async function connect() {
  try {
    logger.info(`Connecting to db ${config.db.url}`);
    await pool.connect();
  } catch (err) {
    setTimeout(() => {
      connect();
      logger.error(`
        database.js: an error occured when connecting ${err} retrying connection on 1 secs
      `);
    }, 1_000);
  }
}

connect();

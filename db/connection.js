const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
});

const databaseConnection = async () => {
  try {
    await pool.query('SELECT NOW()');
    console.log('DataBase Connection Established');
  } catch (e) {
    console.log(`Database Connection failed ${e.message}`);
  }
};

module.exports = { pool, databaseConnection };

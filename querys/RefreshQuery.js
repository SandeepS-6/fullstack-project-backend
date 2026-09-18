const { pool } = require('../db/connection');

const date = new Date();
const create_at = new Date(); // create date obj of current date
const day = date.getDate(); // get the current date from the created obj
date.setDate(day + 7); // set the date upto 7

async function InsertRefreshTokens(userValues) {
  const { token_id, status, user_id } = userValues;
  const refreshValues = [token_id, user_id, status, create_at, date];
  const query = `INSERT INTO refresh_tokens (token_id, user_id, status, create_at, expires_at) VALUES ($1, $2, $3, $4, $5)`;
  const refreshInsert = await pool.query(query, refreshValues);
}
async function UpdateRefreshValues(updateValues) {
  const { token_id } = updateValues;
  const values = [token_id];
  const query = `UPDATE refresh_tokens SET status='revoke' WHERE token_id=($1) RETURNING user_id`;
  const updateRefresh = await pool.query(query, values);
  return updateRefresh.rows[0];
}
module.exports = { InsertRefreshTokens, UpdateRefreshValues };

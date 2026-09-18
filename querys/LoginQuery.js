const { pool } = require("../db/connection.js");

async function LoginValues(values) {
  const loginQuery = `SELECT * from users WHERE email=($1)`;
  const loginValues = [values.email];
  const res = await pool.query(loginQuery, loginValues);

  if (res.rows.length === 1) {
    return {
      rows: res.rows.length,
      password: res.rows[0].password,
      id: res.rows[0].id,
    };
  } else {
    return {
      statusCode: 401,
      message: "User not exisit",
    };
  }
}

module.exports = { LoginValues };

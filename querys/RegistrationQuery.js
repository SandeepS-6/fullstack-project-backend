const { pool } = require("../db/connection.js");

const regsiterQuery = async (values) => {
  const { firstName, lastName, email, password } = values;
  const userValues = [firstName, lastName, email, password];
  const emailValue = [userValues[2]];

  // checking the user exist or not
  const validationCheckQuery = `SELECT * FROM users WHERE email=$1`;
  const exisitingCheck = await pool.query(validationCheckQuery, emailValue);

  if (exisitingCheck.rows.length == 1) {
    return {
      statusCode: 409,
      message: "User already Exists ",
    };
  } else {
    const query = `INSERT INTO users(firstName, lastName, email, password) VALUES ($1, $2, $3, $4) RETURNING firstName, lastName, email `;
    const res = await pool.query(query, userValues);
    return {
      statusCode: 201,
      message: "sucessfully created ",
    };
  }
};

module.exports = { regsiterQuery };

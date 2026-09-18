const { pool } = require('../db/connection');

async function ProfileQuery(payload) {
  const query = `SELECT email, firstName, lastName,likesCount, id  FROM users where email=($1) `;
  const queryValues = [payload.email];
  const result = await pool.query(query, queryValues);
  if (result.rows.length === 1) {
    const { firstname, lastname, email, likescount, id } = result.rows[0];

    return {
      code: 200,
      firstName: firstname,
      lastName: lastname,
      email: email,
      likesCount: likescount,
      id: id,
    };
  } else {
    return {
      code: 401,
      message: 'No profile get the data',
    };
  }
}

module.exports = { ProfileQuery };

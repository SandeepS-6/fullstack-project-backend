const { pool } = require("../db/connection");

async function UpdateProfieValues(updateValues) {
  const { firstName, lastName, likesCount, id } = updateValues;
  const updateQuery = `UPDATE users
    SET firstName = $1,
    lastName = $2,
    likesCount=$3
    WHERE id = $4
    RETURNING id, firstName, lastName, email, likesCount;`;
  const updateValueArray = [firstName, lastName, likesCount, id];

  const updateResult = await pool.query(updateQuery, updateValueArray);
  const profileValues = updateResult.rows[0];

  try {
    if (updateResult.rows.length) {
      return {
        statusCode: 201,
        firstName: profileValues.firstname,
        lastName: profileValues.lastname,
        email: profileValues.email,
        id: profileValues.id,
        likesCount: profileValues.likescount,
        message: `Succesfully Updated Profile ${firstName}`,
      };
    } else {
      throw new Error({
        statusCode: 400,
        message: "User not found",
      });
    }
  } catch (error) {
    return error;
  }
}

module.exports = { UpdateProfieValues };

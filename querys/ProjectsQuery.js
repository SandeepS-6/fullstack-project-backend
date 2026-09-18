const { pool } = require("../db/connection.js");

async function ProjectsData(queryParams) {
  const { page, limit } = queryParams;
  const skip = (page - 1) * limit; //skip = (page-1*limit)

  const take = limit;
  const parametrized_Values = [skip, take];

  const currentPageProjects = `SELECT * FROM project OFFSET $1 LIMIT $2`;
  const getTotalCount = `SELECT  COUNT(*)  FROM project`;

  try {
    const getDataQuery = await pool.query(
      currentPageProjects,
      parametrized_Values,
    );
    const totalProjectsCount = await pool.query(getTotalCount);

    const totalPages = Number(
      Math.ceil(totalProjectsCount.rows[0].count / limit),
    ); //ceilling(total/limit) and *** IMPORTANT ** it throws the String needs to numeric operation
    //js default operation always upward the value

    if (getDataQuery.rows.length) {
      return {
        code: 200,
        response: getDataQuery.rows,
        total: Number(totalProjectsCount.rows[0].count), //meta data of pagination
        totalPages: totalPages, // this also
      };
    } else {
      throw {
        code: 404,
        message: "There is no projects are there!",
      };
    }
  } catch (error) {
    return error;
  }
}
async function CreateProject(ProjectValues) {}
module.exports = { ProjectsData };

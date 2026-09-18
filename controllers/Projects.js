const { ProjectsData } = require("../querys/ProjectsQuery");

async function GetProjects(req, res) {
  const projects = await ProjectsData(req.query);
  res.statusCode = projects.code;

  if (projects.code == 200) {
    res.json({
      response: projects.response,
      total: projects.total,
      totalPages: projects.totalPages,
    });
  } else {
    res.json({
      error: projects.message,
    });
  }
}
async function ProjectCreate(req, res) {
  console.log(req.body);
}
module.exports = { GetProjects, ProjectCreate };

const { ProjectsData } = require("../querys/ProjectsQuery");

async function GetProjects(req, res) {
  const projects = await ProjectsData(req.query);
}
async function ProjectCreate(req, res) {
  console.log(req.body);
}
module.exports = { GetProjects, ProjectCreate };

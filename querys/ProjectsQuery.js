async function ProjectsData(queryParams) {
  const { page, limit } = queryParams;

  const projectQuery = `SELECT * FROM project WHERE PAGE =`;
}
async function CreateProject(ProjectValues) {}
module.exports = { ProjectsData };

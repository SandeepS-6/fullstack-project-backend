function Health(req, res) {
  res.json({
    message: "Backend Is Healthy",
  });
}

module.exports = { Health };

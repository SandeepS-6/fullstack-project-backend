const corsConfig = {
  origin: process.env.ALLOW_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
};

module.exports = { corsConfig };

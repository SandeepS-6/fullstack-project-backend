const express = require('express');
const routes = express.Router();
const { Health } = require('../controllers/Health.js');
const { Register } = require('../controllers/Register.js');
const { Login } = require('../controllers/Login.js');
const { TokenVerification } = require('../middleware/authService.js');
const { Profile, UpdateProfile } = require('../controllers/Profile.js');
const { RefreshTokenMiddleWare } = require('../middleware/RefreshTokenMiddleWare.js');
const { RefreshController } = require('../controllers/RefreshController.js');
const { GetProjects, ProjectCreate } = require('../controllers/Projects.js');

// All Routes  if the routes are protected then pass into middleware.
routes.get('/health', Health);
routes.get('/profile', TokenVerification, Profile);

// all put routes
routes.put('/updateProfile', TokenVerification, UpdateProfile);
routes.get('/projects', TokenVerification, GetProjects);

// All post routes
routes.post('/auth/register', Register);
routes.post('/auth/login', Login);
routes.post('/refresh', RefreshTokenMiddleWare, RefreshController);
routes.get('/project', TokenVerification, ProjectCreate);

module.exports = { routes };

const app = require('express');
const dotenv = require('dotenv');
dotenv.config(); //using the env values
const { routes } = require('./routes/Routes.js');
const { databaseConnection } = require('./db/connection.js');
const cors = require('cors');
const { corsConfig } = require('./middleware/CorsOrigin.js');

console.log(process.env.ALLOW_URL);

const server = app(); //creatuing the exopress server
server.use(app.json()); //req must be come with json format

server.use(cors(corsConfig)); //add the cors options
databaseConnection(); //connection of database

server.use('/api', routes);
server.listen(process.env.PORT, () => {
  console.log(`Server is running on Port ${process.env.PORT}`);
});

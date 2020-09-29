const router = require('./api/routes/router');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const express = require('express');
const app = express();

require('dotenv/config');

const hostName = process.env.HOST;
const port = process.env.PORT;

const mongodb = require('./api/services/mongo-db');
mongodb.connect();

app.use(morgan('combined'));

app.use(methodOverride('X-HTTP-Method-Override'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

router.setRoute(app); // route app

app.listen(port, hostName, () =>
  console.log('Server listening on port ' + port)
);

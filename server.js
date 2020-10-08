require('dotenv/config');
const hostName = process.env.HOSTNAME;
const port = process.env.PORT;

const socket = require('./services/socket-io');
const router = require('./public/router');

const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require('path');

const mongodb = require('./services/mongo-db');
mongodb.connect();

app.use(morgan('combined'));

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', './public/page/views');

app.use(methodOverride('X-HTTP-Method-Override'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

router.setRoute(app); // route app

socket.setSocket(io); // socket io

server.listen(port, () => console.log('Server listening on: ' + port));

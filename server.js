require('dotenv/config');

const router = require('./api/routes/router');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const ipAddress = require('ip').address();
const hostName = process.env.HOSTNAME;
const port = process.env.PORT;

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require('path');

const socket = require('./services/socket-io');

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', './public/views');

const mongodb = require('./services/mongo-db');
mongodb.connect();

app.use(morgan('combined'));

app.use(methodOverride('X-HTTP-Method-Override'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.get('/',(req, res) => {
  res.render('index')
})

router.setRoute(app); // route app

socket.setSocket(io); // socket io

server.listen(port, () =>
  console.log('Server listening on: http://' + ipAddress + ':' + port)
);

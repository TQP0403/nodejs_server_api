require('dotenv/config');

const router = require('./api/routes/router');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const io = require('socket.io')(http);
const express = require('express');
const app = express();

const ipAddress = require('ip').address();
const hostName = process.env.HOSTNAME;
const port = process.env.PORT;

const mongodb = require('./api/services/mongo-db');
mongodb.connect();

app.use(morgan('combined'));

app.use(methodOverride('X-HTTP-Method-Override'));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

router.setRoute(app); // route app

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.broadcast.emit('hi');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

app.listen(port, () =>
  console.log('Server listening on: http://' + ipAddress + ':' + port)
);

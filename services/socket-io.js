function setSocket(io) {
  let users = [];
  let rooms = [];

  io.on('connection', (socket) => {
    console.log('user ' + socket.id + ' connected');

    socket.on('disconnect', () => {
      console.log('user ' + socket.id + ' disconnected');
    });

    socket.on('join-room', (roomname) => {
      socket.join(roomname);
    });

    socket.on('create-room', (roomname) => {
      if (rooms.indexOf(roomname) < 0) {
        rooms.push(roomname);
        socket.emit('create-room-success', roomname);
        io.sockets.emit('update-list-rooms', rooms);
        socket.on('join-room', (roomname) => {
          socket.join(roomname);
        });
      } else {
        socket.emit('create-room-failure');
      }
    });

    socket.on('unregister', () => {
      users.splice(users.indexOf(socket.username), 1);
      socket.broadcast.emit('update-list-users', users);
    });

    socket.on('register', (username) => {
      if (users.indexOf(username) < 0) {
        users.push(username);
        socket.username = username;
        socket.emit('register-success', username);
        io.sockets.emit('update-list-users', users);
      } else {
        socket.emit('register-failure');
      }
    });

    socket.on('chat', (msg) => {
      console.log(socket.id + ' say ' + msg);
      socket.broadcast.emit('chat', { username: socket.username, msg: msg });
    });

    // socket.on('chat message', (msg) => {
    //   console.log('message: ' + msg);
    //   io.emit('chat message', msg);
    //   io.sockets.emit('chat message', msg);
    //   socket.emit('chat message', msg);
    //   socket.broadcast.emit('chat message', msg);
    // });
    
    //   socket.id // socket id
    //   socket.join('room-name'); // join room
    //   io.to('room-name').emit('some event'); // chat room
  });
}

module.exports = { setSocket };

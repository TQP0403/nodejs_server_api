function setSocket(io) {
    let users = [];

    io.on('connection', (socket) => {
        console.log('user ' + socket.id + ' connected');

        socket.broadcast.emit('hi');

        socket.on('disconnect', () => {
            console.log('user ' + socket.id + ' disconnected');
        });

        socket.on('client-register', (username) => {
           if(users.indexOf(username) < 0){
               users.push(username);
               socket.username = username;
               socket.emit('register-success',username);
           }
           else{
               socket.emit('register-failure');
           }
        });

        socket.on('chat', (msg) => {
            console.log(socket.id + ' say ' + msg);
            // to all
            io.emit('chat', msg);
            // io.sockets.emit('server-send', msg);
            // to itself
            // socket.emit('server-send', msg);
            // to all except itself
            // socket.broadcast.emit('server-send', msg);
        });

        socket.on('chat message', (msg) => {
            console.log('message: ' + msg);

            io.emit('chat message', msg);
            io.sockets.emit('chat message', msg);
            socket.emit('chat message', msg);
            socket.broadcast.emit('chat message', msg);
        });
    });
}

module.exports = { setSocket }

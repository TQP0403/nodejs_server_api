var socket = io('http://localhost:3000');

$(document).ready(function () {
  $('#chat-form').hide();
  $('#create-room-form').hide();
  $('#user-list').hide();
  $('#room-list').hide();

  $('#create-room').click(function () {
    var roomname = $('#roomname').val();
    if (roomname != '') socket.emit('create-room', roomname);
  });

  $('#unregister').click(function () {
    var username = $('#username').val();

    if (username != '') {
      $('#register-form').show();
      $('#chat-form').hide();
      $('#user-list').hide();
      $('#room-list').hide();
      socket.emit('unregister');
    }
  });

  $('#register').click(function () {
    var username = $('#username').val();
    if (username != '') socket.emit('register', username);
  });

  $('#chat').click(function () {
    var txt = $('#txt').val();
    $('#txt').val('');
    if (txt != '') {
      socket.emit('chat', txt);
      $('#content').append('   ' + txt + '<br>');
    }
  });

  socket.on('create-room-failure', function (msg) {
    alert('This roomname is already existed');
  });

  socket.on('create-room-success', function (username) {
    alert('success');

    $('#content').html('');
    
  });

  socket.on('register-failure', function () {
    alert('This username is already existed');
  });

  socket.on('register-success', function (username) {
    $('#user').html('Hello ' + username);
    $('#register-form').hide();
    $('#chat-form').show();
    $('#user-list').show();
    $('#room-list').show();
    $('#create-room-form').show();
  });

  socket.on('update-list-users', function (data) {
    $('#users').html('');
    data.forEach(function (i) {
      $('#users').append('<tr><td>' + i + '</td></tr>');
    });
  });
  socket.on('update-list-rooms', function (data) {
    $('#rooms').html('');
    data.forEach(function (i) {
      $('#rooms').append('<tr><td>' + i + '</td></tr>');
    });
  });

  socket.on('chat', function (data) {
    $('#content').append(data.username + ': ' + data.msg + '<br>');
  });
});

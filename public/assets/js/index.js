var socket = io("http://localhost:3000/");

$(document).ready(function() {
    $("#chat-form").hide();

    $("#register").click(function() {
        var username = $("#username").val();
        if(username != "")
            socket.emit("client-register", username);
    });

    socket.on("register-failure", function(msg) {
        alert("This username is already existed");
    });

    socket.on("register-success", function(username) {
        $("#user").append(username);
        $("#register-form").hide();
        $("#chat-form").show();
    });

    $('#chat').click(function() {
        var txt = $("#txt").val();
        if(txt != "")
            socket.emit("chat",txt);
    });

    socket.on("chat", function(msg) {
        $('#content').append(msg + '<br>');
    });
});
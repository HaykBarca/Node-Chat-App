var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('newMessage', function (message) {
    var li = $('<li></li>');
    li.text(message.from + ' : ' + message.text);

    $('#chat_field').append(li);
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

$('#message_form').on('submit', function (event) {
    event.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: $('#message').val()
    }, function (data) {

    });
});
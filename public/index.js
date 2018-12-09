var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('newMessage', function (message) {
    var li = $('<li></li>');
    li.text(message.from + ' : ' + message.text);

    $('#chat_field').append(li);
});

socket.on('newLocationMessage', function (message) {
    var li = $('<li></li>');
    var a = $('<a target="_blank">My Current position</a>');


    li.text(message.from + ' : ');
    a.attr('href', message.link);
    li.append(a);
    $('#chat_field').append(li);
})

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

var locationButton = $('#get_location');

locationButton.on('click', function () {
    navigator.geolocation.getCurrentPosition(function (location) {
        if (!navigator.geolocation) {
            alert('Geolocation not supported by your browser');
        }

        socket.emit('sendCurrentLocation', {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        });
    }, function (e) {
        console.log(e);
    });
});
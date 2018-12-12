var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

function scrollBottom () {
    //selectors
    var messages = $('#messages');
    var newMessage = messages.children('li:last-child');

    //heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop(scrollHeight);
    }

}

socket.on('newMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
    
    $('#messages').append(html);
    scrollBottom();
});

socket.on('newLocationMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = $('#location-message-template').html();
    var html = Mustache.render(template, {
        url: message.link,
        from: message.from,
        createdAt: formattedTime
    });
    
    $('#messages').append(html);
    scrollBottom();
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
        $('#message').val('');
    });
});

var locationButton = $('#get_location');

locationButton.on('click', function () {
    navigator.geolocation.getCurrentPosition(function (location) {
        if (!navigator.geolocation) {
            alert('Geolocation not supported by your browser');
        }

        locationButton.attr('disabled', 'disabled');
        locationButton.text('Sending location...');

        socket.emit('sendCurrentLocation', {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude
        }, function () {
            locationButton.removeAttr('disabled');
            locationButton.text('Send Location');
        });
    }, function (e) {
        console.log(e);
    });
});
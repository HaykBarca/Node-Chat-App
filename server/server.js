const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('User connected');

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined'));

    socket.on('createMessage', (message, callback) => {
        io.emit('newMessage', generateMessage(message.from, message.text));

        callback('This is from server: got it');
    });

    socket.on('sendCurrentLocation', (message) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', message.latitude, message.longitude));
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});
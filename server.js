var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');

app.use(express.static(__dirname + '/public'));

var clientInfo = {};

io.on('connection', function(socket) {
    console.log('User connected via socket.io');

    socket.on('message', function(message) {
        console.log('Message recieved: ' + message.content);

        message.timestamp = moment().valueOf();

        console.log(message.timestamp);
        io.emit('message', message);
    });

    socket.on('setname', function(name){
        clientInfo[socket.id] = name;

        socket.emit('message', {
            content: 'Welcome to this chat app, ' + clientInfo[socket.id] + '!',
            name: 'Welcome',
            timestamp: moment().valueOf()
        });

        console.log(clientInfo[socket.id]);
    });

    socket.on('nudge', function(){
        console.log('Nudge recieved!');

        io.emit('nudge');
    });



});

http.listen(PORT, function(){
    console.log('Listening on 3000...');
});

var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket) {
    console.log('User connected via socket.io');

    socket.on('message', function(message) {
        console.log('Message recieved: ' + message.content);

        message.timestamp = moment().valueOf();

        console.log(message.timestamp);
        io.emit('message', message);
    });

    socket.on('nudge', function(){
        console.log('Nudge recieved!');

        io.emit('nudge');
    })

    socket.emit('message', {
        content: 'Welcome to this chat app!!',
        name: 'Welcome',
        timestamp: moment().valueOf()
    });



});

http.listen(PORT, function(){
    console.log('Listening on 3000...');
});

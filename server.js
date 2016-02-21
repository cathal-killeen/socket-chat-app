var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket) {
    console.log('User connected via socket.io');

    socket.on('message', function(message) {
        console.log('Message recieved: ' + message.content);
    });

    socket.emit('message', {
        content: 'Welcome to this chat app!!'
    });
});

http.listen(PORT, function(){
    console.log('Listening on 3000...');
});

var socket = io();

socket.on('connect', function(){
    console.log('Connected to socket.io server');
});

socket.emit('message', {
    content: "Hello from the browser side!!"
});

socket.on('message', function(message){
    console.log('New message');


    console.log(message.content);
});

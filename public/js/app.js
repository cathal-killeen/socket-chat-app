var socket = io();

socket.on('connect', function(){
    console.log('Connected to socket.io server');
});

socket.on('message', function(message){
    console.log('New message');
    console.log(message.content);
});

// SUBMIT NEW message
var $form = jQuery('#message-form');

$form.on('submit', function(event){
    event.preventDefault();

    var $message = $form.find('input[name=message]');

    if($message.val() !== ''){
        socket.emit('message', {
            content: $message.val()
        });

        $message.val('');
    }
});

var socket = io();

var chatWindow = document.getElementById('chatwindow');

socket.on('connect', function(){
    console.log('Connected to socket.io server');
});

socket.on('message', function(message){
    var momentTimestamp = moment.utc(message.timestamp);
    console.log('New message');
    console.log(message.content);

    jQuery('.messages').append('<p><strong>' + momentTimestamp.format('h:mm a') + '</strong> ' + message.content + '</p>');
    chatWindow.scrollTop = chatWindow.scrollHeight;
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

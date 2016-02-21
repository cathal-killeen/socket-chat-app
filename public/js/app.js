var socket = io();

var chatWindow = document.getElementById('chatwindow');
var name = '';

socket.on('connect', function(){
    console.log('Connected to socket.io server');
});

socket.on('message', function(message){
    var momentTimestamp = moment.utc(message.timestamp);
    console.log('New message');
    console.log(message.content);

    jQuery('.messages').append('<p><strong>' + message.name + ':</strong> ' + message.content + ' - ' + momentTimestamp.local().format('h:mm a') + '</p>');
    chatWindow.scrollTop = chatWindow.scrollHeight;
});

// SET name
var $nameForm = jQuery('#name-form');

$nameForm.on('submit', function(event){
    event.preventDefault();

    var $username = $nameForm.find('input[name=username]');

    if($username.val() !== ''){
        console.log('Name: ' + $username.val());
        name = $username.val();
        $username.val('');
    }
});

// SUBMIT NEW message
var $form = jQuery('#message-form');

$form.on('submit', function(event){
    event.preventDefault();

    var $message = $form.find('input[name=message]');

    if($message.val() !== '' && name !== ''){
        socket.emit('message', {
            content: $message.val(),
            name: name
        });

        $message.val('');
    }
});

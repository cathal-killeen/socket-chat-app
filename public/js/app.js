var app = angular.module('chatApp', ['btford.socket-io', 'ngAnimate']);

app.directive('newMessage', function(){
    return{
        restrict: 'E',
        template: '<p><strong>{{messageObj.name}}</strong>: {{messageObj.content}} <small>- {{messageObj.time}}</small></p>',
        scope: {
            messageObj: '='
        },
        replace: true
    }
});

app.factory('socket', ['socketFactory', function(socketFactory){
    return socketFactory();
}]);

app.controller('MainController', ['socket', '$scope', '$timeout', function(socket, $scope, $timeout){

    $scope.nameSelected = false;
    $scope.showChat = false;
    $scope.messages = [];

    var chatWindow = document.getElementById('chatwindow');

    socket.on('connect', function(){
        console.log('Connected to socket.io server');
    });

    socket.on('message', function(message){
        console.log('New message');
        console.log(message.content);
        console.log(message.timestamp);

        message.time = moment.utc(message.timestamp).local().format('h:mm a');

        $scope.messages.push(message);

        $timeout(function(){
            chatWindow.scrollTop = chatWindow.scrollHeight;
        });
    });

    socket.on('nudge', function(){
        angular.element("#chatpanel").animate("tada");
    });

    $scope.myMessage = {
        name: '',
        content: ''
    }

    $scope.$watch('myMessage.content', function(){
        if($scope.myMessage.content !== ''){
            $scope.sendButton = 'Send';
        }else{
            $scope.sendButton = 'Nudge';
        }
    });

    $scope.sendButtonFunc = function(){
        if($scope.myMessage.content !== ''){
            $scope.sendMessage();
        }else{
            socket.emit('nudge');
        }
    }

    $scope.messageBoxEnter = function(){
        if($scope.myMessage.content !== ''){
            $scope.sendMessage();
        }
    }


    $scope.sendMessage = function(){
        if($scope.myMessage.content !== ''){
            socket.emit('message', $scope.myMessage);
            $scope.myMessage.content = '';
        }
    }

    $scope.setName = function(){
        if($scope.myMessage.name !== ''){
            $scope.nameSelected = true;
            $scope.showChat = true;
        }else{
            angular.element("#namepanel").animate("shake");
        }
    }

    angular.element.prototype.animate = function (animationName) {
        var self = this;
        self.addClass("animated " + animationName);
        self.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            self.removeClass("animated " + animationName);
        });
    }
}]);

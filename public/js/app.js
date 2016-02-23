var app = angular.module('chatApp', ['btford.socket-io', 'ngAnimate']);

app.directive('newMessage', function(){
    return{
        restrict: 'E',
        template: '<p><strong>{{messageObj.name}}</strong>: {{messageObj.content}} <small>- {{messageObj.time()}}</small></p>',
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
        var momentTimestamp = moment.utc(message.timestamp);
        console.log('New message');
        console.log(message.content);

        message.time = function(){
            var momentTimestamp = moment.utc(this.timestamp);
            return momentTimestamp.local().format('h:mm a');
        }

        $scope.recievedMessage = message;


        $scope.messages.push($scope.recievedMessage);

        $timeout(function(){
            chatWindow.scrollTop = chatWindow.scrollHeight;
        });
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


    $scope.sendMessage = function(){
        if($scope.myMessage.content !== ''){
            socket.emit('message', $scope.myMessage);

            $scope.myMessage.content = '';
        }else{
            angular.element("#chatpanel").animate("tada");
        }
    }

    $scope.setName = function(){
        if($scope.myMessage.name !== ''){
            $scope.nameSelected = true;
            $timeout(function () {
                $scope.showChat = true;
            }, 1000);
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

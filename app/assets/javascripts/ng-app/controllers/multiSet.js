angular.module('notSetApp')
  .controller('multiSetCtrl', ['$scope', '$timeout', 'Game', 'Player', 'socket', multiSetCtrl])

function multiSetCtrl($scope, $timeout, Game, Player, socket){
  socket.on('room:taken', function(room){
    $scope.failureMessage = "Room "+room+" is already taken."
  })
  $scope.hostRoom = function(){
    socket.emit('host:room', room)
    $scope.startGame()
  }
  $scope.joinRoom = function(room){
    socket.emit('join:room', room)
  }


} 

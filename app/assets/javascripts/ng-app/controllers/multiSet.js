angular.module('notSetApp')
  .controller('multiSetCtrl', ['$scope', '$timeout', 'Game', 'Multiplayer', 'socket', multiSetCtrl])

function multiSetCtrl($scope, $timeout, Game, Multiplayer, socket){
  socket.on('host:room:error', function(room){
    $scope.failureMessage = "Error in hosting room "+room+"."
  })
  socket.on('join:room:error', function(room){
    $scope.failureMessage = 'Error in joining room '+room+'.'
  })
  socket.on('sync:game', function(gameData){
    Game.board = gameData.board
    $scope.board = Game.board
    Game.deck = gameData.deck
    $scope.roomJoined = true
  })
  $scope.gameSettings = {
    deckType: "Endless",
    timeLimit: "No Time Limit",
    players: 2
  }
  socket.on('room:joined', function(data){
    $scope.roomJoined = true
    $scope.updatePlayers(data)
  })
  socket.on('room:hosted', function(data){
    $scope.roomJoined = true
    $scope.updatePlayers(data)
    Multiplayer.players[0].active = data.players[0].active
  })
  $scope.hostRoom = function(){
    var data = {}
    data.room = $scope.roomToHost
    data.game = {
      deck: Game.deck,
      board: Game.board,
      players : Multiplayer.players
    }
    socket.emit('host:room', data)
  }
  $scope.joinRoom = function(){
    socket.emit('join:room', $scope.roomToJoin)
  }
  $scope.board = Game.board
  $scope.deck = Game.deck
  $scope.roomJoined = false
  $scope.sendUpdateRoom = function(){
    data = {}
    data["board"] = Game.board
    data["deck"] = Game.deck
    socket.emit('send:update:room', data)
  }
  $scope.setPlayers = Multiplayer.players
  $scope.attemptTimer = Multiplayer.attemptTimer
  socket.on('update:timer', function(data){
    Multiplayer.unlocked = data.unlocked
    Multiplayer.attemptTimer[0] = data.attemptTimer
    Multiplayer.currentPlayer= data.currentPlayer
  })
  $scope.attemptSet = function(player){
    if (!Game.gameOver && Multiplayer.unlocked) { 
      Multiplayer.unlocked = false
      Multiplayer.cardsSelectable = true
      Multiplayer.attemptTimer[0] = 4000
      Multiplayer.currentPlayer = player
      var data = {
        unlocked: false,
        attemptTimer: 4000,
        currentPlayer: player        
      } 
      socket.emit('update:timer', data)
      timePenaltyProm = $timeout(Multiplayer.timePenalty,1000)
    }
  }
  socket.on('attempt:set', function(data){
    $scope.attemptSet(data.currentPlayer)
  })
  socket.on('subUpdate:timer', function(timer){
    Multiplayer.attemptTimer[0]= timer
  })
  socket.on('reset:timers', function(data){
    Multiplayer.currentPlayer = data.currentPlayer
    Multiplayer.unlocked = data.unlocked
    Game.selectedCards = data.selectedCards
    Multiplayer.cardsSelectable = data.cardsSelectable
    Multiplayer.attemptTimer[0] = data.attemptTimer
  })
  socket.on('update:points', function(data){
    Multiplayer.players[data.player].points = data.points
  })
  $scope.hotAttemptSet = function(event){
    if ($scope.roomJoined){
      if (Multiplayer.unlocked){
        if (event.which == 97){
          socket.emit('attempt:set')
        }
      }
    }
  }
  socket.on('lock:players', function(){
    Multiplayer.unlocked = false
  })
  $scope.updatePlayers = function(data){
    Multiplayer.players[0].active = data.players[0].active
    Multiplayer.players[1].active = data.players[1].active
    Multiplayer.players[2].active = data.players[2].active
    Multiplayer.players[3].active = data.players[3].active
   }
  socket.on('select:card', function(index){
    Game.addToSelectedCards(index)
  })
  socket.on('update:board', function(data){
    Game.board = data.board
    $scope.board = Game.board
    Game.deck = data.deck
    $scope.deck = Game.deck
  })
  $scope.selectCard = function($index){
    if (Multiplayer.cardsSelectable && Game.cardNotSelected($index)) {
      if (Game.cardNotSelected($index)){
        Game.addToSelectedCards($index)
        socket.emit('select:card', $index)
        if (Game.threeCards()){
          if(Game.isSelectedSet()){
            Multiplayer.addPoints()
            Game.replaceUsedCards()
            var data = {
              board:Game.board,
              deck:Game.deck
            }
            socket.emit('update:board', data)
            Game.selectedCards = []
            if (Game.checkResetNeeded(0)) {
              Game.makeSolvableBoard()
            }
          } else {
            Multiplayer.deductPoints()
          }
          Multiplayer.reset()
        }
      }
    }
  }
  $scope.inSelectedCards = function($index){
    return ($.inArray(Game.board[$index], Game.selectedCards) != -1)
  }









} 

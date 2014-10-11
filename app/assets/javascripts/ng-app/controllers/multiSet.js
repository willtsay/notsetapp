angular.module('notSetApp')
  .controller('multiSetCtrl', ['$scope', '$timeout', 'Game', 'Multiplayer', 'socket', 'User', multiSetCtrl])

function multiSetCtrl($scope, $timeout, Game, Multiplayer, socket, User){
  User.name.get()
    .$promise.then(function(user){
      $scope.username = user.name
  })
  socket.on('get:username', function(){
    var username = $scope.username
    socket.emit('recieve:username', username)
  })
  socket.on('pre:host:room', function(pairData){
    var data = {}
    data.guest = pairData.guest
    data.room = $scope.username
    data.game = {
      deck: Game.deck,
      board: Game.board,
      players : Multiplayer.players
    }
    socket.emit('host:room', data)
  })
  socket.on('pre:join:room', function(room){
    socket.emit('join:room', room)   
  })
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
  socket.on('room:joined', function(data){
    $scope.roomJoined = true
    $scope.updatePlayers(data)
  })
  socket.on('room:hosted', function(data){
    $scope.roomJoined = true
    $scope.updatePlayers(data)
  })
  socket.on('room:left', function(data){
    $scope.updatePlayers(data)
  }) 
  socket.on('update:timer', function(data){
    Multiplayer.unlocked = data.unlocked
    Multiplayer.attemptTimer[0] = data.attemptTimer
    Multiplayer.currentPlayer= data.currentPlayer
  })
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
  socket.on('select:card', function(index){
    Game.addToSelectedCards(index)
  })
  socket.on('update:board', function(data){
    Game.board = data.board
    $scope.board = Game.board
    Game.deck = data.deck
    $scope.deck = Game.deck
  })
  $scope.host = true
  $scope.join = false
  $scope.selectMode = function(mode){
    if (mode == 'host'){
      $scope.host = true
      $scope.join = false
    } else if (mode == 'join'){
      $scope.host = false
      $scope.join = true
    }
  }
  $scope.answer = Game.answer
  $scope.board = Game.board
  $scope.deck = Game.deck
  $scope.roomJoined = false
  $scope.setPlayers = Multiplayer.players
  $scope.attemptTimer = Multiplayer.attemptTimer
  $scope.gameSettings = {
    deckType: "Endless",
    timeLimit: "No Time Limit",
    players: 2
  }
  $scope.init = function(){
    socket.emit('make:match')
  }
  $scope.hostRoom = function(){
    var data = {}
    data.room = $scope.roomToEnter
    data.game = {
      deck: Game.deck,
      board: Game.board,
      players : Multiplayer.players
    }
    socket.emit('host:room', data)
  }
  $scope.joinRoom = function(){
    socket.emit('join:room', $scope.roomToEnter)
  }
  $scope.enterRoom = function(){
    if ($scope.host){
      $scope.hostRoom()
    } else if ($scope.join){
      $scope.joinRoom()
    }
  }
  $scope.hotEnterRoom = function(event){
    if (event.which == 13){
      $scope.enterRoom()
    }
  }
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
  $scope.hotAttemptSet = function(event){
    if ($scope.roomJoined){
      if (Multiplayer.unlocked){
        if (event.which == 97){
          socket.emit('attempt:set')
        }
      }
    }
  }
  $scope.attemptSetKey = function(event){
    socket.emit('attempt:set')
  }
  socket.on('lock:players', function(){
    Multiplayer.unlocked = false
  })
  $scope.updatePlayers = function(data){
    for (i=0; i<4; i++){
      Multiplayer.players[i].active = data.players[i].active
      Multiplayer.players[i].points =data.players[i].points
      Multiplayer.players[i].name = data.players[i].name
    }
   }
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
              var data = {
                board: Game.board,
                deck: Game.deck
              }
              socket.emit('update:board', data)
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

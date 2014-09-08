angular.module('notSetApp')
  .controller('notSetCtrl', ['$scope', '$timeout', 'Game', 'Player', notSetCtrl])


function notSetCtrl($scope, $timeout, Game, Player){
  $scope.board = Game.board
  $scope.attemptTimer = Player.attemptTimer
  $scope.setPlayers = Player.players
  $scope.timer=Player.time
  $scope.timerTypes = Player.timerTypes
  $scope.optionsPicked=false
  $scope.answer = Game.answer
  $scope.decktype = "endless"
  $scope.deckTypes = Game.deckTypes
  $scope.selectCard = function($index){
    if (Player.cardsSelectable && Game.cardNotSelected($index)) {
      if (Game.cardNotSelected($index)){
        Game.addToSelectedCards($index)
        if (Game.threeCards()){
          if(Game.isSelectedSet()){
            Player.addPoints()
            Game.replaceUsedCards()
            Game.selectedCards = []
            if (Game.checkResetNeeded(0)) {
              Game.makeSolvableBoard()
            }
          } else {
            Player.deductPoints()
          }
          Player.reset()
        }
      }
    }
  }
  $scope.inSelectedCards = function($index){
    return ($.inArray(Game.board[$index], Game.selectedCards) != -1)
  }
  $scope.replaceUsedCards = function(){
    if (Game.deckLength() < 3) { 
      for(i=0; i<3; i++) {
      var change = Game.board.indexOf(Game.selectedCards[i])
      Game.board[change] = new emptyCard()
      }
    } else {
      for (i=0; i<3; i++) {
        var change = Game.board.indexOf(Game.selectedCards[i])
        Game.board[change] = Game.drawCard()
      }
    }
    if ($scope.decktype =="endless") {
      for (i=0; i<3; i++) {
        Game.deck[Game.selectedCards[i].id]=Game.selectedCards[i]
      }
    }
  }
  $scope.attemptSet = function(player){
    if (!Game.gameOver && Player.unlocked) { 
      Player.cardsSelectable = true
      Player.attemptTimer[0] = 5000
      Player.currentPlayer = player
      timePenaltyProm = $timeout(Player.timePenalty,1000)
    }
  }
  $scope.hotAttemptSet = function(event){
    if ($scope.optionsPicked){
      if (Player.unlocked) {
        if (event.which == 113){
          $scope.attemptSet(0)
          Player.unlocked = false
        }
        if (event.which == 122){
          $scope.attemptSet(2)
          Player.unlocked = false
        }
        if (event.which == 111){
          $scope.attemptSet(1)
          Player.unlocked = false
        }
        if (event.which == 109){
          $scope.attemptSet(3)
          Player.unlocked = false
        }
      }
    } 
  }
  $scope.selectDeckType = function(deckType){
    $scope.decktype = deckType
  }
  $scope.selectTimerType = function(timerType){
    Player.time = timerType
    $scope.timer = Player.time
  }
  $scope.goToGame = function(players){
    if ($scope.decktype && Player.time) {
      $scope.optionsPicked = true
      Player.cullPlayers(players)
      if (Player.time != "notimer") {
        $timeout($scope.gameTimer, 1000)      
      }
    }
  }
  $scope.gameTimer = function(){
    if (Player.time == 0){
      Game.gameOver = true
    } else {
      Player.time = Player.time-1000
      $timeout($scope.gameTimer, 1000)  
    }
  }
}

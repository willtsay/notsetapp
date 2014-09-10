angular.module('notSetApp')
  .service( 'Player', [ '$rootScope', '$timeout', 'Game', Player])

function Player($rootScope, $timeout, Game){
  var service = {
    players: [
    {
      id: 0,
      color: 'blue',
      text:"Q",
      points: 0
    },
    {
      id: 1,
      color: 'red',
      text:"O",
      points: 0
    },
    {
      id: 2,
      color: 'green',
      text:"Z",
      points: 0
    },
    {
      id: 3,
      color: 'purple',
      text:"M",
      points:0
    }],
    cullPlayers: function(amount){
      for(i=0;i<4-amount;i++) {
        service.players.pop()
      }
    },
    currentPlayer: false,
    attemptTimer: [0],
    timerTypes: [
      {
        type: "notimer",
        text: "No Time Limit"
      },
      {
        type: 600000,
        text: "10 Minute Time Limit"
      }
    ],
    time: "notimer",
    cardsSelectable: false,
    unlocked: true,
    timePenalty: function(){
      if (service.attemptTimer[0] == 0) {
        service.deductPoints()
        service.reset()
        return 
      } else {
        service.attemptTimer[0] -=1000
        return timePenaltyProm = $timeout(service.timePenalty, 1000)
      }
    },
    reset: function(){
      $timeout.cancel(timePenaltyProm)
      service.unlocked = true
      Game.selectedCards = []
      service.cardsSelectable = false
      service.attemptTimer[0] = 0
    },
    deductPoints: function(){
      service.players[service.currentPlayer].points--
    },
    addPoints: function(){
      service.players[service.currentPlayer].points++
    }

  }
  return service
}
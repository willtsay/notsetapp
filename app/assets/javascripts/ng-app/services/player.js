angular.module('notSetApp')
  .service( 'Player', [ '$rootScope', Player])

function Player($rootScope){
  var service = {
    players: [
    {
      id: 0,
      color: 'blue',
      text:"press 'Q' to attempt a set",
      points: 0
    },
    {
      id: 1,
      color: 'red',
      text:"press 'O' to attempt a set",
      points: 0
    },
    {
      id: 2,
      color: 'green',
      text:"press 'Z' to attempt a set",
      points: 0
    },
    {
      id: 3,
      color: 'yellow',
      text:"press 'M' to attempt a set",
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
    // timePenalty: function(){
    //   if (service.attemptTimer == 0)
    // }

  }
  return service
}
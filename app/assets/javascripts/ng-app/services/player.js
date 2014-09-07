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
      Player.players.pop()
    }

    }

  }
  return service
}
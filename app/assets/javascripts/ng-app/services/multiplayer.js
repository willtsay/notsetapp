angular.module('notSetApp')
  .service( 'Multiplayer', [ '$rootScope', '$timeout', 'Game', 'socket', Multiplayer])

function Multiplayer($rootScope, $timeout, Game, socket){
  var service = {
    players: [
    {
      id: 0,
      color: 'blue',
      text:"1",
      points: 0,
      active: false,
      get display(){
        if (service.currentPlayer !== this.id){
          return this.text+": "+this.points          
        }  else {
          return (service.attemptTimer[0]+1000)/1000
        }
      }
    },
    {
      id: 1,
      color: 'red',
      text:"2",
      points: 0,
      active: false,
      get display(){
        if (service.currentPlayer !== this.id){
          return this.text+": "+this.points          
        }  else {
          return (service.attemptTimer[0]+1000)/1000
        }

      }      
    },
    {
      id: 2,
      color: 'green',
      text:"3",
      points: 0,
      active: false,
      get display(){
        if (service.currentPlayer !== this.id){
          return this.text+": "+this.points          
        }  else {
          return (service.attemptTimer[0]+1000)/1000
        }
      }      
    },
    {
      id: 3,
      color: 'purple',
      text:"4",
      points: 0,
      active: false,
      get display(){
        if (service.currentPlayer !== this.id){
          return this.text+": "+this.points          
        }  else {
          console.log("THIS HAPPENED WOAH")
          return (service.attemptTimer[0]+1000)/1000
        }
      }    
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
        socket.emit('subUpdate:timer', service.attemptTimer[0])
        return timePenaltyProm = $timeout(service.timePenalty, 1000)
      }
    },
    reset: function(){
      $timeout.cancel(timePenaltyProm)
      service.currentPlayer= false
      service.unlocked = true
      Game.selectedCards = []
      service.cardsSelectable = false
      service.attemptTimer[0] = 0
      var data = {
        currentPlayer: false,
        unlocked: true,
        selectedCards: [],
        cardsSelectable: false,
        attemptTimer: 0
      }
      socket.emit('reset:timers', data)
    },
    deductPoints: function(){
      service.players[service.currentPlayer].points--
      var data ={
        player: service.currentPlayer,
        points: service.players[service.currentPlayer].points
      }
      socket.emit('update:points', data)
    },
    addPoints: function(){
      service.players[service.currentPlayer].points++
      var data ={
        player: service.currentPlayer,
        points: service.players[service.currentPlayer].points
      }
      socket.emit('update:points', data)      
    }

  }
  return service
}
var deck = (function(){
  deck = {}
  for (i = 0; i < 81; i++){
    deck[i] = new Card(i, i%3, Math.floor(i/3)%3, Math.floor(i/9)%3, Math.floor(i/27)%3)
  }
  return deck
})()

var board = makeFirstSolvableBoard(deck)


angular.module('notSetApp')
  .service( 'Game', ['$rootScope', Game])

function Game($rootScope){
  var service = {
    selectedCards: [],
    deck: deck,
    deckType:"endless",
    deckTypes: [
      {
        type: "endless",
        text: "Endless Mode"      
      },
      {
        type: "normal",
        text: "Normal Mode"
      }
    ],
    board: board,
    answer:[""],
    gameOver: false,
    consolidate: function(){
      for (i=0; i<12; i++){
        service.deck[service.board[i].id] = service.board[i]
      }
    },
    cardNotSelected: function(index){
      return ($.inArray(service.board[index], service.selectedCards) == -1)
    },
    addToSelectedCards: function(index){
      if (!service.board[index].empty)
        service.selectedCards.push(service.board[index])
    },
    threeCards: function(){
      return service.selectedCards.length == 3
    },
    isSelectedSet: function(){
      var c1 = service.selectedCards[0].stats
      var c2 = service.selectedCards[1].stats
      var c3 = service.selectedCards[2].stats
      for (c=0; c<4; c++) {
        if ((c1[c]==c2[c] && c2[c]==c3[c]) || (c1[c]!=c2[c] && c2[c]!=c3[c] && c1[c]!=c3[c])){   
        } else {
          return false
        }
      }
      return true
    },
    deckLength: function(){
      return Object.keys(service.deck).length
    },
    drawCard: function(){
      var keys = Object.keys(service.deck)
      var randomProp = keys[Math.floor(Math.random()*keys.length)]
      var card = service.deck[randomProp] 
      delete service.deck[randomProp]
      return card
    },
    replaceUsedCards: function(){
      if (service.deckLength() < 3) { 
        for(i=0; i<3; i++) {
          var change = service.board.indexOf(service.selectedCards[i])
          service.board[change] = new emptyCard()
        }
      } else {
        for (i=0; i<3; i++) {
          console.log("derp")
          var change = service.board.indexOf(service.selectedCards[i])
          service.board[change] = service.drawCard()
          if (service.deckType == "endless") {
            console.log("hello")
            for (i=0; i<3; i++) {
              service.deck[service.selectedCards[i].id]=service.selectedCards[i]
            } 
          }
        }
      }
    },
    isValidSet: function(card1,card2,card3){
      var c1=card1.stats,c2=card2.stats,c3=card3.stats
      if (card1.empty || card2.empty || card3.empty) {
        return false
      }
      for (c=0; c<4; c++) {
        if ((c1[c]==c2[c] && c2[c]==c3[c]) || (c1[c]!=c2[c] && c2[c]!=c3[c] && c1[c]!=c3[c])){   
        } else {
          return false
        }
      }
      return true
    },
    checkResetNeeded: function(start){
      if (start == 10) {
        return true
      } else {
        for(i = start+1; i < 11; i++) {
          var second = i
          for(b=second+1; b < 12; b++){
            if (service.isValidSet(service.board[start],service.board[second],service.board[b])) {
              service.answer[0]= (start+1)+","+(second+1)+","+(b+1)
              return false
            } 
          }     
        }
        return service.checkResetNeeded(start+1)
      }

    },
    deckUnsolvable: function(start, deck){
      if (start >= deck.length-2) {
        return true
      } else {
        for(x = start+1; x < deck.length-1; x++) {
          var second = x
          for(y=second+1; y < deck.length; y++){
            if (service.isValidSet(deck[start],deck[second],deck[y])) {
              return false
            } 
          }     
        }
        return service.deckUnsolvable(start+1, deck)
      }
    },
    makeBoard: function(){
      for (i=0;i<12;i++) {
        service.board[i] = service.drawCard()
      }
    },
    makeSolvableBoard: function(){
      if ( service.deckLength() <= 20) {
        var deckAsArray = []
        for(card in service.deck){
          deckAsArray.push(service.deck[card])
        } 
        if (service.deckUnsolvable(0, deckAsArray)){
          console.log("game over")
          service.gameOver = true
          return
        }
      } else {
        service.consolidate()
        service.makeBoard()
        if (service.checkResetNeeded(0)){
          return service.makeSolvableBoard()
        }
      }
    },
  }
  return service
}

function Card(id, colour,shape,shading,number){
  this.empty = false
  this.id = id
  this.shape_t = ["triangle","rectangle","diamond"]
  this.shading_t = ["border", "solid", "stripe"]
  this.number_t = [1,2,3]
  this.colour_t = ["b-01.png","g-01.png","r-01.png"]
  this.location = "/images/setimages/" + this.shape_t[shape] + "/"+ this.shading_t[shading] + "/"+ this.number_t[number] + this.colour_t[colour]
  this.stats = [shape+1,shading+1,number+1,colour+1]
}

function emptyCard(){
  this.empty = true
  this.location = "/images/setimages/emptyset.png"
}

function drawCard(deck){
  var keys = Object.keys(deck)
  var randomProp = keys[Math.floor(Math.random()*keys.length)] 
  var card = deck[randomProp]
  delete deck[randomProp]
  return card
}

function makeFirstSolvableBoard(deck){
  board = []
  for (i=0;i<12;i++) {
    board.push(drawCard(deck))
  }
  if (!solvableBoard(board,0)) {
    reshuffle(board, deck)
    return makeFirstSolvableBoard(deck)
  }
  return board
}


function solvableBoard(board,start){
  if (start == 10) {
    return false
  } else {
    for(i = start+1; i < 11; i++) {
      var second = i
      for(b=second+1; b < 12; b++){
        if (isValidSet(board[start],board[second],board[b])) {
          return true
        }
      }     
    }
    return solvableBoard(board,start+1)
  }
}

function reshuffle(board, deck){
  for (i= 0; i<12; i++){
    deck[board[i].id] = board[i]
  }
  board = []
}

function isValidSet(card1,card2,card3){
  var c1=card1.stats,c2=card2.stats,c3=card3.stats
  for (c=0; c<4; c++) {
    if ((c1[c]==c2[c] && c2[c]==c3[c]) || (c1[c]!=c2[c] && c2[c]!=c3[c] && c1[c]!=c3[c])){   
    } else {
      return false
    }
  }
  return true
}





// What exactly do i put in here??
// all game functions? 
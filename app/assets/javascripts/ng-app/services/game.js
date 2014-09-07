var deck = (function(){
  deck = {}
  for (i = 0; i < 81; i++){
    deck[i] = new Card(i, i%3, Math.floor(i/3)%3, Math.floor(i/9)%3, Math.floor(i/27)%3)
  }
  return deck
})()

var board = makeFirstSolvableBoard(deck)


angular.module('notSetApp')
  .service( 'Game', [ '$rootScope', Game])

function Game($rootScope){
  var service = {
    cardsSelectable: false,
    selectedCards: [],
    deck: deck,
    board: board,
    consolidate: function(){
      for (i= 0; i<12; i++){
        service.deck[service.board[i].id] = service.board[i]
      }
      service.board = []
    },
    makeSolvableBoard: function(){

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
    }
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
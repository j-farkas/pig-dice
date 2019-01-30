//Business Logic for Contacts -------------
//Creating a Contact constructor:
function Player() {
  this.score = 0;
  active = false;
  id = 0;
}

var player1 = new Player();
player1.active = true;
player1.id = 1;
var player2 = new Player();
player2.id = 2;
//Creating a prototype method on our constructor:

//User Interface Logic ----------------

function roll(){
  return Math.floor(Math.random() * 6 + 1);
}

/*function activePlayer(){
  if(player1.active === true){
    return player1;
  }
    return player2;
}*/

function swapActive(){
  if(player1.active === true)
  {
    player1.active = false;
    player2.active = true;
  }else{
    player1.active = true;
    player2.active = false;
  }
}

function activePlayer (){
  if(player1.active === true){
    return player1;
  }
  return player2;
}


Player.prototype.turn = function(score){
var dice = roll();
$(".roll").text(dice);
var activePlayers = activePlayer();
if(dice>1)
{
  $(".banked" + activePlayers.id).text("Banked:" + score);
  score += dice;
  $("#buttons").empty();
  $("#buttons").append("<button class='continueButton' id=" + score + ">Roll again</button>");
  $("#buttons").append("<button class='stopButton' id=" + score + ">Stop Turn</button>");
}else{
 this.score += 0;

 $(".player" + activePlayers.id).text(activePlayers.score);
 swapActive();
 activePlayers = activePlayer();
 activePlayers.turn(0);
}

}
Player.prototype.stop = function(score){
  this.score += score;
  swapActive();
}
function gameOver(player){
  $(".winner").text("Player " + player.id + " wins");
}

function attachContactListeners() {
  $("#buttons").on("click", ".continueButton", function() {
    player1.turn(parseInt(this.id));
  });
  $("#buttons").on("click", ".stopButton", function() {
    var activePlayers = activePlayer();
    activePlayers.score += parseInt(this.id);
    $(".player" + activePlayers.id).text(activePlayers.score);
    if (activePlayers.score >= 100){
      gameOver(activePlayers);
    }else{
    swapActive();
    activePlayer();
    activePlayers.turn(0);
  }
  });
};

$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    $(".btn-primary").hide();
    player1.turn(0);
  })
})

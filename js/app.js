/*
 * Create a list that holds all of your cards
 */

$(document).ready(setup)

var uncoveredCards = [];
var counter = 0;
var timer = 0;
var timerInterval;
var cards;

function createDeck() {

  return [
    {name: "diamond", picture: "fa fa-diamond", state: "covered"},
    {name: "diamond", picture: "fa fa-diamond", state: "covered"},
    {name: "paper-plane", picture: "fa fa-paper-plane-o", state: "covered"},
    {name: "paper-plane", picture: "fa fa-paper-plane-o", state: "covered"},
    {name: "anchor", picture: "fa fa-anchor", state: "covered"},
    {name: "anchor", picture: "fa fa-anchor", state: "covered"},
    {name: "bolt", picture: "fa fa-bolt", state: "covered"},
    {name: "bolt", picture: "fa fa-bolt", state: "covered"},
    {name: "cube", picture: "fa fa-cube", state: "covered"},
    {name: "cube", picture: "fa fa-cube", state: "covered"},
    {name: "bomb", picture: "fa fa-bomb", state: "covered"},
    {name: "bomb", picture: "fa fa-bomb", state: "covered"},
    {name: "leaf", picture: "fa fa-leaf", state: "covered"},
    {name: "leaf", picture: "fa fa-leaf", state: "covered"},
    {name: "bicycle", picture: "fa fa-bicycle", state: "covered"},
    {name: "bicycle", picture: "fa fa-bicycle", state: "covered"},
  ]
}

function stateToClass(state){
  if (state === "covered") {
    return "card";
  } else if (state === "uncovered"){
    return "card open show";
  } else {
    console.log("card match");
    return "card match";
  }
}

function cardToHtml(card) {
  return   `<li id='card-${card.index}' class='${stateToClass(card.state)}'><i class='${card.picture}'></i></li>`
}

function counterToHtml(counter){
  return `<span class="moves">${counter}</span> Moves`
}

function renderCounter(counterHtml){
  var a;
  a = $("#counter");
  a.html(counterHtml);
}

function renderTimer(timerParam){

    $("#timer").html(`${timerParam} seconds`)
}

function starRatingToHtml(starRating){

  if(starRating === 3){
    return `<ul class="stars" id="starRating">
        <li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>
      </ul>`
  } else if (starRating === 2){
    return `<ul class="stars" id="starRating">
        <li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>
      </ul>`
    }  else {
      return `<ul class="stars" id="starRating">
        <li><i class="fa fa-star"></i></li>
      </ul>`

  }
}



function renderStarRating(startRatingHtml){
  $("#starRating").replaceWith(startRatingHtml);
}

function counterToRating(counterParam){
  if (counterParam < 3){
    return 3;
  } else if (counterParam < 5){
    return 2;
  } else {
    return 1;
  }
}

function updateTimer(){
  renderTimer(timer);
  timer = timer + 1;
}

$("#restart").click(setup);

function uncoverCard(card){
  card.state = "uncovered";
}

function hasPlayerWon(){
  for (i = 0; i < cards.length; i++){
    if (cards[i].state !== "matched") {
      return false;
    }
  }
return true;
}

function renderCard(card){
    card.html = cardToHtml(card);
    var cardList = $("#deck")
    if ($(`#card-${card.index}`).length === 0) {
    cardList.append(card.html)
  } else {
    $(`#card-${card.index}`).replaceWith(card.html)
  }

    $(`#card-${card.index}`).click(function(){

      if (!timerInterval){
        timerInterval = setInterval(updateTimer,1000)
      }


      if (uncoveredCards.length > 1){
        return false
        }

      if (card.state !== "covered") {
        return false
      }

      uncoverCard(card);
      renderCard(card);


      uncoveredCards.push(card);
      console.log(uncoveredCards);

      if (uncoveredCards.length === 2){


        counter = counter + 1;
        var counterHtml = counterToHtml(counter);
        renderCounter(counterHtml);



        var starRatingHtml = starRatingToHtml(counterToRating(counter))
        renderStarRating(starRatingHtml);

        var cardOne = uncoveredCards[uncoveredCards.length-2];
        var cardTwo = uncoveredCards[uncoveredCards.length-1];
        console.log("card one and two", cardOne, cardTwo);

        if(cardOne.name === cardTwo.name){
          cardOne.state = "matched";
          renderCard(cardOne);
          cardTwo.state = "matched";
          renderCard(cardTwo);
          uncoveredCards = [];

          if (hasPlayerWon()) {
            clearInterval(timerInterval);

            var choice = confirm(`Congratulation! It took you ${timer} seconds to win the game. Your star rating was ${counterToRating(counter)}. Do you want to play again?`)

              if(choice){
                setup();
            }
          }
        } else {

          setTimeout(function(){
            cardOne.state = "covered";
            cardTwo.state = "covered";

            renderCard(cardOne);
            renderCard(cardTwo);

            uncoveredCards = [];

          }, 3000)


        }
      }
    }
  )
}



function setup() {
  cards = createDeck();
  var shuffledCards = shuffle(cards);

  for (i = 0; i < shuffledCards.length; i++) {
    var card = shuffledCards[i];
    card.index = i;
    renderCard(card);
  }

  timer = 0;
  clearInterval(timerInterval);
  $("#timer").html("");
  timerInterval = undefined;

  counter = 0;
  var counterHtml = counterToHtml(counter);
  renderCounter(counterHtml);

  var starRatingHtml = starRatingToHtml(3);
  renderStarRating(starRatingHtml)

}





/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}






/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

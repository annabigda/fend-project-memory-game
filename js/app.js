/*
 * Create a list that holds all of your cards
 */

const threeStarsMoves = 12;
const twoStarsMoves = 24;

let uncoveredCards = [],
  counter = 0,
  timer = 0,
  timerInterval,
  cards;

$(document).ready(setup)

$("#restart").click(setup);

// Create a new deck
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

// Change cards to matched
function lockCardsInOpenPosition(cardOne, cardTwo) {
  cardOne.state = "matched";
  cardTwo.state = "matched";
  renderCard(cardOne);
  renderCard(cardTwo);
}

// Change cards to covered
function coverCards(cardOne, cardTwo) {
  cardOne.state = "covered";
  cardTwo.state = "covered";

  renderCard(cardOne);
  renderCard(cardTwo);
}

// Counter functions
function counterToHtml(counter){
  return `<span class="moves">${counter}</span> Moves`
}

function renderCounter(){
  const counterHtml = counterToHtml(counter);
  $("#counter").html(counterHtml);
}

function incrementCounter() {
  counter = counter + 1;
  renderCounter();
}

// Based on the state of the card add the correct class
function stateToClass(state){
  if (state === "covered") {
    return "card";
  } else if (state === "uncovered"){
    return "card open show";
  } else {
    return "card match";
  }
}

function cardToHtml(card) {
  return   `<li id='card-${card.index}' class='${stateToClass(card.state)}'><i class='${card.picture}'></i></li>`
}

function updateTimer(){
  renderTimer(timer);
  timer = timer + 1;
}

function renderTimer(timerParam){
  $("#timer").html(`${timerParam} seconds`)
}

// Based on the star rating show the number of stars
function starRatingToHtml(starRating){
  if(starRating === 3){
    return `
     <ul class="stars" id="starRating">
        <li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>
     </ul>`
  } else if (starRating === 2){
    return `
    <ul class="stars" id="starRating">
        <li><i class="fa fa-star"></i></li>
        <li><i class="fa fa-star"></i></li>
    </ul>`
  }  else {
    return `
    <ul class="stars" id="starRating">
        <li><i class="fa fa-star"></i></li>
    </ul>`
  }
}

function renderStarRating(){
  const starRatingHtml = starRatingToHtml(counterToRating(counter))
  $("#starRating").replaceWith(starRatingHtml);
}

function counterToRating(counterParam){
  if (counterParam < threeStarsMoves){
    return 3;
  } else if (counterParam < twoStarsMoves){
    return 2;
  } else {
    return 1;
  }
}

function uncoverCard(card){
  card.state = "uncovered";
  renderCard(card);
}

function hasPlayerWon(){
  for (i = 0; i < cards.length; i++){
    if (cards[i].state !== "matched") {
      return false;
    }
  }
  return true;
}

// Add or replace a card in the game
function renderCard(card){
  const html = cardToHtml(card),
    cardList = $("#deck"),
    cardSelector = `#card-${card.index}`;

  if ($(cardSelector).length === 0) {
    cardList.append(html)
  } else {
    $(cardSelector).replaceWith(html)
  }

  $(cardSelector).click(function(){

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

    uncoveredCards.push(card);

    // If there are 2 uncovered cards we check whether they are the same
    if (uncoveredCards.length === 2){
      const cardOne = uncoveredCards[uncoveredCards.length-2],
        cardTwo = uncoveredCards[uncoveredCards.length-1];

      incrementCounter()

      renderStarRating();

      if(cardOne.name === cardTwo.name){
        lockCardsInOpenPosition(cardOne, cardTwo);
        uncoveredCards = [];

        if (hasPlayerWon()) {
          clearInterval(timerInterval);
          const successMessage = `Congratulation! It took you ${timer} seconds to win the game. Your star rating was ${counterToRating(counter)}. Do you want to play again?`,
            choice = confirm(successMessage);

          if(choice){
            setup();
          }
        }
      } else {
      // We wait a bit before turning them so the user can see them
        setTimeout(function(){
          coverCards(cardOne, cardTwo);
          uncoveredCards = [];
        }, 500)
      }
    }
  }
  )
}

// Setup the deck and start the game
function setup() {
  cards = createDeck();
  const shuffledCards = shuffle(cards);

  for (i = 0; i < shuffledCards.length; i++) {
    const card = shuffledCards[i];
    card.index = i;
    renderCard(card);
  }

  timer = 0;
  counter = 0;

  clearInterval(timerInterval);
  $("#timer").html("");
  timerInterval = undefined;

  renderCounter();
  renderStarRating()
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

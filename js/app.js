/*
 * Create a list that holds all of your cards
 */

$(document).ready(setup)

function createDeck() {

  return [
    {name: "diamond", picture: "fa-diamond", state: "covered"},
    {name: "diamond", picture: "fa-diamond", state: "covered"},
    {name: "paper-plane", picture: "fa-paper-plane-o", state: "covered"},
    {name: "paper-plane", picture: "fa-paper-plane-o", state: "covered"},
    {name: "anchor", picture: "fa-anchor", state: "covered"},
    {name: "anchor", picture: "fa-anchor", state: "covered"},
    {name: "bolt", picture: "fa-bolt", state: "covered"},
    {name: "bolt", picture: "fa-bolt", state: "covered"},
    {name: "cube", picture: "fa-cube", state: "covered"},
    {name: "cube", picture: "fa-cube", state: "covered"},
    {name: "anchor", picture: "fa-anchor", state: "covered"},
    {name: "anchor", picture: "fa-anchor", state: "covered"},
    {name: "leaf", picture: "fa-leaf", state: "covered"},
    {name: "leaf", picture: "fa-leaf", state: "covered"},
    {name: "bicycle", picture: "fa-bicycle", state: "covered"},
    {name: "bicycle", picture: "fa-bicycle", state: "covered"},
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

function uncoverCard(card){
  card.state = "uncovered";
}

function renderCard(card){
    console.log(card);
    card.html = cardToHtml(card);
    var cardList = $("#deck")
    if ($(`#card-${card.index}`).length === 0) {
    cardList.append(card.html)
  } else {
    $(`#card-${card.index}`).replaceWith(card.html)
  }

    $(`#card-${card.index}`).click(function(){
      uncoverCard(card);
      renderCard(card);
      var uncoveredCards = [];
      uncoveredCards.push(card);
    }
  )
}

function setup() {
  var cards = createDeck()
  var shuffledCards = shuffle(cards);

  for (i = 0; i < shuffledCards.length; i++) {
    var card = shuffledCards[i];
    card.index = i;
    renderCard(card);
  }
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

function compareCards(cardOne, cardTwo) {
  if (cardOne.picture === cardtTwo.picture){
    cardOne.state = "matched";
    cardTwo.state = "matched";
  } else {
    cardOne.state = "covered";
    cardTwo.state = "covered";
  }
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

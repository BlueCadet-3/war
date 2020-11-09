/*----- constants -----*/

const suits = ['c', 'd', 'h', 's'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

class Deck {
  constructor() {
    this.cards = [];
  }
  buildDeck() {
    for (let i = 0; i < suits.length; i++) {
      for (let j = 0; j < ranks.length; j++) {
        this.cards.push(new Card(suits[i], ranks[j], values[j]));
      }
    }
  }
}

class Card {
  constructor(suit, rank, value) {
    this.suit = suit;
    this.rank = rank;
    this.value = value;
  }
}

const deck = new Deck();

/*----- app's state (variables) -----*/

let shufDeck = [];
let userDeck = [];
let cpuDeck = [];

/*----- cached element references -----*/

const msg = document.getElementById('msg');
const replay = document.getElementById('replay');

/*----- event listeners -----*/

replay.addEventListener('click', init);


/*----- functions -----*/

function init() {
  deck.buildDeck();
  shuffleDeck(deck);
  dealCards(shufDeck);
  makeBattle();
}

function shuffleDeck(deck) {
  const tempDeck = Array.from(deck.cards);
  while (tempDeck.length) {
    const rndIdx = Math.floor(Math.random() * tempDeck.length);
    shufDeck.push(tempDeck.splice(rndIdx, 1)[0]);
  }
}

function dealCards(deck) {
  while (shufDeck.length > 0) {
    userDeck.push(shufDeck.shift());
    cpuDeck.push(shufDeck.shift());
  }
}

function makeBattle() {
  let userCard = userDeck.shift();
  let cpuCard = cpuDeck.shift();
  if (userCard.value === cpuCard.value) {
    console.log("Going to war!");
    console.log(userCard.value, cpuCard.value);
    makeWar(userCard, cpuCard);
  } else if (userCard.value > cpuCard.value) {
    console.log(userCard.value, cpuCard.value);
    userDeck.push(userCard, cpuCard);
  } else {
    console.log(userCard.value, cpuCard.value);
    cpuDeck.push(cpuCard, userCard);
  }
  console.log(userDeck.length, cpuDeck.length);
  getOutcome();
}

function makeWar(userCard, cpuCard) {
  let userCard2 = userDeck.shift();
  let userCard3 = userDeck.shift();
  let cpuCard2 = cpuDeck.shift();
  let cpuCard3 = cpuDeck.shift();
  if (userCard3.value > cpuCard3.value) {
    userDeck.push(userCard, userCard2, userCard3, cpuCard, cpuCard2, cpuCard3);
    console.log(userCard3.value, cpuCard3.value);
  } else {
    cpuDeck.push(userCard, userCard2, userCard3, cpuCard, cpuCard2, cpuCard3);
    console.log(userCard3.value, cpuCard3.value);
  }
}

function getOutcome() {
  if (userDeck.length === 52) {
    console.log("You won the war!");
  } else if (userDeck.length === 0) {
    console.log("You lose the war");
  }
}

init();
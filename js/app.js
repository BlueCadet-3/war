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



/*----- functions -----*/

function init() {
  deck.buildDeck();
}

function shuffleDeck(deck) {
  const tempDeck = Array.from(deck.cards);
  while (tempDeck.length) {
    const rndIdx = Math.floor(Math.random() * tempDeck.length);
    shufDeck.push(tempDeck.splice(rndIdx, 1)[0]);
}
}

init();

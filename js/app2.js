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
let userHand = [];
let cpuHand = [];
let outcome = null;

/*----- cached element references -----*/

const msg = document.getElementById('msg');
const userHandSizeEl = document.getElementById('userHandSize');
const cpuHandSizeEl = document.getElementById('cpuHandSize');

const userHandEl = document.getElementById('userHand');
const cpuHandEl = document.getElementById('cpuHand');

const userPlay = document.getElementById('userPlay');
const userPlay2 = document.getElementById('userPlay2');
const userPlay3 = document.getElementById('userPlay3');

const cpuPlay = document.getElementById('cpuPlay');
const cpuPlay2 = document.getElementById('cpuPlay2');
const cpuPlay3 = document.getElementById('cpuPlay3');

const replayBtn = document.getElementById('replay');

const cardShuffleSnd = document.getElementById('shuffle');
const cardFlickSnd = document.getElementById('cardFlick');
const warSnd = document.getElementById('war');
const winSnd = document.getElementById('win');
const loseSnd = document.getElementById('lose');

/*----- event listeners -----*/

replayBtn.addEventListener('click', init);
userHandEl.addEventListener('click', makeBattle);


/*----- functions -----*/

function init() {
  if (deck.cards.length) {return;
  } else {
  deck.buildDeck();
  shuffleDeck(deck);
  dealCards(shufDeck);
  cardShuffleSnd.play();
  getOutcome();
  render();
  }
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
    userHand.push(shufDeck.shift());
    cpuHand.push(shufDeck.shift());
  }
}

function makeBattle() {
  cardFlickSnd.play();
  let userCard = userHand.shift();
  let cpuCard = cpuHand.shift();
  if (userCard.value === cpuCard.value) {
    msg.innerText = "Going to war!";
    makeWar(userCard, cpuCard);
  } else if (userCard.value > cpuCard.value) {
    userHand.push(userCard, cpuCard);
  } else {
    cpuHand.push(cpuCard, userCard);
  }
  getOutcome();
  render(userCard, cpuCard);
}

function makeWar(userCard, cpuCard) {
  

}

function getOutcome() {
  if (userHand.length === 52) {
    winSnd.play();
    msg.innerText = "You managed the impossible...you won!";
    replayBtn.style.visibility = 'visible';
  } else if (userHand.length === 0) {
      loseSnd.play();
      msg.innerText = "Wow...you're not too good at this!";
      replayBtn.style.visibility = 'visible';
  } else {
      msg.innerText = "Keep battling!";
      replayBtn.style.visibility = 'hidden';
  }
}

function render(userCard, cpuCard) {
  cpuHandSizeEl.innerText = cpuHand.length;
  userHandSizeEl.innerText = userHand.length;
  cpuPlay.innerHTML = `<div class="card ${cpuCard.suit}${cpuCard.rank}"></div>`;
  userPlay.innerHTML = `<div class="card ${userCard.suit}${userCard.rank}"></div>`;
}

init();
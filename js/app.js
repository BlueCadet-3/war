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
let outcome = null;

/*----- cached element references -----*/

const msg = document.getElementById('msg');
const cpuCount = document.getElementById('cpuCount');
const cpuOnDeck = document.getElementById('cpuOnDeck');
const cpuPlay = document.getElementById('cpuPlay');
const userCount = document.getElementById('userCount');
const userOnDeck = document.getElementById('userOnDeck');
const userPlay = document.getElementById('userPlay');
const replay = document.getElementById('replay');
const cardFlick = document.getElementById('card-flick');

/*----- event listeners -----*/

replay.addEventListener('click', init);
userOnDeck.addEventListener('click', makeBattle);


/*----- functions -----*/

function init() {
  if (deck.cards.length === 52) {
    return;
  } else {
  deck.buildDeck();
  shuffleDeck(deck);
  document.getElementById('shuffle').play();
  dealCards(shufDeck);
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
    userDeck.push(shufDeck.shift());
    cpuDeck.push(shufDeck.shift());
  }
}

function makeBattle() {
  cardFlick.play();
  let userCard = userDeck.shift();
  let cpuCard = cpuDeck.shift();
  if (userCard.value === cpuCard.value) {
    msg.innerText = "Going to war!";
    makeWar(userCard, cpuCard);
  } else if (userCard.value > cpuCard.value) {
    userDeck.push(userCard, cpuCard);
  } else {
    cpuDeck.push(cpuCard, userCard);
  }
  getOutcome();
  render(userCard, cpuCard);
}

function makeWar(userCard, cpuCard) {
  let userCard2 = userDeck.shift();
  let userCard3 = userDeck.shift();
  let cpuCard2 = cpuDeck.shift();
  let cpuCard3 = cpuDeck.shift();
  document.getElementById('userPlay2').innerHTML = `<div class="card ${userCard2.suit}${userCard2.rank}"></div>`;
  document.getElementById('userPlay3').innerHTML = `<div class="card ${userCard3.suit}${userCard3.rank}"></div>`;
  document.getElementById('cpuPlay2').innerHTML = `<div class="card ${cpuCard2.suit}${cpuCard2.rank}"></div>`;
  document.getElementById('cpuPlay3').innerHTML = `<div class="card ${cpuCard3.suit}${cpuCard3.rank}"></div>`;
  if (userCard3.value > cpuCard3.value) {
    userDeck.push(userCard, userCard2, userCard3, cpuCard, cpuCard2, cpuCard3);
  } else {
    cpuDeck.push(userCard, userCard2, userCard3, cpuCard, cpuCard2, cpuCard3);
  }
}

function getOutcome() {
  if (userDeck.length === 52) {
    replay.style.visibility = 'visible';
    msg.innerText = "You managed the impossible...you won!";
    document.getElementById('win').play();
  } else if (userDeck.length === 0) {
      replay.style.visibility = 'visible';
      msg.innerText = "Wow...you're not too good at this!";
  } else {
      replay.style.visibility = 'hidden';
      msg.innerText = "Keep battling!";
  }
}

function render(userCard, cpuCard) {
  cpuPlay.innerHTML = `<div class="card ${cpuCard.suit}${cpuCard.rank}"></div>`;
  userPlay.innerHTML = `<div class="card ${userCard.suit}${userCard.rank}"></div>`;
  cpuCount.innerText = cpuDeck.length;
  userCount.innerText = userDeck.length;
}

init();
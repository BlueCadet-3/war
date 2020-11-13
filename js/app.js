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
let userBattleHand = [];
let cpuBattleHand = [];
let outcome = null;

/*----- cached element references -----*/

const msg = document.getElementById('msg');
const userHandSizeEl = document.getElementById('userHandSize');
const cpuHandSizeEl = document.getElementById('cpuHandSize');

const userHandEl = document.getElementById('userHand');
const cpuHandEl = document.getElementById('cpuHand');
const userBattleRow = document.getElementById('userBattleRow');
const cpuBattleRow = document.getElementById('cpuBattleRow');

const replayBtn = document.getElementById('replay');
const warBtn = document.getElementById('warBtn');

const cardShuffleSnd = document.getElementById('shuffle');
const cardFlickSnd = document.getElementById('cardFlick');
const warSnd = document.getElementById('war');
const winSnd = document.getElementById('win');
const loseSnd = document.getElementById('lose');

/*----- event listeners -----*/

userHandEl.addEventListener('click', makeBattle);
warBtn.addEventListener('click', makeWar);

/*----- functions -----*/

function init() {
  cardShuffleSnd.play();
  if (deck.cards.length) {
    return;
  } else {
      deck.buildDeck();
      shuffleDeck(deck);
      dealCards(shufDeck);
      warBtn.style.visibility = 'hidden';
      replayBtn.style.visibility = 'hidden';
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
  userBattleHand.push(userHand.shift());
  cpuBattleHand.push(cpuHand.shift());
  render();
  if (userBattleHand[userBattleHand.length -1].value === cpuBattleHand[cpuBattleHand.length -1].value) {
    warSnd.play();
    msg.innerText = 'Going to war!';
    userHandEl.style.pointerEvents = 'none';
    warBtn.style.visibility = 'visible';
  } else if (userBattleHand[userBattleHand.length -1].value > cpuBattleHand[cpuBattleHand.length -1].value) {
    userHand.push(userBattleHand.shift(), cpuBattleHand.shift());
    msg.innerText = 'Wow...nice job!';
  } else {
    cpuHand.push(cpuBattleHand.shift(), userBattleHand.shift());
    msg.innerText = 'Better luck next time!';
  }
  getOutcome();
}

function makeWar() {
  userHandEl.style.pointerEvents = 'visible'; 
  warBtn.style.visibility = 'hidden';
  userBattleHand.push(userHand.shift(), userHand.shift());
  cpuBattleHand.push(cpuHand.shift(), cpuHand.shift());
  render();
  while (userBattleHand[userBattleHand.length -1].value === cpuBattleHand[cpuBattleHand.length - 1].value) {
    userBattleHand.push(userHand.shift(), userHand.shift());
    cpuBattleHand.push(cpuHand.shift(), cpuHand.shift());
    userHandEl.style.pointerEvents = 'none';
    warBtn.style.visibility = 'visible';
  } if (cpuBattleHand.length < 3 ||  userBattleHand[userBattleHand.length -1].value > cpuBattleHand[cpuBattleHand.length -1].value) {
    userHand.push(...userBattleHand.splice(0), ...cpuBattleHand.splice(0));
  } else (userBattleHand.length < 3); {
    cpuHand.push(...cpuBattleHand.splice(0), ...userBattleHand.splice(0));
  }
  getOutcome();
}

function getOutcome() {
  if (userHand.length + userBattleHand.length >= 52) {
    winSnd.play();
    replayBtn.style.visibility = 'visible';
    userHandEl.style.pointerEvents = 'none';
    cpuHandEl.innerHTML = "";
    msg.innerText = "You accomplished the impossible...you win!";
  } else if(userHand.length === 0) {
    loseSnd.play();
    replayBtn.style.visibility = 'visible';
    userHandEl.style.pointerEvents = 'none';
    userHandEl.innerHTML = "";
    msg.innerText = "You stink! Try harder next time!";
  }
}

function render() {
  userHandSizeEl.innerText = userHand.length + userBattleHand.length;
  cpuHandSizeEl.innerText = cpuHand.length + cpuBattleHand.length;
  userBattleRow.innerHTML = `<div class="card ${userBattleHand[userBattleHand.length - 1].suit}${userBattleHand[userBattleHand.length - 1].rank}"></div>`;
  cpuBattleRow.innerHTML = `<div class="card ${cpuBattleHand[cpuBattleHand.length -1].suit}${cpuBattleHand[cpuBattleHand.length - 1].rank}"></div>`;
}

init();
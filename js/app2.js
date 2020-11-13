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
  cardShuffleSnd.play();
  if (deck.cards.length) {return;
  } else {
  deck.buildDeck();
  shuffleDeck(deck);
  dealCards(shufDeck);
  // render();
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
  render(userBattleHand[0], cpuBattleHand[0]);
  if (userBattleHand[0]["value"] === cpuBattleHand[0]["value"]) {
    makeWar(userBattleHand, cpuBattleHand);
  } else if (userBattleHand[0]["value"] > cpuBattleHand[0]["value"]) {
    userHand.push(userBattleHand.shift(), cpuBattleHand.shift());
  } else {
    cpuHand.push(cpuBattleHand.shift(), userBattleHand.shift());
  }
  getOutcome(userHand);
}

function makeWar(userBattleHand, cpuBattleHand) {
  warSnd.play();
  userBattleHand.push(userHand.shift(), userHand.shift());
  cpuBattleHand.push(cpuHand.shift(), cpuHand.shift());
  render(userBattleHand[0], cpuBattleHand[0]);
  if (userBattleHand[2]["value"] === cpuBattleHand[2]["value"]) {
    userBattleHand.push(userHand.shift(), userHand.shift());
    cpuBattleHand.push(cpuHand.shift(), cpuHand.shift());
  } else if (userBattleHand[2]["value"] > cpuBattleHand[2]["value"]) {
    userHand.push(userBattleHand.splice(0, 3), cpuBattleHand.splice(0, 3));
  } else {
    cpuHand.push(cpuBattleHand.splice(0, 3), userBattleHand.splice(0, 3));
  }
}

function getOutcome(userHand) {
  if (userHand.length === 52) {
    winSnd.play();
    msg.innerText = "You accomplished the impossible...you win!";
  } else if(userHand.length === 0) {
    loseSnd.play();
    msg.innerText = "You stink! Try harder next time!";
  }
}

function render(userBattleHand, cpuBattleHand) {
  userHandSizeEl.innerText = userHand.length;
  cpuHandSizeEl.innerText = cpuHand.length;
  userBattleRow.innerHTML = `<div class="card ${userBattleHand["suit"]}${userBattleHand["rank"]}">`;
  cpuBattleRow.innerHTML = `<div class="card ${cpuBattleHand["suit"]}${cpuBattleHand["rank"]}"></div>`;
}

init();
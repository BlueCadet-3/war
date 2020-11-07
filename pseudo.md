1) Define required constants
  1.1] class Deck
    1.1.1] const s, c, h, d


2) Define required variables used to track the state of the game
  2.1] let userDeck;
  2.2] let cpuDeck;
  2.3] let outcome;

3) Store elements on the page that will be accessed in code more than once in variables to make code more concise, readable and performant.
  3.1] const userOnDeck to #userOnDeck HTML element
  3.2] const cpuOnDeck to #cpuOnDeck HTML element
  3.3] const replayBtn to #replay HTML element

4) Upon loading the app should:
	4.1) Initialize the state variables
    4.1.1] shuffle Deck
    4.1.2] distribute cards to userDeck and cpuDeck
    4.1.3] let outcome = null; until there is a winner
	4.2) Render those values to the page
	4.3) Wait for the user to click a square

5) Handle a player clicking a square
  5.1] shift() user card from userDeck array and cpuDeck array
  5.2] compare ranks
    5.2.1] higher rank wins, winner push() cards to bottom of deck
    5.2.2] if cards are of equal rank, shift() one card face down and the next face up
      5.2.2.1] if face up cards are of same rank, begin another war
  5.3] determine higher rank, winner push() cards to bottom of deck

6) Handle a player clicking the replay button
  6.1] init();
  6.2] render();
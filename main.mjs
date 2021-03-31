import { createDeck } from "./Deck/mainDeck.mjs";
import { createPlayer } from "./Player/mainPlayer.mjs";
import { giveInitialCards, getGameRules, getGame } from "./Game/mainGame.mjs";
import { getPlayers } from "./configure.js";

let deck;
let rules;
let game;
let players = [];


const getInitialCards = () => {
  for (let i = 0; i < players.length; i++) {
    players[i].hand = giveInitialCards(game, rules);
    console.log(players[i]);
  }
};
const getRules = (game) => (rules = getGameRules(game));

const getNewGame = (deck) => (game = getGame(deck));

const createPlayers = (num) => {
  let playersInfo = getPlayers(num);
  for (let i = 0; i < playersInfo.length; i++) {
    players.push(
      createPlayer(
        playersInfo[i].name,
        playersInfo[i].color,
        playersInfo[i].order
      )
    );
  }
};

function initializeGame(hasJokers, deckType) {
  deck = createDeck();
  createPlayers(3);
  getNewGame(deck);
  getRules("game");
  getInitialCards();
}
initializeGame();

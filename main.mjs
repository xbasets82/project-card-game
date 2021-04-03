import { createDeck } from "./Deck/mainDeck.mjs";
import {
  createPlayer,
  createCrupier,
  newHand,
} from "./Player/mainPlayer.mjs";
import {
  giveInitialCards,
  giveCrupierInitialCards,
  getGameRules,
  getGame,
  gameProcess
} from "./Game/mainGame.mjs";

import { getPlayers } from "./configure.js";

let deck;
let game;
let players = [];
let crupier;


const getPlayersCards = () => {
  for (let i = 0; i < players.length; i++) {
    players[i].hand = newHand(giveInitialCards(game));
    console.log(`${players[i].name} cards:`);
    players[i].hand.printHand();
  }
};
const getCrupierCards = () => {
  crupier.hand = newHand(giveCrupierInitialCards(game));
  console.log(`${crupier.name} cards:`);
  crupier.hand.printHand();
};
const getInitialCards = () => {
  getPlayersCards();
  getCrupierCards();
};
const getRules = () => (game.rules = getGameRules(game));

const getNewGame = () => (game = getGame(deck));

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

const getCrupier = () =>
  (crupier = createCrupier("Crupier", "black", players.length + 1, true));

function initializeGame(hasJokers, deckType) {
  deck = createDeck();
  createPlayers(3);
  getCrupier();
  getNewGame();
  getRules();
  getInitialCards();
}

initializeGame();
gameProcess(players,crupier,game,false);


// document.addEventListener("DOMContentLoaded",initializeGame());

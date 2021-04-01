import { createDeck } from "./Deck/mainDeck.mjs";
import {
  createPlayer,
  updateHand,
  createCrupier,
  newHand,
} from "./Player/mainPlayer.mjs";
import {
  giveInitialCards,
  giveCrupierInitialCards,
  getGameRules,
  getGame,
  askForOptions,
  excuteAction,
} from "./Game/mainGame.mjs";

import { getPlayers } from "./configure.js";

let stdin = process.openStdin();
process.stdin.setRawMode(true);
process.stdin.resume();
stdin.setEncoding("utf8");

let deck;
let game;
let players = [];
let crupier;

const playerTurn = () => {
  players[game.playerTurn].hand.printHand();
  askForOptions();
  process.stdin.once("data", function (key) {
    // console.log(`${key}`);
    let currentTurn = game.playerTurn;
    let result = excuteAction(key, game)
    if(currentTurn === game.playerTurn){
      players[game.playerTurn].hand.cards.push(result);      
      gameProcess(false);
    }else if(game.playerTurn >= players.length) {      
      console.log(`El jugador ${players[currentTurn].name} se planta`);
      players[currentTurn].hand.printHand();
      gameProcess(true);
    }else{
      console.log(`El jugador ${players[currentTurn].name} se planta`);
      players[currentTurn].hand.printHand();
      gameProcess(false);
    }
    
  });
};

const crupierTurn = () =>{
  crupier.hand.printHand();
  if (crupier.hand.getHandValue() <= 16){
    crupier.hand.cards.push(game.giveCard(game,true));
    crupier.hand.printHand();
    crupierTurn();
  }else{
    console.log("crupier hand");
    crupier.hand.printHand();
  }

}


const gameProcess = (isCrupier) => {
  isCrupier === false ?  playerTurn() : crupierTurn();
};

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
gameProcess(false);

// document.addEventListener("DOMContentLoaded",initializeGame());

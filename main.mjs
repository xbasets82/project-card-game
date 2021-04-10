import { createDeck } from "./Deck/mainDeck.mjs";
import { createPlayer, createCrupier, newHand } from "./Player/mainPlayer.mjs";
import {
  giveInitialCards,
  giveCrupierInitialCards,
  getGameRules,
  getGame,
  askForOptions,
  findAction,
  excuteAction,
  validateHand,
  controlSpecialCases,
  compareResults,
  validateTopCrupier,
  replaceCardValue,
} from "./Game/mainGame.mjs";

import { getPlayers } from "./configure.js";

let stdin = process.openStdin();
stdin.setEncoding("utf8");
process.stdin.setRawMode(true);
process.stdin.resume();


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

const printOptions = () => {
  let options = askForOptions();
  for (let i = 0; i < options.length; i++) {
    console.log(`Press ${options[i].key} to ${options[i].action}`);
  }
};

const setNextTurn = () => {
  if (game.playerTurn === players.length - 1) {
    gameProcess(true);
  } else {
    game.nextPlayerTurn();
    gameProcess(false);
  }
};

const moreThan21 = (currentTurn) => {
  console.log(`El jugador ${players[currentTurn].name} se ha pasado`);
  players[currentTurn].hand.printHand();
};

const noMoreCards = (currentTurn) => {
  console.log(`El jugador ${players[currentTurn].name} se planta`);
};

const validateTurn = (currentTurn, result) => {
  if (currentTurn === game.playerTurn) {
    players[game.playerTurn].hand.cards.push(result);
    let handResult = validateHand(currentTurn, players);
    if (handResult === true) {
      gameProcess(false);
    } else {
      let validateCase = controlSpecialCases(currentTurn, players);
      if (validateCase === true) {
        gameProcess(false);
      } else {
        moreThan21(currentTurn);
        setNextTurn(currentTurn);
      }
    }
  } else if (game.playerTurn >= players.length) {
    noMoreCards(currentTurn);
    gameProcess(true);
  } else {
    noMoreCards(currentTurn);
    gameProcess(false);
  }
};

const keyControl = () => {
  printOptions();
  process.stdin.once("data", function (key) {
    let currentTurn = game.playerTurn;
    let action = findAction(key);
    if (action !== undefined) {
      let resultAction = excuteAction(action, game);
      validateTurn(currentTurn, resultAction);
    } else {
      console.log(`invalid Action!`);
      keyControl();
    }
  });
};

const playerTurns = () => {
  console.log(`${players[game.playerTurn].name} : `);
  players[game.playerTurn].hand.printHand();
  keyControl();
};

const crupierTurn = () => {
  crupier.hand.printHand();
  if (validateTopCrupier(crupier)) {
    crupier.hand.cards.push(game.giveCard(game, true));
    crupier.hand.printHand();
    crupierTurn();
  } else {
    if (crupier.hand.hasHandSpecialValues()) {
      replaceCardValue(crupier);
      crupierTurn();
    } else {
      console.log("crupier hand:");
      crupier.hand.printHand();
      compareResults(crupier, players);
      process.exit(1);
    }
  }
};

const gameProcess = (isCrupier) => {
  console.log("-------------------------");
  isCrupier === false ? playerTurns() : crupierTurn();
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
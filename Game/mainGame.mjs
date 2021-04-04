import Game from "./game.js";
import Rules from "./rules.js";

let stdin = process.openStdin();
stdin.setEncoding("utf8");
process.stdin.setRawMode(true);
process.stdin.resume();

const actions = [
  { action: "C", function: (game) => game.giveCard(true) },
  { action: "P", function: (game) => game.pass() },
  { action: "X", function: () => process.exit(1) },
];

let game;
let players = [];
let crupier;

const crupierTurn = () => {
  crupier.hand.printHand();
  if (crupier.hand.getHandValue() <= 16) {
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
      compareResults();
    }
  }
};

const setNextTurn = () => {
  if (game.playerTurn === players.length - 1) {
    processToDo(true);
  } else {
    game.nextPlayerTurn();
    processToDo(false);
  }
};
const replaceCardValue = (player) => {
  for (let i = 0; i < player.hand.cards.length; i++) {
    if (
      player.hand.cards[i].gameAlternativeValue !== undefined &&
      player.hand.cards[i].gameAlternativeValue < player.hand.cards[i].gameValue
    ) {
      player.hand.cards[i].gameValue =
        player.hand.cards[i].gameAlternativeValue;
      player.hand.cards[i].gameAlternativeValue = undefined;
      break;
    }
  }
};
const reviewHandValue = (currentTurn) => {
  replaceCardValue(players[currentTurn]);
  validateHand(currentTurn);
};

const controlSpecialCases = (currentTurn) => {
  if (players[currentTurn].hand.hasHandSpecialValues()) {
    reviewHandValue(currentTurn);
  } else {
    moreThan21(currentTurn);
    setNextTurn(currentTurn);
  }
};

const validateHand = (currentTurn) => {
  switch (true) {
    case players[currentTurn].hand.getHandValue() > 21:
      controlSpecialCases(currentTurn);
      break;
    default:
      processToDo(false);
      break;
  }
};

const validateTurn = (currentTurn, result) => {
  if (currentTurn === game.playerTurn) {
    players[game.playerTurn].hand.cards.push(result);
    validateHand(currentTurn);
  } else if (game.playerTurn >= players.length) {
    noMoreCards(currentTurn);
    processToDo(true);
  } else {
    noMoreCards(currentTurn);
    processToDo(false);
  }
};

const findAction = (action) => {
  return actions.find((Element) => Element.action === action);
};
const excuteAction = (actionToExecute, game) => {
  return actionToExecute.function(game);
};

const keyControl = () => {
  askForOptions();
  process.stdin.once("data", function (key) {
    let currentTurn = game.playerTurn;
    let action = findAction(key);
    if (action !== undefined) {
      let result = excuteAction(action, game);
      validateTurn(currentTurn, result);
    } else {
      console.log(`Acción no válida`);
      keyControl();
    }
  });
};

const playerTurn = () => {
  console.log(`${players[game.playerTurn].name} : `);
  players[game.playerTurn].hand.printHand();
  keyControl();
};

const moreThan21 = (currentTurn) => {
  console.log(`El jugador ${players[currentTurn].name} se ha pasado`);
  players[currentTurn].hand.printHand();
};

const noMoreCards = (currentTurn) => {
  console.log(`El jugador ${players[currentTurn].name} se planta`);
};

const processToDo = (isCrupier) =>
  isCrupier === false ? playerTurn() : crupierTurn();

const askForOptions = () =>
  console.log(
    `${
      players[game.playerTurn].name
    }: Elegir opcion : Carta = C, Plantarse = P, Salir del Juego = X`
  );

const compareResults = () => {
  console.log(`puntuación Crupier : ${crupier.hand.getHandValue()}`);
  let crupierPoints = crupier.hand.getHandValue();
  for (let i = 0; i < players.length; i++) {
    let playerPoints = players[i].hand.getHandValue();
    console.log(
      `puntuación ${players[i].name} : ${players[i].hand.getHandValue()}`
    );
    if (
      playerPoints === 21 ||
      (playerPoints > crupierPoints && playerPoints < 21) ||
      (crupierPoints > 21 && playerPoints <= 21)
    ) {
      console.log("WIN");
    } else if (playerPoints === crupierPoints && playerPoints <= 21) {
      console.log("DEUCE");
    } else {
      console.log("LOSE");
    }
  }
  process.exit(1);
};

export const gameProcess = (
  gamePlayers,
  gameCrupier,
  actualGame,
  isCrupier
) => {
  game = actualGame;
  crupier = gameCrupier;
  players = gamePlayers;
  console.log("-------------------------");
  isCrupier === false ? playerTurn() : crupierTurn();
};

export const giveInitialCards = (game) => game.giveInitialCards();

export const giveCrupierInitialCards = (game) => game.giveCrupierInitialCards();

export const giveCard = (game, isVisible) => game.giveCard(isVisible);

export const removeCard = () => "";

export const getGameRules = (game) => new Rules(2, 1);

export const getGame = (deck) => new Game(deck);
//cal fer obtenció de les rules d'algun fitxer

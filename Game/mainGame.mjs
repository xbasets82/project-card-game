import Game from "./game.js";
import Rules from "./rules.js";

let stdin = process.openStdin();
stdin.setEncoding("utf8");
process.stdin.setRawMode(true);
process.stdin.resume();

const actions = [
  { action: "C", function: (game) => game.giveCard(true) },
  { action: "P", function: (game) => game.pass() },
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
    console.log("crupier hand:");
    crupier.hand.printHand();
    compareResults();
  }
};

const validateHand = (currentTurn) => {
  switch (true) {
    case players[game.playerTurn].hand.getHandValue() > 21:
      moreThan21(currentTurn);
      game.nextPlayerTurn();
      processToDo(false);
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
const playerTurn = () => {
  console.log(`${players[game.playerTurn].name} : `);
  players[game.playerTurn].hand.printHand();
  askForOptions();
  process.stdin.once("data", function (key) {
    let currentTurn = game.playerTurn;
    let result = excuteAction(key, game);
    validateTurn(currentTurn,result);
  });
};

const moreThan21 = (currentTurn) => {
  console.log(`El jugador ${players[currentTurn].name} se ha pasado`);
  players[currentTurn].hand.printHand();
};

const noMoreCards = (currentTurn) => {
  console.log(`El jugador ${players[currentTurn].name} se planta`);
  // players[currentTurn].hand.printHand();
};

const processToDo = (isCrupier) =>
  isCrupier === false ? playerTurn() : crupierTurn();

const askForOptions = () =>
  console.log(
    `${players[game.playerTurn].name}: Elegir opcion : Carta = C, Plantarse = P`
  );

export const compareResults = () => {
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
    } else {
      console.log("LOSE");
    }
  }
  process.exit(1);
};

export const excuteAction = (action, game) => {
  let actionToExecute = actions.find((Element) => Element.action === action);
  return actionToExecute.function(game);
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
  console.log("--------------------");
  isCrupier === false ? playerTurn() : crupierTurn();
};

export const giveInitialCards = (game) => game.giveInitialCards();

export const giveCrupierInitialCards = (game) => game.giveCrupierInitialCards();

export const giveCard = (game, isVisible) => game.giveCard(isVisible);

export const removeCard = () => "";

export const getGameRules = (game) => new Rules(2, 1);

export const getGame = (deck) => new Game(deck);
//cal fer obtenció de les rules d'algun fitxer

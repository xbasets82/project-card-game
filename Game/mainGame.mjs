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

// export const crupierTurn = (crupier, game) => {
//   crupier.hand.printHand();
//   if (crupier.hand.getHandValue() <= 16) {
//     crupier.hand.cards.push(game.giveCard(game, true));
//     crupier.hand.printHand();
//     crupierTurn(crupier, game);
//   } else {
//     if (crupier.hand.hasHandSpecialValues()) {
//       replaceCardValue(crupier);
//       crupierTurn(crupier, game);
//     } else {
//       console.log("crupier hand:");
//       crupier.hand.printHand();
//       compareResults();
//     }
//   }
// };

export const validateTopCrupier = (crupier) => {
  if (crupier.hand.getHandValue() <= 16) {
    return true;
  } else {
    return false;
  }
};

export const replaceCardValue = (player) => {
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

const reviewHandValue = (currentTurn, players) => {
  replaceCardValue(players[currentTurn]);
  return validateHand(currentTurn, players);
};

export const controlSpecialCases = (currentTurn, players) => {
  if (players[currentTurn].hand.hasHandSpecialValues()) {
    return reviewHandValue(currentTurn, players);
  } else {
    return false;
  }
};


export const validateHand = (currentTurn, players) => {
  switch (true) {
    case players[currentTurn].hand.getHandValue() > 21:
      return false;
      // controlSpecialCases(currentTurn);
      break;
    default:
      return true;
      break;
  }
};



export const findAction = (action) => {
  return actions.find((Element) => Element.action === action);
};
export const excuteAction = (actionToExecute, game) => {
  return actionToExecute.function(game);
};



const processToDo = (isCrupier) =>
  isCrupier === false ? playerTurn() : crupierTurn();

export const askForOptions = () => [
  { key: "C", action: "Carta" },
  { key: "P", action: "Plantarse" },
  { key: "X", action: "Salir del Juego" },
];


export const compareResults = (crupier, players) => {
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

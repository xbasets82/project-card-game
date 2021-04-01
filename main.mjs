import { createDeck } from "./Deck/mainDeck.mjs";
import {
  createPlayer,
  updateHand,
  createCrupier,
} from "./Player/mainPlayer.mjs";
import { giveInitialCards,giveCrupierInitialCards, getGameRules, getGame } from "./Game/mainGame.mjs";
import { getPlayers } from "./configure.js";


let stdin = process.openStdin();
let deck;
let game;
let players = [];
let crupier;

const gameProcess = () => {

  
};

const getPlayersCards =()=> {
  for (let i = 0; i < players.length; i++) {
    players[i].hand = updateHand(giveInitialCards(game));
    console.log(`${players[i].name} cards:`);
    players[i].hand.printHand();
  }
};
const getCrupierCards=()=>{
  crupier.hand = updateHand(giveCrupierInitialCards(game));
  console.log(`${crupier.name} cards:`);
  crupier.hand.printHand();
}
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
  process.stdin.setRawMode(true);
  process.stdin.resume();
  stdin.setEncoding("utf8");
  stdin.on("data", function (key) {
    // ctrl-c ( end of text )
    if (key === "\u0003") {
      process.exit();
    }
    // write the key to stdout all normal like
    //process.stdout.write( key );
    console.log("SSS");
  });
}

initializeGame();
gameProcess();

// document.addEventListener("DOMContentLoaded",initializeGame());

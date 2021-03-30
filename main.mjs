import { createDeck } from "./Deck/mainDeck.mjs";
import { createPlayer } from "./Player/mainPlayer.mjs";
import { giveInitialCards, getGameRules, getGame} from "./Game/mainGame.mjs";
// import { getGameRules } from "./Game/mainGame.mjs";
let deck;
let players = [];
let rules;
let game;
let possiblePlayers = [
  { name: "Xavi", color: "red", order: 1 },
  { name: "Irene", color: "blue", order: 2 },
  { name: "Adria", color: "yellow", order: 3 },
  { name: "Joan", color: "green", order: 4 }
];

const getInitialCards = ()=>{
  for(let i = 0; i < players.length;i++){
   players[i].hand = giveInitialCards(game,rules);
   console.log(players[i]);
  }
}
const getRules =(game)=> rules = getGameRules(game);

const getNewGame =(deck)=> game = getGame(deck);

const createPlayers = (num) => {
  for (let i = 0; i < num; i++) {
    players.push(createPlayer(possiblePlayers[i].name,possiblePlayers[i].color,possiblePlayers[i].order));
  }
  console.log(players)
};

function initializeGame(hasJokers, deckType) {
  deck = createDeck();
  createPlayers(3);
  getNewGame(deck);
  getRules("game");
  getInitialCards();
}
initializeGame();

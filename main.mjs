 import {createDeck} from "./Deck/mainDeck.mjs";
 let deck = [];

function initializeGame(hasJokers, deckType) {
   deck = createDeck();
   console.log(deck);
}
initializeGame();

 import {createDeck} from "./Deck/mainDeck.mjs";
 import {createPlayer} from "./Player/mainPlayer.mjs"
 let deck = [];

function initializeGame(hasJokers, deckType) {
   deck = createDeck();
   let player1 = createPlayer("Xavi","red",1);
   let player2 = createPlayer("Irene","blue",2); 
   console.log(deck);
   console.log(player1);
   console.log(player2);
}
initializeGame();

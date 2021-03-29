const PokerSuits = ["Clubs", "Diamonds", "Hearts", "Spades"];
// const SpanishSuits = ["Oros", "Copas", "Espadas", "Bastos"];
import Card from "./card.js";
import Suit from "./suit.js";
import Deck from "./deck.js";

const createCard = (suit, value, isJoker) => {
  let card = new Card(suit, value, isJoker);
  card.showValue();
  return card;
};

const createSuitCards = (suit) => {
  let suitCards = [];
  for (let i = 1; i <= 14; i++) {
    suitCards.push(createCard(suit, i, false));
  }
  return new Suit(suitCards);
};

export const createDeck = () => {
  let deckSuits = [];
  for (let i = 0; i < PokerSuits.length; i++) {
    deckSuits.push(createSuitCards(PokerSuits[i]));
  }
  let deck = new Deck(deckSuits);
  console.log(deck);
};

export const createDeckBySuits = () => {
    let deckSuits = [];
    for (let i = 0; i < PokerSuits.length; i++) {
      deckSuits.push(createSuitCards(PokerSuits[i]));
    }
    let deck = new Deck(deckSuits);
    console.log(deck);
  }; 


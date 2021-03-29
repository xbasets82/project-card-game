const PokerSuits = ["Clubs", "Diamonds", "Hearts", "Spades"];
// const SpanishSuits = ["Oros", "Copas", "Espadas", "Bastos"];

import Card from "./card.js";
import Deck from "./deck.js";

let cardValues = new Map();

const createCard = (suit, value, isJoker) =>
  new Card(suit, value, isJoker, cardValues.get(value));

const createCards = (suit) => {
  let suitCards = [];
  for (let i = 1; i <= 13; i++) {
    suitCards.push(createCard(suit, i, false));
  }
  return suitCards;
};

export const createDeck = () => {
  fillCardValuesMap();
  let deckCards = [];
  for (let i = 0; i < PokerSuits.length; i++) {
    deckCards.push(...createCards(PokerSuits[i]));
  }
  let deck = new Deck(deckCards);
};

const fillCardValuesMap = () => {
  cardValues.set(1, "Ace");
  cardValues.set(2, "2");
  cardValues.set(3, "3");
  cardValues.set(4, "4");
  cardValues.set(5, "5");
  cardValues.set(6, "6");
  cardValues.set(7, "7");
  cardValues.set(8, "8");
  cardValues.set(9, "9");
  cardValues.set(10, "10");
  cardValues.set(11, "Jack");
  cardValues.set(12, "Queen");
  cardValues.set(13, "King");
};

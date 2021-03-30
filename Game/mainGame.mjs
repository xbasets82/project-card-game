import Game from "./game.js";
import Rules from "./rules.js";

export const giveInitialCards=(game, rules) => game.giveInitialCards(rules.initialNumberCards);

export const getGameRules = (game) => new Rules(2);

export const getGame = (deck)=> new Game(deck);
//cal fer obtenció de les rules d'algun fitxer

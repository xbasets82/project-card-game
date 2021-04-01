import Game from "./game.js";
import Rules from "./rules.js";

export const askForOptions=()=> {
    return "Elegir opcion : Carta = C, Plantarse = P";
}

export const giveInitialCards=(game) => game.giveInitialCards();

export const giveCrupierInitialCards=(game) => game.giveCrupierInitialCards(); 

export const giveCard= (isVisible)=> "";

export const removeCard=()=>"";

export const getGameRules = (game) => new Rules(2,1);

export const getGame = (deck)=> new Game(deck);
//cal fer obtenció de les rules d'algun fitxer


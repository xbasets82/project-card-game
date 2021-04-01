import Game from "./game.js";
import Rules from "./rules.js";
const actions = [{action:"C",function:(game)=>game.giveCard(true)},{action:"P",function:(game)=>game.pass()}]

export const excuteAction=(action,game)=>{
  let actionToExecute = actions.find((Element) => Element.action === action);
  return actionToExecute.function(game);
}

export const askForOptions=()=> console.log("Elegir opcion : Carta = C, Plantarse = P");    

export const giveInitialCards=(game) => game.giveInitialCards();

export const giveCrupierInitialCards=(game) => game.giveCrupierInitialCards(); 

export const giveCard= (game,isVisible)=> game.giveCard(isVisible);

export const removeCard=()=>"";

export const getGameRules = (game) => new Rules(2,1);

export const getGame = (deck)=> new Game(deck);
//cal fer obtenció de les rules d'algun fitxer


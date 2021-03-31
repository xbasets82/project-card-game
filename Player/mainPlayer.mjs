import Player from "./player.js";
import Hand from "./hand.js";

export const createPlayer = (name, color, order) => {
  let player = new Player(name, order, color);
  player.identify();
  return player;
};

export const updateHand = (cards) =>{
  let hand = new Hand(cards);
  return hand;
}
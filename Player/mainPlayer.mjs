import Player from "./player.js";

export const createPlayer = (name, color, order) => {
  let player = new Player(name, order, color);
  player.identify();
  return player;
};

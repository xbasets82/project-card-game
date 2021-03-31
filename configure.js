import * as fs from 'fs';

export const getPlayers = (num) => {
  let content = JSON.parse(fs.readFileSync("./testFiles/players.json"));
  console.log(content);
  return content.players.slice(0,num);
};


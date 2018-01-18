//note - use Firebase for auth - just key/value pairs - save as bonus feature
const changeBackgroundImage = require('./background');
const Game = require('./lib/game');
const gameLoop = require('./lib/game_loop');

window.addEventListener("load", () => {
  const canvas = document.getElementById('game-canvas');
  canvas.width = 800;
  canvas.height = 500;

  const ctx = canvas.getContext('2d');
  ctx.fillStyle = "black";
  ctx.rect(0, 0, 800, 500);
  ctx.fill();

  let bgNum = 1;

  setTimeout(setInterval( () => {
    let nextNum = changeBackgroundImage(bgNum);
    bgNum = nextNum;
  }, 10000), 10000);


  let game = new Game(ctx, 8);

  window.setInterval(() => {
    gameLoop(ctx, game);
  }, 20);

});
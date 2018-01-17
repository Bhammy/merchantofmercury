//note - use Firebase for auth - just key/value pairs - save as bonus feature
const changeBackgroundImage = require('./background.js');

document.addEventListener("DOMContentLoaded", () => {
  const canvas = $('#game-canvas')[0];
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
  }, 15000), 15000);

  

});

//note - use Firebase for auth - just key/value pairs - save as bonus feature
const changeBackgroundImage = require('./background.js');

document.addEventListener("DOMContentLoaded", () => {
  const canvas = $('#game-canvas')[0];
  canvas.width = 800;
  canvas.height = 500;

  const ctx = canvas.getContext('2d');

  let bgNum = 1;

  setTimeout(setInterval( () => {
    let nextNum = changeBackgroundImage(bgNum);
    bgNum = nextNum;
  }, 10000), 10000);

  

});

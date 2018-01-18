//note - use Firebase for auth - just key/value pairs - save as bonus feature
const changeBackgroundImage = require('./background');
const Ship = require('./lib/ship');
const Asteroid = require('./lib/asteroid');
const objUtil = require('./lib/util');

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

  let ship = new Ship([40, 218], [0, 0]);
  ship.draw(ctx, ship.shipGraphic, ship.state);

  let ast1 = new Asteroid(objUtil.randomAsteroidStartPos(), objUtil.randomAsteroidStartVel());
  let ast2 = new Asteroid(objUtil.randomAsteroidStartPos(), objUtil.randomAsteroidStartVel());
  let ast3 = new Asteroid(objUtil.randomAsteroidStartPos(), objUtil.randomAsteroidStartVel());
  ast1.drawAndRotate(ctx, ast1.graphic, ast1.state);
  ast2.drawAndRotate(ctx, ast2.graphic, ast2.state);
  ast3.drawAndRotate(ctx, ast3.graphic, ast3.state);

});

const Ship = require('./ship');
const Asteroid = require('./asteroid');
const objUtil = require('./util');

const gameLoop = (ctx, game) => {
  console.log('drawing!');
  ctx.clearRect(0, 0, 800, 500);
  ctx.fill();
  game.objects.forEach( (obj) => {
    if (obj instanceof Asteroid) {
      obj.move(ctx);
    } else if (obj instanceof Ship) {
      obj.move(ctx, obj.shipGraphic, obj.state);
    }
  });
};

module.exports = gameLoop;

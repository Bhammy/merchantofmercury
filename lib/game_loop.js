const Ship = require('./ship');
const Asteroid = require('./asteroid');
const ShipBullet = require('./ship_bullet');
const objUtil = require('./util');

const gameLoop = (ctx, game) => {

  ctx.clearRect(0, 0, 800, 500);
  ctx.fill();

  game.objects.forEach( (obj) => {
    if (obj instanceof Asteroid) {
      obj.move(ctx);
    } else if (obj instanceof Ship) {
      obj.move(ctx, obj.shipGraphic, obj.state);
      obj.state = obj.checkBounds(obj.state);
      obj.draw(ctx, obj.shipGraphic, obj.state);
      game.objects.forEach( (checkObj) => {
        if (checkObj instanceof Asteroid) {
          obj.checkForCollision(checkObj);
        }
      });
    } else if (obj instanceof ShipBullet) {
      obj.move(ctx, obj.graphic, obj.state);
      if (obj.checkOutOfBounds(obj.state.pos)) {
        game.removeObject(obj);
      } else {
        game.objects.forEach( (otherObj) => {
          if (otherObj instanceof Asteroid) {
            if (obj.bulletHit(otherObj)) {
              game.removeObject(obj);
              game.removeObject(otherObj);
              game.currentAsteroids -= 1;
            }
          } else {
            obj.draw(ctx, obj.graphic, obj.state);
          }
        });
      }
    }
  });

  gameTick(ctx, game);

};

const gameTick = (ctx, game) => {
  //reserve this for events that happen over more than one frame
  if (game.currentAsteroids < game.numAsteroids) {
    game.objects.push(new Asteroid(objUtil.randomAsteroidStartPos(), objUtil.randomAsteroidStartVel()));
    game.currentAsteroids += 1;
  }
};

module.exports = gameLoop;

const Ship = require('./ship');
const Asteroid = require('./asteroid');
const Bullet = require('./bullet');
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
    } else if (obj instanceof Bullet) {
      obj.move(ctx, obj.graphic, obj.state);
      if (obj.checkOutOfBounds(obj.state.pos)) {
        game.removeObject(obj);
      } else {
        obj.draw(ctx, obj.graphic, obj.state);
      }
      console.log(game.objects.length);
    }
  });

  gameTick(ctx, game);

};

const gameTick = (ctx, game) => {
  //reserve this for events that happen over more than one frame
};

module.exports = gameLoop;

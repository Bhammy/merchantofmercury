const Ship = require('./ship');
const Asteroid = require('./asteroid');
const ShipBullet = require('./ship_bullet');
const Explosion = require('./explosion');
const objUtil = require('./util');

const gameLoop = (ctx, game) => {

  ctx.clearRect(0, 0, 800, 500);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 800, 500);

  game.stars.forEach( (star) => {
    star.state.pos = star.boundaryWrap(star.state.pos);
    star.move(ctx, null, star.state);
    star.draw(ctx);
  });
  
  game.objects.forEach( (obj) => {
    if (obj instanceof Asteroid) {
      obj.move(ctx);
    } else if (obj instanceof Ship) {
      obj.move(ctx, obj.shipGraphic, obj.state);
      obj.state = obj.checkOutOfBounds(obj.state);
      obj.draw(ctx, obj.shipGraphic, obj.state);
      game.objects.forEach( (checkObj) => {
        if (checkObj instanceof Asteroid) {
          if (obj.checkForCollision(checkObj)) {
            obj.shipWasHit(checkObj);
            checkObj.state.scoreValue = 0;
            if (obj.state.health === 0) {
              game.gameOver = true;
            }
          }
        }
      });
    } else if (obj instanceof ShipBullet) {
      obj.move(ctx, obj.graphic, obj.state);
      if (obj.checkOutOfBounds(obj.state.pos)) {
        game.removeObject(obj);
      } else {
        game.objects.forEach( (otherObject) => {
          if (otherObject instanceof Asteroid) {
            obj.handleBullet(otherObject);
          }
            obj.draw(ctx, obj.graphic, obj.state);
        });
      }
    } else if (obj instanceof Explosion) {
      obj.draw(ctx);
    }
    if (obj.state.isDestructable && (obj.state.health < 1)) {
      game.removeObject(obj);
      if (obj instanceof Asteroid) {
        game.score += obj.state.scoreValue;
        game.currentAsteroids -= 1;
        game.numAsteroids += 0.1;
        $('.score').text(game.score);
      }
    }

  });

  gameTick(ctx, game);

};

const gameTick = (ctx, game) => {
  //reserve this for events that happen over more than one frame
  if (game.gameOver) {
    $(".game-over").removeClass("hidden");
  } else {
    if (game.currentAsteroids < game.numAsteroids) {
      game.objects.push(new Asteroid(objUtil.randomAsteroidStartPos(), objUtil.randomAsteroidStartVel()));
      game.currentAsteroids += 1;
    }
    game.tick += 1;
    if (game.tick % 10 === 0) {
      game.score += 1;
      $('.score').text(game.score);
    }
  }
};

module.exports = gameLoop;

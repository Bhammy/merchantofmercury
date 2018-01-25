const Ship = require('./ship');
const Asteroid = require('./asteroid');
const Pirate = require('./pirate');
const ShipBullet = require('./ship_bullet');
const PirateMissile = require('./pirate_missile');
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

    } else if (obj instanceof Pirate) {
      obj.move(ctx, obj.graphic, obj.state);

    } else if (obj instanceof Ship) {
      obj.move(ctx, obj.shipGraphic, obj.state);
      obj.state = obj.checkOutOfBounds(obj.state);
      obj.draw(ctx, obj.shipGraphic, obj.state);
      game.objects.forEach( (checkObj) => {
        if ((checkObj instanceof Asteroid) || (checkObj instanceof PirateMissile)) {
          if (obj.checkForCollision(checkObj)) {
            obj.shipWasHit(checkObj);
            checkObj.state.scoreValue = 0;
            if (obj.state.health === 0) {
              game.gameOver = true;
            }
          }
        }
      });

    } else if ((obj instanceof ShipBullet) || (obj instanceof PirateMissile)) {
      obj.move(ctx, obj.graphic, obj.state);
      if (obj.checkOutOfBounds(obj.state.pos)) {
        game.removeObject(obj);
      } else {
        if (obj instanceof ShipBullet) {
          game.objects.forEach( (otherObject) => {
            if ((otherObject instanceof Asteroid) || (otherObject instanceof Pirate)) {
              obj.handleBullet(otherObject);
            }
            obj.draw(ctx, obj.graphic, obj.state);
          });
        } else {
          obj.draw(ctx, obj.graphic, obj.state);
        }
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
    if (parseInt($(".form-score").text()) > parseInt($(".high-scores-list li:last-child span").text())) {
      $(".submit-score").removeClass("hidden");
    }
  } else {
    if (game.currentAsteroids < game.numAsteroids) {
      game.objects.push(new Asteroid(objUtil.randomStartPos(), objUtil.randomStartVel()));
      game.currentAsteroids += 1;
    }
    game.tick += 1;
    if (game.tick % 10 === 0) {
      game.score += 1;
      $('.score').text(game.score);
    }
    if (game.tick % 200 === 0) {
      game.objects.push(new Pirate(objUtil.randomStartPos(), objUtil.randomPirateVel(), game.addObject));
    }
  }
};

module.exports = gameLoop;

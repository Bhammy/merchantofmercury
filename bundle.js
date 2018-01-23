/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const objUtil = __webpack_require__(1);
const Explosion = __webpack_require__(2);

module.exports = class MovingObject {
  constructor(options) {
    this.initPos = options.pos;
    this.initVel = options.vel;
  }

  move(ctx, graphic, state) {
    state.pos[0] = state.pos[0] + state.vel[0];
    state.pos[1] = state.pos[1] + state.vel[1];
  }

  draw(ctx, graphic, state) {
    ctx.drawImage(
      graphic,
      state.sx,
      state.sy,
      state.sWidth,
      state.sHeight,
      state.pos[0],
      state.pos[1],
      state.dWidth,
      state.dHeight
    );
  }

  checkOutOfBounds(pos) {
    if (pos[0] < -50) {
      return true;
    }
    if (pos[0] > 800) {
      return true;
    }
    if (pos[1] < -50) {
      return true;
    }
    if (pos[1] > 550) {
      return true;
    }
    return false;
  }

  boundaryWrap(pos) {
    let returnPos = pos;
    if (pos[0] < -50) {
      returnPos[0] = pos[0] + 860;
    }
    if (pos[1] < -50) {
      returnPos[1] = pos[1] +  560;
    }
    if (pos[1] > 550) {
      returnPos[1] = pos[1] - 580;
      returnPos[0] = pos[0] - 30;
    }
    return returnPos;
  }

  checkForCollision(otherObject) {
    let thisObjectCenter = [this.state.pos[0] + this.state.dWidth / 2, this.state.pos[1] + this.state.dHeight / 2];
    let otherObjectCenter = [otherObject.state.pos[0] + otherObject.state.dWidth / 2, otherObject.state.pos[1] + otherObject.state.dHeight / 2];
    let centerDistances = objUtil.dist(thisObjectCenter, otherObjectCenter);
    // debugger
    return (centerDistances < (this.state.radius + otherObject.state.radius));
  }

  handleBullet(otherObject) {
    if (this.checkForCollision(otherObject)) {
      if (otherObject.state.isDestructable) {
        otherObject.state.health -= 1;
        this.state.health -= 1;
        this.addObject( new Explosion(this.state.pos, otherObject.state.health));
      }
      return true;
    }
    return false;
  }

};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

const objUtil = {

    randomStartPos: () => {
      // returns startPos off right, w/in canvas bounds
      return [810, (Math.random() * (460) + 20)];
    },

    randomStartVel: () => {
      // returns randomVel, headed leftish
      return [-(Math.random() * 5), (Math.random() * [-1, 1][Math.round(Math.random())]) ];
    },

    randomPirateVel: () => {
      return [-(Math.random() * 1), (Math.random() * [-1, 1][Math.round(Math.random() * 3)]) ];
    },

    dist: (pos1, pos2) => {
      return Math.sqrt( Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2));
    },

    randSmall: () => {
      return (Math.round(Math.random() * 3) * ([-1, 1][Math.round(Math.random())]));
    }
};

module.exports = objUtil;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

const EXPLOSION_TYPES = {
  0: {
    outline: '#ff5000',
    blur: 'orange',
  },

  1: {
    outline: 'red',
    blur: 'yellow',
  },

  2: {
    outline: 'green',
    blur: '#0af4fc',
  }

};

module.exports = class Explosion {
  constructor(pos, health, type) {
    this.state = {
      pos: pos,
      isDestructable: true,
      explosionSize: 3 - health,
      explosionType: (type || Math.round(Math.random() * 1)),
      globalAlpha: 0.9,
    };
    this.state.health = 30 - (this.state.explosionSize * 10);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.state.pos[0],
      this.state.pos[1],
      Math.abs((this.state.explosionSize)),
      0,
      2 * Math.PI,
      false
    );
    ctx.lineWidth = 3;
    ctx.strokeStyle = EXPLOSION_TYPES[this.state.explosionType].outline;
    ctx.shadowColor = EXPLOSION_TYPES[this.state.explosionType].blur;
    ctx.shadowBlur = 20;
    ctx.globalAlpha = this.state.globalAlpha;
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
    this.state.explosionSize -= 1;
    this.state.globalAlpha -= 0.02;
    this.state.health -= 1;
  }
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(0);
const ShipBullet = __webpack_require__(4);
const Explosion = __webpack_require__(2);
const objUtil = __webpack_require__(1);

const SHIP_DIRECTIONS = {
  "up": [0, -5],
  "down": [0, 5],
  "left": [-5, 0],
  "right": [5, 0],
  "w": [0, -5],
  "s": [0, 5],
  "a": [-5, 0],
  "d": [5, 0],
};

const SHIP_SPRITES = {
  "0,0": {
    sx: 220,
    sy: 32,
    sWidth: 40,
    sHeight: 46,
    dWidth: 40,
    dHeight: 46,
    radius: 23,
  },
  "0,-5": {
    sx: 220,
    sy: 0,
    sWidth: 40,
    sHeight: 38,
    dWidth: 40,
    dHeight: 38,
    radius: 20,
  },
  "5,-5": {
    sx: 260,
    sy: 0,
    sWidth: 46,
    sHeight: 38,
    dWidth: 46,
    dHeight: 38,
    radius: 23,
  },
  "-5,-5": {
    sx: 310,
    sy: 0,
    sWidth: 40,
    sHeight: 38,
    dWidth: 40,
    dHeight: 38,
    radius: 20,
  },
  "0,5": {
    sx: 220,
    sy: 78,
    sWidth: 40,
    sHeight: 38,
    dWidth: 40,
    dHeight: 38,
    radius: 20,
  },
  "-5,5": {
    sx: 310,
    sy: 78,
    sWidth: 40,
    sHeight: 38,
    dWidth: 40,
    dHeight: 38,
    radius: 20,
  },
  "5,5": {
    sx: 260,
    sy: 78,
    sWidth: 46,
    sHeight: 38,
    dWidth: 46,
    dHeight: 38,
    radius: 23,
  },
  "-5,0": {
    sx: 310,
    sy: 32,
    sWidth: 40,
    sHeight: 46,
    dWidth: 40,
    dHeight: 46,
    radius: 23,
  },
  "5,0": {
    sx: 260,
    sy: 32,
    sWidth: 50,
    sHeight: 46,
    dWidth: 50,
    dHeight: 46,
    radius: 25,
  },
};

module.exports = class Ship extends MovingObject {

  constructor(pos, vel, addObject, removeObject) {
    super({
      pos: pos,
      vel: vel,
      graphic: $("#sprites1")[0],
    });
    this.addObject = addObject;
    this.shipGraphic = $("#sprites1")[0];
    this.state = {
      sx: 220,
      sy: 32,
      sWidth: 40,
      sHeight: 46,
      pos: pos,
      vel: vel,
      dWidth: 40,
      dHeight: 46,
      radius: 23,
      isDestructable: true,
      health: 5,
      firing: false,
    };
    this.bindKeyHandlers();
    this.fireLaser();
  }

  bindKeyHandlers() {
    Object.keys(SHIP_DIRECTIONS).forEach( (dir) => {
      $(document).unbind(dir);
      let move = SHIP_DIRECTIONS[dir];
      key(dir, (e) => {
        e.preventDefault();
        this.state.vel[0] += move[0];
        this.state.vel[1] += move[1];
        this.state.vel = this.state.vel.map( (vel) => {
          if (vel < -5) {
            return -5;
          } else if (vel > 5) {
            return 5;
          } else {
            return vel;
          }
        });
        let newSprite = SHIP_SPRITES[`${this.state.vel}`];
        Object.keys(newSprite).forEach( (spriteVal) => {
          this.state[spriteVal] = newSprite[spriteVal];
        });
      });
    });

    $(document).keydown( (e) => {
      if (e.originalEvent.code === "Space") {
        e.preventDefault();
        this.state.firing = true;
      }
    });

    $(document).keyup( (e) => {
      if (e.originalEvent.code === "Space") {
        e.preventDefault();
        this.state.firing = false;
      }
    });

  }

  fireLaser() {
    setInterval( () => {
      if (this.state.health > 0 && this.state.firing) {
        let bulletPos = [this.state.pos[0] + 28, this.state.pos[1] + 24];
        let bullet = new ShipBullet(bulletPos, this.addObject);
        this.addObject(bullet);
      }
    }, 150);
  }

  checkOutOfBounds(state) {
    if ((state.pos[0] <= 10) || (state.pos[0] >= 750)) {
      if (state.pos[0] <= 10) {
        state.pos[0] = 10;
        state.vel[0] = 0;
      } else {
        state.pos[0] = 750;
        state.vel[0] = 0;
      }
    }
    if ((state.pos[1] <= 10) || (state.pos[1] >= 440)) {
      if (state.pos[1] <= 10) {
        state.pos[1] = 10;
        state.vel[1] = 0;
      } else {
        state.pos[1] = 440;
        state.vel[1] = 0;
      }
    }
    return state;
  }

  shipWasHit(otherObject) {
    let pos = [this.state.pos[0] + objUtil.randSmall() + 15, this.state.pos[1] + objUtil.randSmall() + 15];
    this.addObject(new Explosion(pos, this.state.health, 2));
    this.state.health -= 1;
    otherObject.state.health = 0;
    $(".health").text(this.state.health);
  }

};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(0);
const Explosion = __webpack_require__(2);

module.exports = class ShipBullet extends MovingObject {
  constructor(pos, addObject) {
    super({
      pos: pos,
      vel: [12, 0],
    });
    this.addObject = addObject;
    this.graphic = $("#sprites1")[0];
    this.state = {
      sx: 200,
      sy: 8,
      sWidth: 14,
      sHeight: 4,
      pos: pos,
      vel: [12, 0],
      dWidth: 14,
      dHeight: 4,
      radius: 2,
      health: 1,
      isDestructable: true,
    };
  }

};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject  = __webpack_require__(0);

const ASTEROID_DEFAULTS = {
  sx: [0, 46, 0, 46, 7, 53, 10, 67],
  sy: [0, 0, 0, 0, 62, 62, 92, 104],
  sWidth: [46, 60, 46, 60, 26, 33, 23, 13],
  sHeight: [53, 56, 53, 56, 18, 31, 23, 13],
  dWidth: [46, 60, 46, 60, 26, 33, 23, 13],
  dHeight: [53, 56, 53, 56, 18, 31, 23, 13],
  health: [3, 3, 3, 3, 2, 2, 1, 1],
};

module.exports = class Asteroid extends MovingObject {

  constructor(pos, vel) {
    super({
      pos: pos,
      vel: vel,
    });
    this.pos = pos;
    this.vel = vel;
    this.graphic = $("#sprites1")[0];
    let randAsteroidNum = Math.round(Math.random() * 7);
    this.state = {
      sx: ASTEROID_DEFAULTS.sx[randAsteroidNum],
      sy: ASTEROID_DEFAULTS.sy[randAsteroidNum],
      sWidth: ASTEROID_DEFAULTS.sWidth[randAsteroidNum],
      sHeight: ASTEROID_DEFAULTS.sHeight[randAsteroidNum],
      pos: this.pos,
      vel: this.vel,
      dWidth: ASTEROID_DEFAULTS.dWidth[randAsteroidNum],
      dHeight: ASTEROID_DEFAULTS.dHeight[randAsteroidNum],
      rotation: (Math.random() * [-1, 1][Math.round(Math.random())]),
      rotateDir: (0.01 * [-1, 1][Math.round(Math.random())]),
      isDestructable: true,
      health: ASTEROID_DEFAULTS.health[randAsteroidNum],
      scoreValue: 10 * ASTEROID_DEFAULTS.health[randAsteroidNum],
    };
    if (this.state.dWidth > this.state.dHeight) {
      this.state.radius = this.state.dWidth / 2;
    } else {
      this.state.radius = this.state.dHeight / 2;
    }
  }

  move(ctx) {
    this.state.pos[0] = this.state.pos[0] + this.state.vel[0];
    this.state.pos[1] = this.state.pos[1] + this.state.vel[1];
    this.drawAndRotate(ctx, this.graphic, this.state);
    this.state.pos = this.boundaryWrap(this.state.pos);
  }

  drawAndRotate(ctx) {
    ctx.save();
    ctx.translate(this.state.pos[0], this.state.pos[1]);
    ctx.translate(this.state.dWidth / 2, this.state.dHeight / 2);
    ctx.rotate(this.state.rotation);
    this.state.rotation += this.state.rotateDir;
    ctx.drawImage(
      this.graphic,
      this.state.sx,
      this.state.sy,
      this.state.sWidth,
      this.state.sHeight,
      -this.state.dWidth / 2,
      -this.state.dHeight / 2,
      this.state.dWidth,
      this.state.dHeight
    );
    ctx.restore();
  }


};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(0);
const Explosion = __webpack_require__(2);

module.exports = class PirateMissile extends MovingObject {
  constructor(pos) {
    super({
      pos: pos,
      vel: [-2, 0],
    });
    this.graphic = $("#sprites3")[0];
    this.state = {
      sx: 0,
      sy: 0,
      sWidth: 14,
      sHeight: 4,
      pos: pos,
      vel: [-2, 0],
      dWidth: 14,
      dHeight: 4,
      radius: 3,
      health: 1,
      isDestructable: true,
    };
  }

  move(ctx, graphic, state) {
    state.vel = [state.vel[0] + (state.vel[0]/100), 0];
    state.pos[0] = state.pos[0] + state.vel[0];
    state.pos[1] = state.pos[1] + state.vel[1];
  }

};


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

//note - use Firebase for auth - just key/value pairs - save as bonus feature
const changeBackgroundImage = __webpack_require__(8);
const Game = __webpack_require__(9);
const gameLoop = __webpack_require__(11);

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

  $("#audio-toggle").click( () => {
    let audio = $("audio")[0];
    if (audio.paused) {
      audio.play();
      $("#audio-logo").attr("src", "./assets/speaker.png");
    } else {
      audio.pause();
      $("#audio-logo").attr("src", "./assets/mute.png");
    }
  });

  let game = new Game(ctx, 20);

  window.setInterval(() => {
    gameLoop(ctx, game);
  }, 25);

});


/***/ }),
/* 8 */
/***/ (function(module, exports) {

const changeBackgroundImage = (num) => {
  let nextNum = num + 1;
  if (nextNum > 7) {
    nextNum = 1;
  }
  $("body").removeClass(`bgimage-${num}`).addClass(`bgimage-${nextNum}`);
  return nextNum;
};

module.exports = changeBackgroundImage;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

const Ship = __webpack_require__(3);
const Asteroid = __webpack_require__(5);
const Star = __webpack_require__(10);
const objUtil = __webpack_require__(1);

module.exports = class Game {

  constructor(ctx, numAsteroids) {
    //save room for numPirates
    this.addObject = this.addObject.bind(this);
    this.origNumAsteroids = numAsteroids;
    this.numAsteroids = numAsteroids;
    this.currentAsteroids = 0;
    this.ctx = ctx;
    this.gameOver = false;
    this.score = 0;
    this.tick = 0;
    this.objects = [
      new Ship([40, 218], [0, 0], this.addObject),
    ];
    for (var i = 1; i <= numAsteroids; i++) {
      this.objects.push( new Asteroid(objUtil.randomStartPos(), objUtil.randomStartVel()) );
      this.currentAsteroids += 1;
    }
    this.stars = [];
    for (var j = 0; j < 100; j++) {
      this.stars.push(new Star());
    }
    key("r", () => {
      if (!this.objects.some( (obj) => obj instanceof Ship)) {
        this.objects.forEach( (obj) => {
          obj.state.health = 0;
          obj.state.scoreValue = 0;
        });
        this.score = 0;
        let ship = new Ship([40, 218], [0, 0], this.addObject);
        this.objects.push(ship);
        this.gameOver = false;
        this.numAsteroids = this.origNumAsteroids;
        $(".score").text("0");
        $(".health").text("5");
        $(".game-over").addClass("hidden");
      }
    });
  }

  addObject(object) {
    this.objects.push(object);
  }

  removeObject(object) {
    this.objects.splice(this.objects.indexOf(object), 1);
  }




};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

const objUtil = __webpack_require__(1);
const MovingObject = __webpack_require__(0);

const STAR_COLORS = ["red", "yellow", "orange", "green", "blue", "white"];

module.exports = class Star extends MovingObject {

  constructor() {
    let pos = [Math.floor(Math.random() * 800), Math.floor(Math.random() * 500)];
    let vel = [-Math.random(), 0];
    super(pos, vel);
    this.state = {
      color: STAR_COLORS[Math.round(Math.random() * 6)],
      pos: pos,
      vel: vel,
      size: Math.random(),
    };
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.state.pos[0],
      this.state.pos[1],
      this.state.size,
      0,
      2 * Math.PI,
      false
    );
    ctx.fillStyle = this.state.color;
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = this.state.color;
    ctx.stroke();
  }

};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

const Ship = __webpack_require__(3);
const Asteroid = __webpack_require__(5);
const Pirate = __webpack_require__(12);
const ShipBullet = __webpack_require__(4);
const PirateMissile = __webpack_require__(6);
const Explosion = __webpack_require__(2);
const objUtil = __webpack_require__(1);

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


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(0);
const PirateMissile = __webpack_require__(6);
const objUtil = __webpack_require__(1);

module.exports = class Pirate extends MovingObject {
  constructor(pos, vel, addObject) {
    super({ pos: pos, vel: [vel[1], vel[0]]});
    this.graphic = $("#sprites2")[0];
    this.addObject = addObject;
    this.state = {
        sx: 0,
        sy: 0,
        sWidth: 64,
        sHeight: 64,
        pos: pos,
        vel: vel,
        dWidth: 64,
        dHeight: 64,
        radius: 30,
        isDestructable: true,
        health: 5,
        timeToMissile: 40,
        scoreValue: 100,
    };
    this.state.cooldown = this.state.timeToMissle;
  }

  move(ctx) {
    this.state.pos[0] = this.state.pos[0] + this.state.vel[0];
    this.state.pos[1] = this.state.pos[1] + this.state.vel[1];
    this.draw(ctx, this.graphic, this.state);
    this.state.timeToMissile -= 1;
    if (this.state.timeToMissile === 0) {
      this.fireMissile([this.state.pos[0] + this.state.dWidth / 2, this.state.pos[1] + this.state.dHeight / 2]);
    }
    this.state.pos = this.boundaryWrap(this.state.pos);
  }

  fireMissile(pos) {
    let missile = new PirateMissile(pos);
    this.state.timeToMissile = 20;
    this.addObject(missile);
  }

};


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
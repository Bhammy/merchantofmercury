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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

//note - use Firebase for auth - just key/value pairs - save as bonus feature
const changeBackgroundImage = __webpack_require__(1);
const Ship = __webpack_require__(2);
const Asteroid = __webpack_require__(4);
const objUtil = __webpack_require__(5);

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


/***/ }),
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(3);

module.exports = class Ship extends MovingObject {
  constructor(pos, vel) {
    super({
      pos: pos,
      vel: vel,
    });
    this.pos = pos;
    this.vel = vel;
    this.shipGraphic = $("#sprites1")[0];
    this.state = {
      sx: 220,
      sy: 32,
      sWidth: 40,
      sHeight: 46,
      pos: this.pos,
      dWidth: 40,
      dHeight: 46,
    };
  }

};


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = class MovingObject {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.graphic = options.graphic;
  }

  move() {
    this.pos[0] = this.pos[0] + this.vel[0];
    this.pos[1] = this.pos[1] + this.vel[1];
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

  drawAndRotate(ctx, graphic, state) {
    ctx.save();
    ctx.translate(state.pos[0], state.pos[1]);
    ctx.translate(state.dWidth / 2, state.dHeight / 2);
    ctx.rotate(state.rotation);
    ctx.drawImage(
      graphic,
      state.sx,
      state.sy,
      state.sWidth,
      state.sHeight,
      -state.dWidth / 2,
      -state.dHeight / 2,
      state.dWidth,
      state.dHeight
    );
    ctx.restore();
  }

};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject  = __webpack_require__(3);

const ASTEROID_DEFAULTS = {
  sx: [0, 46],
  sy: [0, 0],
  sWidth: [46, 60],
  sHeight: [53, 56],
  dWidth: [46, 60],
  dHeight: [53, 56],
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
    let randAsteroidNum = Math.round(Math.random());
    this.state = {
      sx: ASTEROID_DEFAULTS.sx[randAsteroidNum],
      sy: ASTEROID_DEFAULTS.sy[randAsteroidNum],
      sWidth: ASTEROID_DEFAULTS.sWidth[randAsteroidNum],
      sHeight: ASTEROID_DEFAULTS.sHeight[randAsteroidNum],
      pos: this.pos,
      dWidth: ASTEROID_DEFAULTS.dWidth[randAsteroidNum],
      dHeight: ASTEROID_DEFAULTS.dHeight[randAsteroidNum],
      rotation: Math.floor(Math.random() * 360) * Math.PI / 180,
    };
  }

};


/***/ }),
/* 5 */
/***/ (function(module, exports) {

const objUtil = {

    randomAsteroidStartPos: () => {
      // returns startPos off right, w/in canvas bounds
      return [710, (Math.random() * (460) + 20)];
    },

    randomAsteroidStartVel: () => {
      // returns randomVel, headed straight left
      return [-3, 0];
    }
};

module.exports = objUtil;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
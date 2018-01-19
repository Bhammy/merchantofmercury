const MovingObject = require('./moving_object');

const SHIP_DIRECTIONS = {
  "up": [0, -5],
  "down": [0, 5],
  "left": [-5, 0],
  "right": [5, 0],
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

  constructor(pos, vel) {
    super({
      pos: pos,
      vel: vel,
      graphic: $("#sprites1")[0],
    });
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
    };
    this.bindKeyHandlers();
  }

  bindKeyHandlers() {
    Object.keys(SHIP_DIRECTIONS).forEach( (dir) => {
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
        console.log(this.state.vel);
      });
    });
    key("space", (e) => {
      //create bullet
    });
  }

  checkBounds(state) {
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

};

const MovingObject  = require('./moving_object');

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

  boundaryWrap(pos) {
    let returnPos = pos;
    if (pos[0] < -50) {
      returnPos[0] = pos[0] + 860;
    }
    if (pos[1] < -50) {
      returnPos[1] = pos[1] +  560;
    }
    if (pos[1] > 550) {
      returnPos[1] = pos[1] - 560;
      returnPos[0] = pos[0] - 30;
    }
    return returnPos;
  }


};

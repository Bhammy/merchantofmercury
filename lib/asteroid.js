const MovingObject  = require('./moving_object');

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
      vel: this.vel,
      dWidth: ASTEROID_DEFAULTS.dWidth[randAsteroidNum],
      dHeight: ASTEROID_DEFAULTS.dHeight[randAsteroidNum],
      rotation: (Math.random() * [-1, 1][Math.round(Math.random())]),
      rotateDir: (0.01 * [-1, 1][Math.round(Math.random())]),
    };
  }

  move(ctx) {
    this.state.pos[0] = this.state.pos[0] + this.state.vel[0];
    this.state.pos[1] = this.state.pos[1] + this.state.vel[1];
    this.drawAndRotate(ctx, this.graphic, this.state);
    this.state.pos = this.checkBounds(this.state.pos);
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

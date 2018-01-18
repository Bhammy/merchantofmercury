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

  draw(ctx) {
    ctx.drawImage(this.graphic, this.pos[0], this.pos[1]);
  }

};

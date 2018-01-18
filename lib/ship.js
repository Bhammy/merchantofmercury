const MovingObject = require('./moving_object');

module.exports = class Ship extends MovingObject {
  constructor(pos, vel) {
    super({
      pos: pos,
      vel: vel,
    });
    this.pos = pos;
    this.vel = vel;
  }

  draw(ctx) {
    ctx.drawImage(
      $("#spaceship-sprites")[0],
      220, //sx (sourcex)
      32, //s (sourcey)
      40, //sWidth (sourceWidth)
      46, //sHeight (sourceHeight)
      this.pos[0], //dest pos x
      this.pos[1], //dest pos y
      40, //dest width
      46 //dest height
    );
  }

};

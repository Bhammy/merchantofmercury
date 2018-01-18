const MovingObject = require('./moving_object');

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
      radius: 23,
    };
  }

};

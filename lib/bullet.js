const MovingObject = require('./moving_object');

module.exports = class Bullet extends MovingObject {
  constructor(pos) {
    super({
      pos: pos,
      vel: [12, 0],
    });
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
      radius: 4,
    };
  }

};

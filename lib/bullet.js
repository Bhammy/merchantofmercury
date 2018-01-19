const MovingObject = require('./moving_object');

module.exports = class Bullet extends MovingObject {
  constructor(pos) {
    super({
      pos: pos,
      vel: [12, 0],
    });
    this.graphic = $("#sprites1")[0];
    this.state = {
      pos: pos,
      vel: [12, 0],
    };
  }


};

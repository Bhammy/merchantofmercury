const MovingObject = require('./moving_object');

module.exports = class Ship extends MovingObject {
  constructor(pos, vel) {
    super({
      pos: pos,
      vel: vel,
    });
    this.ship = new Image();
    this.ship.src = 'assets/shipsprite.png';
    this.graphic = this.ship;
  }


};

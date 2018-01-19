const MovingObject = require('./moving_object');
const Explosion = require('./explosion');

module.exports = class ShipBullet extends MovingObject {
  constructor(pos, addObject) {
    super({
      pos: pos,
      vel: [12, 0],
    });
    this.addObject = addObject;
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
      radius: 2,
      health: 1,
      isDestructable: true,
    };
  }

  handleBullet(otherObject) {
    if (this.checkForCollision(otherObject)) {
      if (otherObject.state.isDestructable) {
        otherObject.state.health -= 1;
        this.state.health -= 1;
        this.addObject( new Explosion(this.state.pos, otherObject.state.health));
      }
      return true;
    }
    return false;
  }

};

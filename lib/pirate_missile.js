const MovingObject = require('./moving_object');
const Explosion = require('./explosion');

module.exports = class PirateMissile extends MovingObject {
  constructor(pos) {
    super({
      pos: pos,
      vel: [-2, 0],
    });
    this.graphic = $("#sprites1")[0];
    this.state = {
      sx: 200,
      sy: 62,
      sWidth: 14,
      sHeight: 6,
      pos: pos,
      vel: [-2, 0],
      dWidth: 14,
      dHeight: 6,
      radius: 3,
      health: 1,
      isDestructable: true,
    };
  }

  move(ctx, graphic, state) {
    state.vel = [state.vel[0] + (state.vel[0]/100), 0];
    state.pos[0] = state.pos[0] + state.vel[0];
    state.pos[1] = state.pos[1] + state.vel[1];
  }
  
};

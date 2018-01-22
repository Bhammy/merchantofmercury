const MovingObject = require('./moving_object');
const Explosion = require('./explosion');
const objUtil = require('./util');

module.exports = class Pirate extends MovingObject {
  constructor(pos, vel, addObject) {
    super({ pos: pos, vel: vel});
    this.graphic = $("#sprites2")[0];
    this.addObject = addObject;
    this.state = {
        sx: 0,
        sy: 0,
        sWidth: 64,
        sHeight: 64,
        pos: pos,
        vel: vel,
        dWidth: 64,
        dHeight: 64,
        radius: 30,
        isDestructable: true,
        health: 5,
        timeToMissle: 30,
        scoreValue: 100,
    };
    this.state.cooldown = this.state.timeToMissle;
  }

  move(ctx) {
    this.state.pos[0] = this.state.pos[0] + this.state.vel[0];
    this.state.pos[1] = this.state.pos[1] + this.state.vel[1];
    this.draw(ctx, this.graphic, this.state);
    this.state.pos = this.boundaryWrap(this.state.pos);
  }


};

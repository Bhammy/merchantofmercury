const MovingObject = require('./moving_object');
const PirateMissile = require('./pirate_missile');
const objUtil = require('./util');

module.exports = class Pirate extends MovingObject {
  constructor(pos, vel, addObject) {
    super({ pos: pos, vel: [vel[1], vel[0]]});
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
        timeToMissile: 40,
        scoreValue: 100,
    };
    this.state.cooldown = this.state.timeToMissle;
  }

  move(ctx) {
    this.state.pos[0] = this.state.pos[0] + this.state.vel[0];
    this.state.pos[1] = this.state.pos[1] + this.state.vel[1];
    this.draw(ctx, this.graphic, this.state);
    this.state.timeToMissile -= 1;
    if (this.state.timeToMissile === 0) {
      this.fireMissile([this.state.pos[0] + this.state.dWidth / 2, this.state.pos[1] + this.state.dHeight / 2]);
    }
    this.state.pos = this.boundaryWrap(this.state.pos);
  }

  fireMissile(pos) {
    let missile = new PirateMissile(pos);
    this.state.timeToMissile = 20;
    this.addObject(missile);
  }

};

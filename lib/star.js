const objUtil = require('./util');
const MovingObject = require('./moving_object');

const STAR_COLORS = ["red", "yellow", "orange", "green", "blue", "white"];

module.exports = class Star extends MovingObject {

  constructor() {
    let pos = [Math.floor(Math.random() * 800), Math.floor(Math.random() * 500)];
    let vel = [-Math.random(), 0];
    super(pos, vel);
    this.state = {
      color: STAR_COLORS[Math.round(Math.random() * 6)],
      pos: pos,
      vel: vel,
      size: Math.random(),
    };
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.state.pos[0],
      this.state.pos[1],
      this.state.size,
      0,
      2 * Math.PI,
      false
    );
    ctx.fillStyle = this.state.color;
    ctx.fill();
    ctx.lineWidth = 1;
    ctx.strokeStyle = this.state.color;
    ctx.stroke();
  }

};

const objUtil = require('./util');

module.exports = class MovingObject {
  constructor(options) {
    this.initPos = options.pos;
    this.initVel = options.vel;
  }

  move(ctx, graphic, state) {
    state.pos[0] = state.pos[0] + state.vel[0];
    state.pos[1] = state.pos[1] + state.vel[1];
  }

  draw(ctx, graphic, state) {
    ctx.drawImage(
      graphic,
      state.sx,
      state.sy,
      state.sWidth,
      state.sHeight,
      state.pos[0],
      state.pos[1],
      state.dWidth,
      state.dHeight
    );
  }

  checkOutOfBounds(pos) {
    if (pos[0] < -50) {
      return true;
    }
    if (pos[0] > 800) {
      return true;
    }
    if (pos[1] < -50) {
      return true;
    }
    if (pos[1] > 550) {
      return true;
    }
    return false;
  }

  checkForCollision(otherObject) {
    let thisObjectCenter = [this.state.pos[0] + this.state.dWidth/2, this.state.pos[1] + this.dHeight/2];
    let otherObjectCenter = [otherObject.pos[0] + otherObject.state.dWidth/2, otherObject.pos[1] + otherObject.dHeight/2];
    let centerDistances = objUtil.dist(this.state.pos, otherObject.state.pos);
    return (centerDistances < (this.state.radius + otherObject.state.radius));
  }

};

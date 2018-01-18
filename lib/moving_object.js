module.exports = class MovingObject {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.graphic = options.graphic;
  }

  move(ctx, graphic, state) {
    this.pos[0] = this.pos[0] + this.vel[0];
    this.pos[1] = this.pos[1] + this.vel[1];
    this.draw(ctx, graphic, state);
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

  checkBounds(pos) {
    let returnPos = pos;
    if (pos[0] < -50) {
      returnPos[0] = pos[0] + 860;
    }
    if (pos[1] < -50) {
      returnPos[1] = pos[1] +  560;
    }
    return returnPos;
  }

};

module.exports = class MovingObject {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.graphic = options.graphic;
  }

  move() {
    this.pos[0] = this.pos[0] + this.vel[0];
    this.pos[1] = this.pos[1] + this.vel[1];
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

  drawAndRotate(ctx, graphic, state) {
    ctx.save();
    ctx.translate(state.pos[0], state.pos[1]);
    ctx.translate(state.dWidth / 2, state.dHeight / 2);
    ctx.rotate(state.rotation);
    ctx.drawImage(
      graphic,
      state.sx,
      state.sy,
      state.sWidth,
      state.sHeight,
      -state.dWidth / 2,
      -state.dHeight / 2,
      state.dWidth,
      state.dHeight
    );
    ctx.restore();
  }

};

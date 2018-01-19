const EXPLOSION_TYPES = {
  0: {
    outline: 'red',
    blur: 'orange',
  },

  1: {
    outline: 'red',
    blur: 'yellow',
  }
};

module.exports = class Explosion {
  constructor(pos, health) {
    this.state = {
      pos: pos,
      isDestructable: true,
      explosionSize: 3 - health,
      explosionType: Math.round(Math.random() * 1),
    };
    this.state.health = 30 - (this.state.explosionSize * 10);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.state.pos[0],
      this.state.pos[1],
      Math.abs((this.state.explosionSize)),
      0,
      2 * Math.PI,
      false
    );
    ctx.lineWidth = 3;
    ctx.strokeStyle = EXPLOSION_TYPES[this.state.explosionType].outline;
    ctx.shadowColor = EXPLOSION_TYPES[this.state.explosionType].blur;
    ctx.shadowBlur = 20;
    ctx.stroke();
    ctx.shadowBlur = 0;
    this.state.explosionSize -= 1;
    this.state.health -= 1;
  }
};

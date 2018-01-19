const EXPLOSION_TYPES = {
  0: {
    outline: '#ff5000',
    blur: 'orange',
  },

  1: {
    outline: 'red',
    blur: 'yellow',
  },

  2: {
    outline: 'green',
    blur: '#0af4fc',
  }

};

module.exports = class Explosion {
  constructor(pos, health, type) {
    this.state = {
      pos: pos,
      isDestructable: true,
      explosionSize: 3 - health,
      explosionType: (type || Math.round(Math.random() * 1)),
      globalAlpha: 0.9,
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
    ctx.globalAlpha = this.state.globalAlpha;
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
    this.state.explosionSize -= 1;
    this.state.globalAlpha -= 0.02;
    this.state.health -= 1;
  }
};

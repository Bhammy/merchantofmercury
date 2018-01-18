const Ship = require('./ship');
const Asteroid = require('./asteroid');
const objUtil = require('./util');

module.exports = class Game {

  constructor(ctx, numAsteroids) {
    //save room for numPirates
    this.ctx = ctx;
    this.objects = [
      new Ship([40, 218], [0, 0]),
    ];
    for (var i = 1; i <= numAsteroids; i++) {
      this.objects.push( new Asteroid(objUtil.randomAsteroidStartPos(), objUtil.randomAsteroidStartVel()) );
    }
  }



};

const Ship = require('./ship');
const Asteroid = require('./asteroid');
const objUtil = require('./util');

module.exports = class Game {

  constructor(ctx, numAsteroids) {
    //save room for numPirates
    this.numAsteroids = numAsteroids;
    this.currentAsteroids = 0;
    this.ctx = ctx;
    this.addObject = this.addObject.bind(this);
    this.objects = [
      new Ship([40, 218], [0, 0], this.addObject),
    ];
    for (var i = 1; i <= numAsteroids; i++) {
      this.objects.push( new Asteroid(objUtil.randomAsteroidStartPos(), objUtil.randomAsteroidStartVel()) );
      this.currentAsteroids += 1;
    }
  }

  addObject(object) {
    this.objects.push(object);
  }

  removeObject(object) {
    this.objects.splice(this.objects.indexOf(object), 1);
  }


};

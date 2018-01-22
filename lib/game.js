const Ship = require('./ship');
const Asteroid = require('./asteroid');
const Star = require('./star');
const objUtil = require('./util');

module.exports = class Game {

  constructor(ctx, numAsteroids) {
    //save room for numPirates
    this.addObject = this.addObject.bind(this);
    this.origNumAsteroids = numAsteroids;
    this.numAsteroids = numAsteroids;
    this.currentAsteroids = 0;
    this.ctx = ctx;
    this.gameOver = false;
    this.score = 0;
    this.tick = 0;
    this.objects = [
      new Ship([40, 218], [0, 0], this.addObject),
    ];
    for (var i = 1; i <= numAsteroids; i++) {
      this.objects.push( new Asteroid(objUtil.randomStartPos(), objUtil.randomStartVel()) );
      this.currentAsteroids += 1;
    }
    this.stars = [];
    for (var j = 0; j < 100; j++) {
      this.stars.push(new Star());
    }
    key("r", () => {
      if (!this.objects.some( (obj) => obj instanceof Ship)) {
        let ship = new Ship([40, 218], [0, 0], this.addObject);
        this.objects.push(ship);
        this.gameOver = false;
        this.score = 0;
        this.numAsteroids = this.origNumAsteroids;
        $(".score").text("0");
        $(".health").text("5");
        $(".game-over").addClass("hidden");
      }
    });
  }

  addObject(object) {
    this.objects.push(object);
  }

  removeObject(object) {
    this.objects.splice(this.objects.indexOf(object), 1);
  }




};

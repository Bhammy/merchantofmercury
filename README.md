# Merchant of Mercury

![screenshot](https://github.com/Bhammy/merchantofmercury/blob/master/assets/mmscreen.png?raw=true)

### Background

This project is an arcade-style game where you play the plucky captain of a merchant ship, dodging asteroids and pirate missiles in equal measure. The goal of the game is simply to survive as long as possible!

### Technology & Features

HTML5 & Canvas, JavaScript
JS Libraries: Keymaster, jQuery
Firebase DB backend (highscores)

### Functionality & Features

Using native JavaScript and HTML5 features, players can:

  * Pilot the ship left, right, up or down using arrow or WASD keys
  * Encounter two distinct kinds of on-screen menaces: asteroids, pirates

### Implementation

Object-Oriented Design: every object maintains information about its current state, including canvas position, velocity, sprite data, size, health, scoreValue and more. There is a clear chain of class inheritance, with most classes inheriting from the MovingObject class.
  * This design is very modular and extensible - pirate ships and missiles were added in over the course of just a few hours.
  * Objects share method names - such as draw or move - so that a single game loop handles drawing and animation as necessary
  * Native Canvas methods used for animation - every asteroid is rotated through manipulation of the canvas context
  * Explosions are drawn using regular canvas lines/strokes/arcs for purposes of experimentation
  * Collisions are detected with a circle-collision method based on every object's image state data

Parallax background: the parallax background is a separate set of canvas objects that still use MovingObject methods; one hundred stars are drawn with random left velocities and random colors for maximum visual appeal.

  ```
    class Star extends MovingObject {
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
  ```

Game design: for every ten asteroids destroyed, the game adds an asteroid to the field, ensuring increasingly difficult levels of play. Pirate ships are generated at set scoring intervals; pirate missiles start off with a very low left velocity, but speed up over time, thus allowing players to spot their trajectories and avoid them (or get in a chance to shoot pirates.)

### Wireframes

![wireframe](https://github.com/Bhammy/merchantofmercury/blob/master/assets/wireframe.jpg?raw=true)

Player ship and spaceport sprite credits go to MillionthVector at: http://millionthvector.blogspot.com/p/free-sprites.html
Other sprite credits go to: http://pixeljoint.com/pixelart/43069.htm
Music found courtesy of Rolemusic: http://freemusicarchive.org/music/Rolemusic/

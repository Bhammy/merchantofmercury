const objUtil = {

    randomAsteroidStartPos: () => {
      // returns startPos off right, w/in canvas bounds
      return [710, (Math.random() * (460) + 20)];
    },

    randomAsteroidStartVel: () => {
      // returns randomVel, headed leftish left
      return [-(Math.random() * (4 - 0.5) + 0.5), -(Math.random() * [-1, 1][Math.round(Math.random())]) ];
    }
};

module.exports = objUtil;

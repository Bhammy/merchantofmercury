const objUtil = {

    randomAsteroidStartPos: () => {
      // returns startPos off right, w/in canvas bounds
      return [810, (Math.random() * (460) + 20)];
    },

    randomAsteroidStartVel: () => {
      // returns randomVel, headed leftish
      return [-(Math.random() * 3.5), (Math.random() * [-1, 1][Math.round(Math.random())]) ];
    }
};

module.exports = objUtil;

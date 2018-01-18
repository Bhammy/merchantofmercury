const objUtil = {

    randomAsteroidStartPos: () => {
      // returns startPos off right, w/in canvas bounds
      return [810, (Math.random() * (460) + 20)];
    },

    randomAsteroidStartVel: () => {
      // returns randomVel, headed leftish
      return [-(Math.random() * 3.5), (Math.random() * [-1, 1][Math.round(Math.random())]) ];
    },

    dist: (pos1, pos2) => {
      return Math.sqrt( Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2));
    }
};

module.exports = objUtil;

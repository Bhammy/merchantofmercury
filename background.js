const changeBackgroundImage = (num) => {
  let nextNum = num + 1;
  if (nextNum > 7) {
    nextNum = 1;
  }
  $("body").removeClass(`bgimage-${num}`).addClass(`bgimage-${nextNum}`);
  return nextNum;
};

module.exports = changeBackgroundImage;

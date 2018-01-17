const changeBackgroundImage = (num) => {
  console.log('changing background!');
  let nextNum = num + 1;
  if (nextNum > 5) {
    nextNum = 1;
  }
  $("body").removeClass(`bgimage-${num}`).addClass(`bgimage-${nextNum}`);
  return nextNum;
};

module.exports = changeBackgroundImage;

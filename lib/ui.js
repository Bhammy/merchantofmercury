const database = require('./db');

const getScoreData = (database) => {
  let scores = [];
  database.ref("highscores").orderByChild('score').limitToLast(5).on('child_added', (snapshot) => {
    scores.push(snapshot.val());
    scores = scores.sort( (el1, el2) => {
      return el2.score > el1.score;
    });
  });
};

const submitHighScore = (e) => {
  e.preventDefault();
  let name = $('input')[0].value;
  if (name === "") {
    name = "Anonymous";
  }
  let score = parseInt($('.form-score').text());
  let highscore = {
    name,
    score,
  };
  database.ref("highscores").push(highscore);
};

module.exports = {
  getScoreData,
  submitHighScore,
};

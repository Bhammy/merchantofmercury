const database = require('./db');

const getScoreData = (database) => {
  let scores = [];
  database.ref("highscores").orderByChild('score').limitToLast(5).on('child_added', (snapshot) => {
    scores.push(snapshot.val());
    if (scores.length === 5) {
      appendScores(scores);
    }
  });
};

const appendScores = (scores) => {
  scores = scores.sort( (el1, el2) => {
    return el2.score > el1.score;
  });

  scores.forEach( (score) => {
    $(".high-scores-list").append(`<li>${score.name} : <span>${score.score}</span> </li>`);
  });
};

const submitHighScore = (e) => {
  // e.preventDefault();
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

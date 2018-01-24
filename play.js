//note - use Firebase for auth - just key/value pairs - save as bonus feature
const changeBackgroundImage = require('./background');
const Game = require('./lib/game');
const database = require('./lib/db');
const gameLoop = require('./lib/game_loop');

window.addEventListener("load", () => {
  const currentHighscores = getScoreData(database);
  const canvas = document.getElementById('game-canvas');
  canvas.width = 800;
  canvas.height = 500;

  const ctx = canvas.getContext('2d');
  ctx.fillStyle = "black";
  ctx.rect(0, 0, 800, 500);
  ctx.fill();

  let bgNum = 1;

  setTimeout(setInterval( () => {
    let nextNum = changeBackgroundImage(bgNum);
    bgNum = nextNum;
  }, 10000), 10000);

  $("#audio-toggle").click( () => {
    let audio = $("audio")[0];
    if (audio.paused) {
      audio.play();
      $("#audio-logo").attr("src", "./assets/speaker.png");
    } else {
      audio.pause();
      $("#audio-logo").attr("src", "./assets/mute.png");
    }
  });

  $('form').on('submit', (e) => { submitHighScore(e); });

  let game = new Game(ctx, 20);

  window.setInterval(() => {
    gameLoop(ctx, game);
  }, 25);

});

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

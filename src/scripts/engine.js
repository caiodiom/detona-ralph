const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    lifeLeft: document.querySelector("#live-left"),
  },
  values: {
    gameVelocity: 900, 
    hitPosition: 0,
    result: 0,
    curretTime: 30,
    curretLife: 3,
    wrongClicks: 0,
  },
  actions: {
    timerId: setInterval(randomSquare, 800),
    countDownTimerId: setInterval(countDown, 1000),
  },
  isPlaying: true,
};

alert("Não deixe o Ralf detonar tudo!");
alert("Você tem 30 segundos e 3 vidas, tente acerta-lo o máximo de vezes que conseguir.");
alert("Clique Ok e o jogo vai começar.");

function lifeDown() {
  if (!state.isPlaying) return;

  state.values.curretLife--;
  state.view.lifeLeft.textContent = state.values.curretLife;

  if (state.values.curretLife === 0) {
    endGame("Game Over! Você perdeu todas as vidas, O seu resultado foi: " + state.values.result);
  }
}

function countDown() {
  state.values.curretTime--;
  state.view.timeLeft.textContent = state.values.curretTime;

  
  if (state.values.curretTime === 15) {
    updateGameVelocity(600); 
  } else if (state.values.curretTime === 5) {
    updateGameVelocity(400); 
  }

  if (state.values.curretTime <= 0) {
    endGame("Game Over! O tempo acabou, O seu resultado foi: " + state.values.result);
  }
}

function updateGameVelocity(newVelocity) {
  clearInterval(state.actions.timerId); 
  state.values.gameVelocity = newVelocity; 
  state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity); 
}

function endGame(message) {
  playSound("over");
  setTimeout(() => {
    alert(message);
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    state.isPlaying = false;

    state.view.footer.style.pointerEvents = 'auto';
  }, 100);
}

function playSound(audioName) {
  let audio = new Audio(`./src/audios/${audioName}.m4a`);
  audio.volume = 0.2;
  audio.play();
}

function playSound2(audioName) {
  let audio = new Audio(`./src/audios/${audioName}.m4a`);
  audio.volume = 0.9;
  audio.play();
}

function randomSquare() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  let randomNumber = Math.floor(Math.random() * 9);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add("enemy");
  state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (!state.isPlaying) return;

      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound("hit");
        state.values.wrongClicks = 0;
      } else {
        state.values.wrongClicks++;
        if (state.values.wrongClicks > 0) {
          lifeDown();
          playSound2("error2");
        }
      }
    });
  });
}

function initialize() {
  addListenerHitBox();
  state.view.footer.style.pointerEvents = 'none';
}

initialize();

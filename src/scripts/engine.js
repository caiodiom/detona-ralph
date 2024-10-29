const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score"),
    lifeLeft: document.querySelector("#live-left"),

  },
  values: {
    gameVelocity: 0,
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
alert("Você tem 30 segundos e 3 vidas, tente acertalo o máximo de vezes que conseguir.");
alert("Clique Ok e o jogo vai começar.")


function lifeDown() {
  if (!state.isPlaying) return; 

  state.values.curretLife--;
  state.view.lifeLeft.textContent = state.values.curretLife;

  if (state.values.curretLife === 0) {
    playSound("over");
    setTimeout(() => {
      alert("Game Over! Você perdeu todas as vidas, O seu resultado foi: " + state.values.result);
      clearInterval(state.actions.countDownTimerId);
      clearInterval(state.actions.timerId);


      
      document.body.classList.add("no-click");
      state.isPlaying = false;
    }, 100);
  }
}



function preventClick(event) {
  event.preventDefault();
  event.stopPropagation();
}

function countDown() {
  state.values.curretTime--;
  state.view.timeLeft.textContent = state.values.curretTime;
  

  if (state.values.curretTime <= 0) {

   
    playSound("over");
      setTimeout(() => {
        alert("Game Over! O tempo acabou, O seu resultado foi: " + state.values.result);
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        
    
        document.body.classList.add("no-click");
        state.isPlaying = false;
      }, 100);
     
  }
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

function moveEnemy() {
  state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);

  
}

function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.hitPosition) {
        state.values.result++;
        state.view.score.textContent = state.values.result;
        state.values.hitPosition = null;
        playSound("hit");
        state.values.wrongClicks = 0; 

        
      } else {
        state.values.wrongClicks++; 
        if (state.values.wrongClicks % 1 === 0 && state.values.wrongClicks > 0) {
          lifeDown();
          playSound2("error2");
          
        }
      }
    });
  });
}

function initialize() {
  addListenerHitBox();
  
}


initialize();

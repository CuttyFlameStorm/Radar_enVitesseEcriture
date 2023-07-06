


const userInput = document.getElementById("userInput");
const vitesseGenerale = document.getElementById("vitesseGenerale");
const vitesseIntermediaire = document.getElementById("vitesseIntermediaire");
const stopButton = document.getElementById("stop");
const timerElement = document.getElementById("timer");
const spinneur = document.getElementById("spinneur");

let minutes = 0;
let secondes = 0;
let millisecondes = 0;
let intervalId2;
let isTimerRunning = false;

let texte = "";
let dernierIntermediaire = 0;
let dernierNbCaracteres = 0; 
let vitesse = 0;
let intervalId;
let isFirstCalculation = true;

function calculerVitesse() {
  const maintenant = new Date().getTime();
  const intervalle = maintenant - dernierIntermediaire;
  const nbCaracteres = texte.length;

  const vitesseActuelle = (nbCaracteres / intervalle) * 1000 * 60;
  vitesseGenerale.textContent = vitesseActuelle.toFixed(2);

  if (intervalle < 5000) {
    vitesseIntermediaire.textContent = vitesseActuelle.toFixed(2);
  } else {
    const nbCaracteresIntermediaire = texte.length - dernierNbCaracteres;
    const vitesseIntermediaireActuelle = (nbCaracteresIntermediaire / 5) * 60;
    vitesseIntermediaire.textContent = vitesseIntermediaireActuelle.toFixed(2);
    dernierIntermediaire = maintenant;
    dernierNbCaracteres = texte.length;
  }

  if (isFirstCalculation) {
    stopButton.style.display = "block";
    isFirstCalculation = false; 
    spinneur.style.display = "block";
    startTimer();
  }
}

function startTimer() {
  if (!isTimerRunning) {
    intervalId2 = setInterval(updateTimer, 10);
    isTimerRunning = true;
  }
}

function updateTimer() {
  millisecondes += 10;

  if (millisecondes >= 1000) {
    millisecondes = 0;
    secondes++;
  }

  if (secondes >= 60) {
    secondes = 0;
    minutes++;
  }

  const formattedTime = formatTime(minutes, secondes, millisecondes);
  timerElement.textContent = formattedTime;
}

function formatTime(minutes, secondes, millisecondes) {
  return `${padZero(minutes)}:${padZero(secondes)}:${padZero(Math.floor(millisecondes / 10))}`;
}

function padZero(value) {
  return value.toString().padStart(2, "0");
}

function stopTimer() {
  clearInterval(intervalId2);
  isTimerRunning = false;
}

stopButton.addEventListener("click", () => {
  clearInterval(intervalId);
  stopTimer();
});

userInput.addEventListener("input", () => {
  texte = userInput.value;
  if (isFirstCalculation && texte.length > 0) {
    calculerVitesse();
  }
});

const resetButton = document.getElementById("reset");
resetButton.addEventListener("click", () => {
  clearInterval(intervalId);
  stopTimer();
  resetTimer();
});

function resetTimer() {
  minutes = 0;
  secondes = 0;
  millisecondes = 0;
  timerElement.textContent = "00:00:00";
}

const refreshButton = document.getElementById("refresh");

refreshButton.addEventListener("click", () => {
  location.reload();
});


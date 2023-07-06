



const userInput = document.getElementById("userInput");
const vitesseGenerale = document.getElementById("vitesseGenerale");
const vitesseIntermediaire = document.getElementById("vitesseIntermediaire");
const stopButton = document.getElementById("stop");
// const resetButton = document.getElementById("reset");
const timerElement = document.getElementById("timer");
const spinneur = document.getElementById("spinneur"); // Ajout de cette ligne

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
    stopButton.style.display = "block"; // Afficher le Bouton.
    isFirstCalculation = false; 
    spinneur.style.display = "block"; // Afficher le spinneur.
    startTimer();
  }
}



userInput.addEventListener("input", () => {
  texte = userInput.value;
});

userInput.addEventListener("focus", () => {
  dernierIntermediaire = new Date().getTime();
  intervalId = setInterval(calculerVitesse, 5000);
});


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
//   function resetTimer() {
//     stopTimer();
//     minutes = 0;
//     secondes = 0;
//     millisecondes = 0;
//     timerElement.textContent = "00:00:00";
//     userInput.value = "";
//     vitesseGenerale.textContent = "";
//     vitesseIntermediaire.textContent = "";
//     stopButton.style.display = "none";
//     spinneur.style.display = "none";
//   }
// userInput.addEventListener("input", startTimer);
// stopButton.addEventListener("click", stopTimer);
// resetButton.addEventListener("click", resetTimer); // Réinitialiser le chronomètre lorsque vous cliquez sur le bouton "Réinitialiser"




stopButton.addEventListener("click", () => {
    clearInterval(intervalId);
    spinneur.style.display = "none"; // Masquer l'élément spinneur
    stopTimer();
  });


stopButton.addEventListener("click", () => {
  clearInterval(intervalId);
  stopButton.classList.add("clicked");
});

const refreshButton = document.getElementById("reset");

refreshButton.addEventListener("click", () => {
  location.reload();
});




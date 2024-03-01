let startTime;
let elapsedTime = 0;
let timerInterval;

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapsList = document.getElementById('laps');

function formatTime(milliseconds) {
  const hours = Math.floor(milliseconds / (1000 * 60 * 60));
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
  const millisecondsFormatted = (milliseconds % 1000).toString().padStart(3, '0');

  const hoursDisplay = hours.toString().padStart(2, '0');
  const minutesDisplay = minutes.toString().padStart(2, '0');
  const secondsDisplay = seconds.toString().padStart(2, '0');

  return `${hoursDisplay} HR : ${minutesDisplay} MIN : ${secondsDisplay} SEC . ${millisecondsFormatted}`;
}

function printTime() {
  display.textContent = formatTime(elapsedTime);
}

function startTimer() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(function() {
    elapsedTime = Date.now() - startTime;
    printTime();
  }, 10);
  startBtn.disabled = true;
  pauseBtn.disabled = false;
}

function pauseTimer() {
  clearInterval(timerInterval);
  startBtn.disabled = false;
  pauseBtn.disabled = true;
}

function resetTimer() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  printTime();
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  lapsList.innerHTML = '';
}

function addLap() {
  const lapTime = formatTime(elapsedTime);
  const lapItem = document.createElement('li');
  lapItem.textContent = `Lap ${lapsList.children.length + 1}: ${lapTime}`;
  lapsList.appendChild(lapItem);
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

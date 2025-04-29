let startTime = 0;
let interval;
let running = false;

const display = document.getElementById('display');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapsList = document.getElementById('laps');

function formatTime(ms) {
  const date = new Date(ms);
  const hours = String(date.getUTCHours()).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function updateDisplay() {
  const elapsed = Date.now() - startTime;
  display.textContent = formatTime(elapsed);
}

startBtn.addEventListener('click', () => {
  if (!running) {
    running = true;
    startTime = Date.now() - (interval || 0);
    interval = setInterval(updateDisplay, 10);
  }
});

pauseBtn.addEventListener('click', () => {
  if (running) {
    running = false;
    clearInterval(interval);
    interval = Date.now() - startTime;
  }
});

resetBtn.addEventListener('click', () => {
  running = false;
  clearInterval(interval);
  startTime = 0;
  interval = 0;
  display.textContent = "00:00:00.000";
  lapsList.innerHTML = '';
});

lapBtn.addEventListener('click', () => {
  if (running) {
    const lapTime = Date.now() - startTime;
    const li = document.createElement('li');
    li.textContent = formatTime(lapTime);
    lapsList.appendChild(li);
  }
});


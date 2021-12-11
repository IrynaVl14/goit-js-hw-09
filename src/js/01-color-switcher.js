const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let timerId = null;
let isActive = false;

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
  if (isActive) {
    return;
  }
  timerId = setInterval(() => {
    isActive = true;
    console.log('start', 'onStartBtnClick');
  document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStopBtnClick() {
  clearInterval(timerId);
  isActive = false;
  console.log('STOP','onStopBtnClick' )
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}


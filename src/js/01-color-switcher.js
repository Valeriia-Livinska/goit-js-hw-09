const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');

btnStart.addEventListener('click', onStartClick);
btnStop.addEventListener('click', onStopClick);

let timerId = null;
btnStart.disabled = false;

function onStartClick() {
  if (btnStart.disabled) {
    return;
  }

  btnStart.disabled = true;

  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
    console.log('Changing colors');
  }, 1_000);
}

function onStopClick() {
  btnStart.disabled = false;
  clearTimeout(timerId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

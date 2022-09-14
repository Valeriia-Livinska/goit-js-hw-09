import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  timerGrid: document.querySelector('.timer'),
  timerColumns: document.querySelectorAll('.field'),
  btnStart: document.querySelector('button[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let chosenDate = null;

refs.btnStart.disabled = true;
refs.btnStart.addEventListener('click', onStartClick);

refs.timerGrid.style.cssText = `display: flex;
    grid-gap: 10px;
    margin-top: 20px;
  `;
refs.timerColumns.forEach(column => {
  column.style.cssText = `display: grid;
    place-items: center;  
  `;
});

const options = {
  enableTime: true,
  enableSeconds: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < options.defaultDate) {
      refs.btnStart.disabled = true;
      Notify.failure('Please choose a date in the future');

      return;
    }
    refs.btnStart.disabled = false;

    chosenDate = selectedDates[0].getTime();
  },
};

const picker = flatpickr(document.querySelector('#datetime-picker'), options);

function onStartClick() {
  const timer = setInterval(() => {
    const currentDate = Date.now();
    const timeRange = chosenDate - currentDate;

    const { days, hours, minutes, seconds } = convertMs(timeRange);

    refs.days.textContent = `${days}`;
    refs.hours.textContent = `${hours}`;
    refs.minutes.textContent = `${minutes}`;
    refs.seconds.textContent = `${seconds}`;

    if (timeRange < 1000) {
      clearInterval(timer);
      Notify.success('Congrats, time is up!');

      return;
    }
  }, 1_000);
}

const addLeadingZero = value => {
  return String(value).padStart(2, '0');
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

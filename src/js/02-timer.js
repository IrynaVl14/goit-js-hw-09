import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const startBtn = document.querySelector('[data-start]');
const clockface = {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds:document.querySelector('[data-seconds]'),
}

const fp = flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      if (new Date() > selectedDates[0]) {
          startBtn.disabled = true;
          window.alert("Please choose a date in the future");
      } else {
          startBtn.disabled = false;
      }
    },
});
  
startBtn.addEventListener('click', onBtnClick);

function onBtnClick() {
    timer.start();
    startBtn.disabled = true;
       
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2,'0')
}

function updateData({days, hours, minutes, seconds}) {
    clockface.days.textContent = days;
    clockface.hours.textContent = hours;
    clockface.minutes.textContent = minutes;
    clockface.seconds.textContent = seconds;    
}

const timer = {    
    start() {
            
        setInterval(() => {
            const endTime = fp.selectedDates[0];
            const currentTime = Date.now();
            const deltaTime = endTime-currentTime;            
        if (deltaTime<=0) {
            return;
        }
            const convertedTime = convertMs(deltaTime);    
            updateData(convertedTime);
        }, 1000);
    },
}



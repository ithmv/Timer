const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

const formatTime = (time) => {
  const hours = Math.floor(time / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
  const seconds = Math.floor(time % 60).toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

const createTimerAnimator = () => {
  let intervalId;
  let remainingTime;

  return (seconds) => {
    clearInterval(intervalId);
    remainingTime = seconds;

    const tick = () => {
      if (remainingTime <= 0) {
        clearInterval(intervalId);
        timerEl.textContent = formatTime(0);
      } else {
        timerEl.textContent = formatTime(remainingTime);
        remainingTime--;
      }
    }

    tick();
    intervalId = setInterval(tick, 1000);
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', () => {
  inputEl.value = inputEl.value.replace(/\D/g, '');
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = '';
});
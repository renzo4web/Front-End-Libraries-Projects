let sessionLength = 2;
let breakLength = 2;

const handleBtnSession = (btn) => {
  const currBtn = btn.currentTarget.id;

  updateLengthsVals(currBtn);
  checkLength();

  toDisplay(sessionLengthDisplay, sessionLength);
  toDisplay(breakLengthDisplay, breakLength);
  timeLeft.textContent = `${sessionLength}:00`;
};

const updateLengthsVals = (btn) => {

  btn.includes('session') ?
      btn === 'session-increment' ? sessionLength++ : sessionLength-- :
      btn === 'break-increment' ? breakLength++ : breakLength--;

};

const toDisplay = (domElement, value) => {
  domElement.textContent = value.toString();
};

const checkLength = () => {
  (breakLength > 60) && breakLength--;
  (breakLength < 1) && breakLength++;
  (sessionLength > 60) && sessionLength--;
  (sessionLength < 1) && sessionLength++;
};

btnsBreak.forEach((btn) => btn.addEventListener('click', handleBtnSession));
btnsSession.forEach((btn) => btn.addEventListener('click', handleBtnSession));
btnStartStop.addEventListener('click', () => {

  let currTimeMin = sessionLength - 1;
  let min = 59;

  const updateLeftTime = () => {
    if (min > 0) {
      timeLeft.textContent = `${currTimeMin}:${min--} `;
    } else {
      currTimeMin--;
      min = 59;
    }
    if (currTimeMin <= 0 && min <= 0) {
      if (timerLabel.textContent === 'Session') {
        timerLabel.textContent = 'BREAK!!!!';
        currTimeMin = breakLength-1;
      } else {
        timerLabel.textContent = 'Session';
        currTimeMin = sessionLength-1;
      }

      min = 59;
    }
    console.log(currTimeMin);
  };

  setInterval(updateLeftTime, 100);
});
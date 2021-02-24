let sessionLength = 25;
let breakLength = 2;
let currTimeMin = sessionLength - 1;
let min = 59;
let timerId;

const handleBtnSession = (btn) => {
  const currBtn = btn.currentTarget.id;

  updateLengthsVals(currBtn);
  checkLength();
  min = 59;
  currTimeMin = sessionLength - 1;
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

const updateLeftTime = () => {
  if (min > 0) {
    min--;
  }else {
    currTimeMin--;
    min = 59
  }

  let secDisplay = (min >= 10) ? `${min}` : `0${min}`;
  let minDisplay = (currTimeMin >= 10) ? `${currTimeMin}` : `0${currTimeMin}`;
  timeLeft.textContent = `${minDisplay}:${secDisplay}`;

  if (currTimeMin <= 0 && min <= 0) {
    if (timerLabel.textContent === 'Session') {
      timerLabel.textContent = 'BREAK!!!!';
      currTimeMin = breakLength - 1;
    } else {
      timerLabel.textContent = 'Session';
      currTimeMin = sessionLength - 1;
    }
    min = 59

  }

};

btnStartStop.addEventListener('click', () => {

  (btnStartStop.textContent === '▶')
      ? btnStartStop.textContent = '⏹'
      : btnStartStop.textContent = '▶';

  if (btnStartStop.textContent !== '⏹') {
    clearInterval(timerId);
    return;
  }

  timerId = setInterval(updateLeftTime, 100);

});

btnReset.addEventListener('click', () => {
  clearInterval(timerId);
  currTimeMin = sessionLength - 1;
  min = 59;
  timeLeft.textContent = `${sessionLength}:00`;
});
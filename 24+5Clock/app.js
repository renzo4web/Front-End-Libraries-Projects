let sessionLength = 25;
let breakLength = 5;
let currTimeMin = sessionLength - 1;
let min = 60;
let timerId;

const handleBtnSession = (btn) => {
  const currBtn = btn.currentTarget.id;

  updateLengthsVals(currBtn);
  checkLength();
  min = 60;
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
  } else {
    currTimeMin--;
    min = 60;
  }

  let secDisplay = (min >= 10) ? `${min}` : `0${min}`;
  let minDisplay = (currTimeMin >= 10) ? `${currTimeMin}` : `0${currTimeMin}`;
  timeLeft.textContent = `${minDisplay}:${secDisplay}`;

  if (currTimeMin <= 0 && min <= 1) {
    if (timerLabel.textContent === 'Session') {
      timerLabel.textContent = 'BREAK!!!!';
      currTimeMin = breakLength - 1;
    } else {
      timerLabel.textContent = 'Session';
      currTimeMin = sessionLength - 1;
    }
    min = 60;

  }

};

btnStartStop.addEventListener('click', () => {
  updateBtn();
  if (btnStartStop.textContent !== '⏹') {
    clearInterval(timerId);
    return;
  }

  timerId = setInterval(updateLeftTime, 1000);

});

const updateBtn = () => {

  (btnStartStop.textContent === '▶')
      ? btnStartStop.textContent = '⏹'
      : btnStartStop.textContent = '▶';
};

const resetTimer = ()=>{
  clearInterval(timerId);
  sessionLength = 25;
  breakLength = 5;
  currTimeMin = sessionLength - 1;
  toDisplay(sessionLengthDisplay, sessionLength);
  toDisplay(breakLengthDisplay, breakLength);
  min = 60;
  timeLeft.textContent = `${sessionLength}:00`;
  btnStartStop.textContent = '▶';
}


btnReset.addEventListener('click', resetTimer);
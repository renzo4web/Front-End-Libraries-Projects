let sessionLength = 25;
let breakLength = 5;
let currTimeMin = sessionLength - 1;
let min = 60;
let timerId;

const handleBtnSession = (btn) => {
  const currBtn = btn.currentTarget.id;

  updateLengthsVals(currBtn);
  checkLength();
  currTimeMin = sessionLength - 1;
  toDisplay(sessionLengthDisplay, sessionLength);
  toDisplay(breakLengthDisplay, breakLength);

  timeLeft.textContent = `${(sessionLength >= 10) ? sessionLength : '0' +
      sessionLength}:00`;
  min = 60;
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

const addZeros = (domElement, time) => {
  let secDisplay = (min >= 10) ? `${min}` : `0${min}`;
  let minDisplay = (time >= 10) ? `${time}` : `0${time}`;
  domElement.textContent = `${minDisplay}:${secDisplay}`;
};

const updateLeftTime = () => {

  if (currTimeMin <= 0 && min <= 0) {
    if (timerLabel.textContent === 'Session') {
      timerLabel.textContent = 'Break';
      currTimeMin = breakLength - 1;
      audio.play();
    } else {
      timerLabel.textContent = 'Session';
      currTimeMin = sessionLength - 1;
      audio.play();
    }

    min = 60;
  }

  if (min > 0) {
    min--;
  } else {
    currTimeMin--;
    min = 60;
  }

  addZeros(timeLeft, currTimeMin);

};

const freezeBtns = (btnGroup, remove) => {
  if (remove) {
    btnGroup.forEach(btn => btn.disabled = true);
    return;
  }
  btnGroup.forEach(btn => btn.disabled = false);
};

btnStartStop.addEventListener('click', () => {
  freezeBtns(btnsBreak, true);
  freezeBtns(btnsSession, true);
  updateBtn();
  if (btnStartStop.textContent !== '⏹') {
    clearInterval(timerId);
    return;
  }

  timerId = setInterval(updateLeftTime, 100);

});

const updateBtn = () => {

  (btnStartStop.textContent === '▶')
      ? btnStartStop.textContent = '⏹'
      : btnStartStop.textContent = '▶';
};

const defaultTime = () => {
  sessionLength = 25;
  breakLength = 5;
  min = 60;
};

const resetTimer = () => {
  clearInterval(timerId);
  audio.pause();
  audio.currentTime = 0;
  defaultTime();

  freezeBtns(btnsBreak, false);
  freezeBtns(btnsSession, false);

  toDisplay(sessionLengthDisplay, sessionLength);
  toDisplay(breakLengthDisplay, breakLength);
  toDisplay(timeLeft, `${sessionLength}:00`);
  toDisplay(timerLabel, 'Session');
  btnStartStop.textContent = '▶';
  currTimeMin = sessionLength - 1;
};

btnReset.addEventListener('click', resetTimer);
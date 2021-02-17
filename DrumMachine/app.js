const btnDrumPad = document.querySelectorAll('.drum-pad');
const powerBtn = document.querySelector('.power');
const volumeSlider = document.querySelector('.slider');
const display = document.getElementById('display');
const btnBank = document.querySelector('.bank');
let isPower = true;
let currentBank = bankOne;

const audioElement = document.createElement('audio');
audioElement.volume = 0;

/* Listeners  */

btnDrumPad.forEach(btn => {
  btn.addEventListener('click', handleClickOrKey);
});

powerBtn.addEventListener('click', () => {

  if (!isPower) {
    isPower = true;
    powerBtn.textContent = 'ON';
    return;
  }

  isPower = false;
  powerBtn.textContent = 'OFF';

});

// volumeSlider.addEventListener('input', handleVolume);

btnBank.addEventListener('click',
    () => {
      if (currentBank === bankOne) {
        currentBank = bankTwo;
        btnBank.textContent = 'Bank 2';
        return;
      }
      currentBank = bankOne;
      btnBank.textContent = 'Bank 1';

    });

document.addEventListener('keydown', handleClickOrKey);

/* Handles  */

function handleClickOrKey(e) {
  clearStylesBtns();
  if (!isPower) return;

  audioElement.classList.add('clip');

  let drumPad;
  (e.type === 'keydown')
      // Keypress
      ? drumPad = searchBtn(e.key.toUpperCase())
      // Click
      : drumPad = e.currentTarget;

  const index = currentBank.findIndex(
      x => x.keyTrigger === drumPad.textContent.trim());

  const sound = currentBank[index];

  audioElement.id = currentBank[index].keyTrigger;

  drumPad.appendChild(audioElement);

  // Hover effect when is key pressed
  e.type === 'keydown' ? drumPad.classList.add('key-pressed') : '';

  audioElement.src = sound.url;
  audioElement.cloneNode().play();

  toScreen(sound.id);
}

function toScreen(soundName) {
  const displayId = document.querySelector('.sound-id');
  displayId.textContent = soundName;
}

function searchBtn(key) {
  let rndKey = Math.floor(Math.random() * btnDrumPad.length + 1);

  for (let i = 0; i < btnDrumPad.length; i++) {
    if (key === btnDrumPad[i].textContent.trim()) return btnDrumPad[i];
  }
  // If the key pressed not match , a random btn is activated
  return btnDrumPad[rndKey];
}

function clearStylesBtns() {
  btnDrumPad.forEach(btn => btn.classList.remove('key-pressed'));

}


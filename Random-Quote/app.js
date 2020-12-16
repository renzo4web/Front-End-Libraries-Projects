const text = document.getElementById('text');
const aut = document.getElementById('author');
const btn = document.getElementById('new-quote');
const twitterBtn = document.getElementById('tweet-quote');

let jsonQuote = './quotes.txt';
let color;
let currentAuthor;
let currentQuote;
let random = getRandomQt();

function getRandomQt() {
  let n = Math.floor(Math.random() * 300);
  return n;
}

function colorRandom() {
  return (
    getRandomQt().toString(16) +
    getRandomQt().toString(16) +
    getRandomQt().toString(16)
  );
}

function getQuotes() {
  currentQuote = fetch(jsonQuote)
    .then((r) => r.text())
    .then((t) => (text.textContent = `“${JSON.parse(t)[random].text}`));

  currentAuthor = fetch(jsonQuote)
    .then((p) => p.text())
    .then((w) => {
      if (JSON.parse(w)[random].author !== null) {
        aut.textContent = `-${JSON.parse(w)[random].author}`;
      } else {
        aut.textContent = 'Anonymous';
      }
    });
}

getQuotes();

document.body.style.backgroundColor = `#${color}`;

btn.addEventListener('click', () => {
  color = colorRandom();
  random = getRandomQt();
  getQuotes();
  document.body.style.backgroundColor = `#${color}`;
});

twitterBtn.onclick = () => {
  let linkTwitter = text.textContent;
  twitterBtn.href = `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${linkTwitter
    .split(' ')
    .join('%20')}`;
};

text.onclick = () => {
  let copyText = text.textContent;
  console.log(copyText);
  navigator.clipboard.writeText(copyText);
};

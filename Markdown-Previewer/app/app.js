const textArea = document.getElementById('editor');
const preview = document.getElementById('preview');
marked.setOptions({
  baseUrl: null,
  breaks: true,
  gfm: true,
  headerIds: true,
  headerPrefix: '',
  highlight: null,
  langPrefix: 'language-',
  mangle: true,
  pedantic: false,
  sanitize: false,
  sanitizer: null,
  silent: false,
  smartLists: false,
  smartypants: false,
  tokenizer: null,
  walkTokens: null,
  xhtml: false,
});
marked.Renderer();
t = textArea.addEventListener('input', () => {
  let g = textArea.value;
  //let r = g.split('');

  preview.innerHTML = marked(g);
  console.log(marked(g));
});
//console.log(marked('# heading+'));

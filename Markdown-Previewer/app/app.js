const markdownExample =
  '# Welcome to my React Markdown Previewer!\n' +
  '\n' +
  '## This is a sub-heading...\n' +
  "### And here's some other cool stuff:\n" +
  '\n' +
  'Heres some code, `<div></div>`, between 2 backticks.\n' +
  '\n' +
  '```' +
  '// this is multi-line code:\n' +
  '\n' +
  'function anotherExample(firstLine, lastLine) {\n' +
  "  if (firstLine == '```' && lastLine == '```') {\n" +
  '    return multiLineCode;\n' +
  '  }' +
  '}\n' +
  '```\n' +
  '\n' +
  'You can also make text **bold**... whoa!\n' +
  'Or _italic_.\n' +
  'Or... wait for it... **_both!_**\n' +
  'And feel free to go crazy ~~crossing stuff out~~.\n' +
  '\n' +
  "There's also [links](https://www.freecodecamp.com), and\n" +
  '> Block Quotes!\n' +
  '\n' +
  'And if you want to get really crazy, even tables:\n' +
  '\n' +
  'Wild Header | Crazy Header | Another Header?\n' +
  '------------ | ------------- | -------------\n' +
  'Your content can | be here, and it | can be here....\n' +
  'And here. | Okay. | I think we get it.\n' +
  '\n' +
  '- And of course there are lists.\n' +
  '  - Some are bulleted.\n' +
  '     - With different indentation levels.\n' +
  '        - That look like this.\n' +
  '\n' +
  '\n' +
  '1. And there are numbererd lists too.\n' +
  '1. Use just 1s if you want!\n' +
  "1. And last but not least, let's not forget embedded images:\n" +
  '\n' +
  '![React Logo w/ Text](https://goo.gl/Umyytc)\n';

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

textArea.textContent = markdownExample;
preview.innerHTML = marked(markdownExample);
t = textArea.addEventListener('input', () => {
  let g = textArea.value;
  //let r = g.split('');

  preview.innerHTML = marked(g);
  console.log(marked(g));
});

'use strict'

const formatHTML = (string, indent) => {

  const openingTag = /(\<[a-zA-Z\d\-]+.*\>)/g;
  const closingTag = /\<\/([a-zA-Z\d\-]+)\>/g;
  const tagEnd = />/g;

  let html = '';
  let lines = '';
  let depth = 0;

  let strings = string.split('\n');
  for (let string of strings) {
    lines += string.replace(tagEnd, matched => `${matched}\n`).trim();
  }

  strings = lines.split('\n');
  for (let string of strings) {
    if (string.match(openingTag)) {
      depth++;
    }
    html += `${new Array(depth).join(indent)}${string}\n`;
    if (string.match(closingTag)) {
      depth--;
    }
  }

  return html;
};

window.onload = e => {

  const formatInput  = document.querySelector('#format-input');
  const formatOutput = document.querySelector('#format-output');

  formatInput.addEventListener('input', e => formatOutput.value = formatHTML(formatInput.value, '  '));

};

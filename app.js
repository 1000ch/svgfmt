'use strict'

const formatSVG = require('./');

window.onload = e => {
  const formatInput  = document.querySelector('#format-input');
  const formatOutput = document.querySelector('#format-output');
  formatInput.addEventListener('input', e => formatOutput.value = formatSVG(formatInput.value, '  '));
};

if (navigator.serviceWorker) {
  navigator.serviceWorker.register('service-worker.js', {
    scope: '/svgfmt/'
  }).catch(error => console.error(error));
}

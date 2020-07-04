'use strict';
const svgfmt = require('.');

window.addEventListener('load', () => {
  const formatInput = document.querySelector('#format-input');
  const formatOutput = document.querySelector('#format-output');
  formatInput.addEventListener('input', () => {
    formatOutput.value = svgfmt(formatInput.value, '  ');
  });
});

if (navigator.serviceWorker) {
  navigator.serviceWorker.register('service-worker.js', {
    scope: '/svgfmt/'
  }).catch(error => console.error(error));
}

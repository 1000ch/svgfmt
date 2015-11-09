'use strict'

const formatXML = require('./');

window.onload = e => {
  const formatInput  = document.querySelector('#format-input');
  const formatOutput = document.querySelector('#format-output');
  formatInput.addEventListener('input', e => formatOutput.value = formatXML(formatInput.value, '  '));
};

if (navigator.serviceWorker) {
  navigator.serviceWorker.register('service-worker.js', {
    scope: '/xmlfmt/'
  }).catch(error => console.error(error));
}

import svgfmt from '..';

window.addEventListener('load', () => {
  const formatInput = document.querySelector('#format-input');
  const formatOutput = document.querySelector('#format-output');
  const formatError = document.querySelector('#format-error');

  formatInput.addEventListener('input', () => {
    try {
      formatOutput.value = svgfmt(formatInput.value, '  ');
      formatError.textContent = '';
    } catch (error) {
      formatError.textContent = error.message;
    }
  });
});

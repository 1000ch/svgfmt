'use strict'

const parseXML = require('xml-parser');

const createIndent = depth => Array(depth * 2 + 1).join(' ');

const createAttributes = attributes => {
  let keys = Object.keys(attributes);
  if (keys.length) {
    return keys.map(key => ` ${key}="${attributes[key]}"`);
  } else {
    return '';
  }
};

const createOpenTag = object => `<${object.name}${createAttributes(object.attributes)}>`;

const createCloseTag = object => `</${object.name}>`;

const createIsolateTag = object => {
  if (object.content) {
    return `<${object.name}${createAttributes(object.attributes)}>${object.content}</${object.name}>`;
  } else {
    return `<${object.name}${createAttributes(object.attributes)} />`;
  }
};

const createXML = (object, depth) => {
  let xml = '';
  if (object.children.length) {
    xml += `${createIndent(depth)}${createOpenTag(object)}\n`;
    if (object.content) {
      xml += `${createIndent(depth + 1)}${object.content}\n`;
    }
    object.children.forEach(child => {
      xml += createXML(child, depth + 1);
    });
    xml += `${createIndent(depth)}${createCloseTag(object)}\n`;
  } else {
    xml += `${createIndent(depth)}${createIsolateTag(object)}\n`;
  }
  return xml;
};

const formatXML = (string, indent) => {
  let xml = '';
  try {
    let ast = parseXML(string);
    if (ast.declaration) {
      xml += `<xml${createAttributes(ast.declaration)}>`;
    }
    xml += createXML(ast.root, 0);
  } catch (e) {
    return string;
  }
  return xml;
};

window.onload = e => {
  const formatInput  = document.querySelector('#format-input');
  const formatOutput = document.querySelector('#format-output');
  formatInput.addEventListener('input', e => formatOutput.value = formatXML(formatInput.value, '  '));
};

if (navigator.serviceWorker) {
  navigator.serviceWorker.register('service-worker.js', {
    scope: '/xml-format/'
  }).catch(error => console.error(error));
}

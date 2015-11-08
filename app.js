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

  let name = object.name;
  let attributes = createAttributes(object.attributes);
  let content = object.content;

  if (content) {
    return `<${name}${attributes}>${content}</${name}>`;
  } else {
    return `<${name}${attributes} />`;
  }
};

const createXML = (object, depth) => {

  let xml = '';
  let indent = createIndent(depth);
  let children = object.children;
  let content = object.content;

  if (children.length) {
    xml += `${indent}${createOpenTag(object)}\n`;
    if (content) {
      xml += `${createIndent(depth + 1)}${content}\n`;
    }
    children.forEach(child => {
      xml += createXML(child, depth + 1);
    });
    xml += `${indent}${createCloseTag(object)}\n`;
  } else {
    xml += `${indent}${createIsolateTag(object)}\n`;
  }
  return xml;
};

const formatXML = (string, indent) => {

  let xml = '';

  try {
    let ast = parseXML(string);
    let declaration = ast.declaration;
    let root = ast.root;

    if (declaration) {
      let attributes = createAttributes(declaration);
      xml += `<xml${attributes}>`;
    }

    if (root) {
      xml += createXML(root, 0);
    }
  } catch (e) {
    return string;
  }

  return xml;
};

window.onload = e => {
  const formatInput  = document.querySelector('#format-input');
  const formatOutput = document.querySelector('#format-output');
  formatInput.addEventListener('input', e => formatOutput.value = formatXML(formatInput.value, '  '));
};

if (navigator.serviceWorker) {
  navigator.serviceWorker.register('service-worker.js', {
    scope: '/xml-format/'
  }).catch(error => console.error(error));
}

'use strict';

const parse = require('xml-parser');
const stringify = require('xml-stringify');

function svgfmt(string, indent) {
  try {
    let ast = parse(string);
    return stringify(ast, indent || 2);
  } catch (e) {
    throw e;
  }
  return string;
}

module.exports = svgfmt;

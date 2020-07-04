'use strict';

const parse = require('xml-parser');
const stringify = require('xml-stringify');

function svgfmt(string, indent) {
  const ast = parse(string);
  return stringify(ast, indent || 2);
}

module.exports = svgfmt;

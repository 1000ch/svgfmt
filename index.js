'use strict';

const parse = require('xml-parser');
const stringify = require('xml-stringify');

function svgfmt(string) {
  try {
    let ast = parse(string);
    return stringify(ast);
  } catch (e) {
    throw e;
  }
  return string;
}

module.exports = svgfmt;

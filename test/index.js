const fs = require('fs');
const path = require('path');
const test = require('ava');
const fmt = require('..');

test('Format xml with declaration', t => {
  const fixtures = fs.readFileSync(path.resolve(__dirname, 'fixtures/1.xml'), 'utf8');
  const expected = fs.readFileSync(path.resolve(__dirname, 'expected/1.xml'), 'utf8');

  t.is(fmt(fixtures), expected);
});

test('Format xml without declaration', t => {
  const fixtures = fs.readFileSync(path.resolve(__dirname, 'fixtures/2.xml'), 'utf8');
  const expected = fs.readFileSync(path.resolve(__dirname, 'expected/2.xml'), 'utf8');

  t.is(fmt(fixtures), expected);
});

test('Format xml including isolated tag', t => {
  const fixtures = fs.readFileSync(path.resolve(__dirname, 'fixtures/3.xml'), 'utf8');
  const expected = fs.readFileSync(path.resolve(__dirname, 'expected/3.xml'), 'utf8');

  t.is(fmt(fixtures), expected);
});

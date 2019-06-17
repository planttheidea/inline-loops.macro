const pluginTester = require('babel-plugin-tester');
const plugin = require('babel-plugin-macros');
const path = require('path');

const BABEL_OPTIONS = {
  presets: ['@babel/preset-react'],
};

pluginTester({
  fixtures: path.join(__dirname, '__fixtures__', 'cached'),
  filename: __filename,
  plugin,
  title: 'Cached references',
});

pluginTester({
  fixtures: path.join(__dirname, '__fixtures__', 'inlined-arrow-expression'),
  filename: __filename,
  plugin,
  title: 'Inlined function references (arrow expression)',
});

pluginTester({
  fixtures: path.join(__dirname, '__fixtures__', 'inlined-arrow-return'),
  filename: __filename,
  plugin,
  title: 'Inlined function references (arrow return)',
});

pluginTester({
  fixtures: path.join(__dirname, '__fixtures__', 'inlined-function-return'),
  filename: __filename,
  plugin,
  title: 'Inlined function references (function return)',
});

pluginTester({
  fixtures: path.join(__dirname, '__fixtures__', 'uncached'),
  filename: __filename,
  plugin,
  title: 'Uncached references',
});

pluginTester({
  babelOptions: BABEL_OPTIONS,
  fixtures: path.join(__dirname, '__fixtures__', 'complex'),
  filename: __filename,
  plugin,
  title: 'Complex references',
});

pluginTester({
  babelOptions: BABEL_OPTIONS,
  fixtures: path.join(__dirname, '__fixtures__', 'bailout'),
  filename: __filename,
  plugin,
  title: 'Bailout scenarios',
});

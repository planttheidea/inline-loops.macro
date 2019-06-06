const pluginTester = require('babel-plugin-tester');
const plugin = require('babel-plugin-macros');
const path = require('path');

pluginTester({
  title: 'Cached references',
  plugin,
  fixtures: path.join(__dirname, '__fixtures__', 'cached'),
  filename: __filename,
});

pluginTester({
  title: 'Inlined function references (arrow expreasion)',
  plugin,
  fixtures: path.join(__dirname, '__fixtures__', 'inlined-arrow-expression'),
  filename: __filename,
});

pluginTester({
  title: 'Inlined function references (arrow return)',
  plugin,
  fixtures: path.join(__dirname, '__fixtures__', 'inlined-arrow-return'),
  filename: __filename,
});

pluginTester({
  title: 'Inlined function references (function return)',
  plugin,
  fixtures: path.join(__dirname, '__fixtures__', 'inlined-function-return'),
  filename: __filename,
});

pluginTester({
  title: 'Uncached references',
  plugin,
  fixtures: path.join(__dirname, '__fixtures__', 'uncached'),
  filename: __filename,
});

pluginTester({
  title: 'Nested references',
  plugin,
  fixtures: path.join(__dirname, '__fixtures__', 'nested'),
  filename: __filename,
});

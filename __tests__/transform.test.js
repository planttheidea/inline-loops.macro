const pluginTester = require("babel-plugin-tester");
const plugin = require("babel-plugin-macros");
const path = require("path");

pluginTester({
  title: "Cached references",
  plugin,
  fixtures: path.join(__dirname, "__fixtures__", "cached"),
  filename: __filename
});

pluginTester({
  title: "Uncached references",
  plugin,
  fixtures: path.join(__dirname, "__fixtures__", "uncached"),
  filename: __filename
});

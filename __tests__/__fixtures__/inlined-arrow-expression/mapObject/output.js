const _results = {};
let _value;
for (const _key in object) {
  _value = object[_key];
  _results[_key] = _value * 2;
}
const doubledValues = _results;
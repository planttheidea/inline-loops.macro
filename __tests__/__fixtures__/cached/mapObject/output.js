const _results = {};
let _value;
for (const _key in object) {
  _value = object[_key];
  _results[_key] = fn(_value, _key, object);
}
const doubledValues = _results;
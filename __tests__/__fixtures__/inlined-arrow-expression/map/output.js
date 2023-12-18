const _length = array.length;
const _results = Array(_length);
for (let _key = 0, _value; _key < _length; ++_key) {
  _value = array[_key];
  _results[_key] = _value * 2;
}
const doubledValues = _results;
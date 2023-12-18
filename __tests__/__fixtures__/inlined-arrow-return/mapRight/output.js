const _length = array.length;
let _key = _length;
const _results = Array(_length);
for (let _value; --_key >= 0; ) {
  _value = array[_key];
  _results[_length - _key - 1] = _value * 2;
}
const doubledValues = _results;
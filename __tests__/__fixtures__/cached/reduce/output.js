let _accumulated = {};
for (let _key = 0, _length = array.length, _value; _key < _length; ++_key) {
  _value = array[_key];
  _accumulated = fn(_accumulated, _value, _key, array);
}
const doubledValues = _accumulated;
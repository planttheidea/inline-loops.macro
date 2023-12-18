let _accumulated = array[0];
for (let _key = 1, _length = array.length, _value; _key < _length; ++_key) {
  _value = array[_key];
  _accumulated = fn(_accumulated, _value, _key, array);
}
const doubledValues = _accumulated;
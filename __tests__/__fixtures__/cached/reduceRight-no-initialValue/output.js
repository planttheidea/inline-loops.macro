let _accumulated = array[array.length - 1];
for (let _key = array.length - 1, _value; --_key >= 1; ) {
  _value = array[_key];
  _accumulated = fn(_accumulated, _value, _key, array);
}
const doubledValues = _accumulated;
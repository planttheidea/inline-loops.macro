let _accumulated = {};
for (let _key = array.length - 0, _value; --_key >= 0; ) {
  _value = array[_key];
  _accumulated = fn(_accumulated, _value, _key, array);
}
const doubledValues = _accumulated;
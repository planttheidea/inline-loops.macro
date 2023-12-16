let _match = -1;
for (let _key = array.length, _value, _result; --_key >= 0; ) {
  _value = array[_key];
  _result = fn(_value, _key, array);
  if (_result) {
    _match = _key;
    break;
  }
}
const firstEven = _match;
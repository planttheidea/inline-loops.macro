let _match = -1;
for (
  let _key = 0, _length = array.length, _value, _result;
  _key < _length;
  ++_key
) {
  _value = array[_key];
  _result = fn(_value, _key, array);
  if (_result) {
    _match = _key;
    break;
  }
}
const firstEven = _match;
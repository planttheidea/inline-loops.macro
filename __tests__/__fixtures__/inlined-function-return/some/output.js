let _determination = false;
for (
  let _key = 0, _length = array.length, _value, _result;
  _key < _length;
  ++_key
) {
  _value = array[_key];
  _result = _value % 2 === 0;
  if (_result) {
    _determination = true;
    break;
  }
}
const areAnyEven = _determination;
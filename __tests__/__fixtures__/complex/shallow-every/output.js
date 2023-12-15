let _determination = true;
for (
  let _key = 0, _length = array.length, _value, _result;
  _key < _length;
  ++_key
) {
  _value = array[_key];
  _result = _value > 0;
  if (!_result) {
    _determination = false;
    break;
  }
}
if (_determination) {
  console.log('I am positive!');
}
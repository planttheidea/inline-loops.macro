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
let _determination2 = true;
for (
  let _key2 = 0, _length2 = array.length, _value2, _result2;
  _key2 < _length2;
  ++_key2
) {
  _value2 = array[_key2];
  _result2 = _value2 === ~~_value2;
  if (!_result2) {
    _determination2 = false;
    break;
  }
}
if (`${_determination}|${_determination2}` === 'true|true') {
  console.log('I am positive and an integer!');
}
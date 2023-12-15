const _length = array.length;
const _results = Array(_length);
for (let _key = 0, _value; _key < _length; ++_key) {
  _value = array[_key];
  _results[_key] = _value * 2;
}
let _object = {};
for (
  let _key2 = 0, _length2 = _results.length, _value2;
  _key2 < _length2;
  ++_key2
) {
  _value2 = _results[_key2];
  _object = {
    ..._object,
    [_value2]: _value2,
  };
}
let _determination = false,
  _value3,
  _result2;
for (const _key3 in _object) {
  _value3 = _object[_key3];
  _result2 = _value3 > 100;
  if (_result2) {
    _determination = true;
    break;
  }
}
if (_determination) {
  console.log('I am large!');
}
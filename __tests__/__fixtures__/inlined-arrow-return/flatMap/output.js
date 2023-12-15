let _result = [];
for (let _key = 0, _length = array.length, _value; _key < _length; ++_key) {
  _value = array[_key];
  _result.push.apply(_result, [_value[0]]);
}
const flattened = _result;
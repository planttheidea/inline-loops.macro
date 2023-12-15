const _results = [];
for (
  let _key = 0, _length = array.length, _value, _result;
  _key < _length;
  ++_key
) {
  _value = array[_key];
  _result = _value % 2 === 0;
  if (_result) {
    _results.push(_value);
  }
}
const onlyEven = _results;
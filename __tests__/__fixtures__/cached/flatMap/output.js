let _results = [];
for (
  let _key = 0, _length = array.length, _value, _result;
  _key < _length;
  ++_key
) {
  _value = array[_key];
  _result = fn(_value, _key, array);
  _results = _results.concat(_result);
}
const flattened = _results;
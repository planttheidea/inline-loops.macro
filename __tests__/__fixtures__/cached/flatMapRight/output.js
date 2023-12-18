let _results = [];
for (let _key = array.length, _value, _result; --_key >= 0; ) {
  _value = array[_key];
  _result = fn(_value, _key, array);
  _results = _results.concat(_result);
}
const flattened = _results;
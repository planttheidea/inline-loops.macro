const _length = array.length;
const _results = Array(_length);
for (let _key = 0, _value; _key < _length; ++_key) {
  _value = array[_key];
  _results[_key] = cachedFn(_value, _key, array);
}
for (
  let _key2 = 0, _length2 = _results.length, _value2;
  _key2 < _length2;
  ++_key2
) {
  _value2 = _results[_key2];
  otherFn(_value2, _key2, _results);
}
const _results = [];
for (
  let _index = 0, _length = array.length, _value, _result;
  _index < _length;
  ++_index
) {
  _value = array[_index];
  const _length2 = array.length;
  const _results2 = Array(_length2);
  for (let _key2 = 0, _value2; _key2 < _length2; ++_key2) {
    _value2 = array[_key2];
    _results2[_key2] = _value2 * 2;
  }
  // usage inside
  const _mapped = _results2;

  // custom for loop with let
  for (let _i = 0; _i < _mapped.length; _i++) {
    _mapped[_i] = _mapped[_i] ** 2;
  }

  // custom for loop with var
  for (var _i2 = 0; _i2 < _mapped.length; _i2++) {
    _mapped[_i2] = _mapped[_i2] ** 2;
  }

  // another iteration, using the mapped values
  let _skip = true,
    _value3 = undefined,
    _value4;
  for (const _key3 in object) {
    _value4 = object[_key3];
    if (_skip) {
      _value3 = _value4;
      _skip = false;
      continue;
    }
    _value3 = {
      [_value3]: _mapped,
    };
  }
  const _reduced = _value3;

  // custom for-in
  for (var _key in _reduced) {
    if (_reduced[_key] < 0) {
      delete _reduced[_key];
    }
  }
  _result = _reduced[100];
  if (_result) {
    _results.push(_value);
  }
}
const result = _results;
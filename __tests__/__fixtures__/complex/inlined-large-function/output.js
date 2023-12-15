let _result = [];
for (let _key = 0, _length = array.length, _value; _key < _length; ++_key) {
  _value = array[_key];
  let _result2 = [];
  for (
    let _key3 = 0, _length2 = array.length, _value2;
    _key3 < _length2;
    ++_key3
  ) {
    _value2 = array[_key3];
    _result2[_key3] = _value2 * 2;
  }
  // usage inside
  const _mapped = _result2;

  // custom for loop with let
  for (let i = 0; i < _mapped.length; i++) {
    _mapped[i] = _mapped[i] ** 2;
  }

  // custom for loop with var
  for (var _i2 = 0; _i2 < _mapped.length; _i2++) {
    _mapped[_i2] = _mapped[_i2] ** 2;
  }

  // another iteration, using the mapped values
  let _hasInitialValue = false;
  let _value3;
  let _result3;
  for (let _key4 in object) {
    if (_hasInitialValue) {
      _value3 = object[_key4];
      _result3 = {
        [_result3]: _mapped,
      };
    } else {
      _hasInitialValue = true;
      _result3 = object[_key4];
    }
  }
  const _reduced = _result3;

  // custom for-in
  for (var _key2 in _reduced) {
    if (_reduced[_key2] < 0) {
      delete _reduced[_key2];
    }
  }
  if (_reduced[100]) _result.push(_value);
}
const result = _result;
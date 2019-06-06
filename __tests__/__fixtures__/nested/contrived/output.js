let _result = [];

for (let _key = 0, _length = array.length, _value; _key < _length; ++_key) {
  _value = array[_key];

  _result.push(_value * 2);
}

let _result2 = {};

for (let _key2 = 0, _length2 = _result.length, _value2; _key2 < _length2; ++_key2) {
  _value2 = _result[_key2];
  _result2 = { ..._result2,
    [_value2]: _value2
  };
}

let _result3 = false;

let _value3;

for (let _key3 in _result2) {
  _value3 = _result2[_key3];

  if (_value3 > 100) {
    _result3 = true;
    break;
  }
}

if (_result3) {
  console.log('I am large!');
}

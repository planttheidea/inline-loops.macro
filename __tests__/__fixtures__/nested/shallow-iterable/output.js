let _result = [];

for (let _key = 0, _length = array.length, _value; _key < _length; ++_key) {
  _value = array[_key];
  let _result2 = true;

  for (let _key2 = 0, _length2 = _value.length, _value2; _key2 < _length2; ++_key2) {
    _value2 = _value[_key2];

    if (!(typeof _value2 === 'string')) {
      _result2 = false;
      break;
    }
  }

  _result[_key] = _result2;
}

const allStrings = _result;

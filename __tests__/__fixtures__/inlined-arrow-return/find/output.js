let _result;

for (let _key = 0, _length = array.length, _value; _key < _length; ++_key) {
  _value = array[_key];

  if (_value % 2 === 0) {
    _result = _value;
    break;
  }
}

const firstEven = _result;

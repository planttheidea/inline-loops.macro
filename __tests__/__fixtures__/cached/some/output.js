let _result = false;

for (let _key = 0, _length = array.length, _value; _key < _length; ++_key) {
  _value = array[_key];

  if (fn(_value, _key, array)) {
    _result = true;
    break;
  }
}

const areAnyEven = _result;

let _result = true;

for (let _key = array.length - 1, _value; _key >= 0; --_key) {
  _value = array[_key];

  if (!fn(_value, _key, array)) {
    _result = false;
    break;
  }
}

const areAllEven = _result;

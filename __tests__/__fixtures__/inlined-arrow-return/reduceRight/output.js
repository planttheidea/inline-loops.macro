let _result = 0;

for (let _key = array.length - 1, _value; _key >= 0; --_key) {
  _value = array[_key];
  _result = _result + _value;
}

const sum = _result;

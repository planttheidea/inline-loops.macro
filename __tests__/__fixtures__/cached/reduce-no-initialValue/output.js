let _result = array[0];

for (let _key = 1, _length = array.length, _value; _key < _length; ++_key) {
  _value = array[_key];
  _result = fn(_result, _value, _key, array);
}

const doubledValues = _result;

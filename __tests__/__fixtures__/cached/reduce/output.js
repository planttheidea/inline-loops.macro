let _result = {};

for (let _key = 0, _length = array.length, _value; _key < _length; ++_key) {
  _value = array[_key];
  _result = fn(_result, _value, _key, array);
}

const doubledValues = _result;

let _result = [];

for (let _key = 0, _length = array.length, _value; _key < _length; ++_key) {
  _value = array[_key];

  _result.push(cachedFn(_value, _key, array));
}

for (let _key2 = 0, _length2 = _result.length, _value2; _key2 < _length2; ++_key2) {
  _value2 = _result[_key2];
  otherFn(_value2, _key2, _result);
}

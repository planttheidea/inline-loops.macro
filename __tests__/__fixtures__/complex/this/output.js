function foo(array) {
  let _result = [];

  for (let _key = 0, _length = array.length, _value; _key < _length; ++_key) {
    _value = array[_key];
    _result[_key] = this && this.foo ? _value : null;
  }

  return _result;
}

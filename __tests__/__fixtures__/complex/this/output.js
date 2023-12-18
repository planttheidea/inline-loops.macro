function foo(array) {
  return (() => {
    const _fn = function (_value) {
      return this && this.foo ? _value : null;
    };
    const _length = array.length;
    const _results = Array(_length);
    for (let _key = 0, _value; _key < _length; ++_key) {
      _value = array[_key];
      _results[_key] = _fn(_value, _key, array);
    }
    return _results;
  })();
}
function getStuff(array, foo) {
  return foo
    ? (() => {
        let _a = 0;
        for (let _key = 0, _length = array.length, _v; _key < _length; ++_key) {
          _v = array[_key];
          _a = _a + _v * 2;
        }
        return _a;
      })()
      ? 'stuff'
      : null
    : null;
}
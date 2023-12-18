function getStuff(array, foo) {
  return foo === 'bar'
    ? (() => {
        const _length = array.length;
        const _results = Array(_length);
        for (let _key = 0, _v; _key < _length; ++_key) {
          _v = array[_key];
          _results[_key] = _v * 2;
        }
        return _results;
      })()
    : array;
}
function getFoo(config) {
  const collection = config.collection || [1, 2, 3];
  return (() => {
    const _fn = (_value) => {
      if (_value === 2) {
        return true;
      }
    };
    const _results = [];
    for (
      let _key = 0, _length = collection.length, _value, _result;
      _key < _length;
      ++_key
    ) {
      _value = collection[_key];
      _result = _fn(_value, _key, collection);
      if (_result) {
        _results.push(_value);
      }
    }
    return _results;
  })();
}
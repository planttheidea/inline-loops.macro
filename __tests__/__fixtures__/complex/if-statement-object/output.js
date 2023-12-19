function getStuff(object, foo) {
  if (foo === 'bar') {
    const state = {
      ...state,
      foo,
    };
    return (() => {
      const _results = {};
      let _v;
      for (const _key in object) {
        _v = object[_key];
        _results[_key] = _v * 2;
      }
      return _results;
    })();
  }
  return object;
}
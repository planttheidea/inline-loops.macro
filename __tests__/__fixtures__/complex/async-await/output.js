async function getStuff(promises) {
  return await (() => {
    let _match;
    for (
      let _key = 0, _length = promises.length, _promise, _result;
      _key < _length;
      ++_key
    ) {
      _promise = promises[_key];
      _result = !!_promise;
      if (_result) {
        _match = _promise;
        break;
      }
    }
    return _match;
  })();
}
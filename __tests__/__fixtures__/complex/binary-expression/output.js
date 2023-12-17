function getStuff(array) {
  let _a = array[0];
  for (let _key = 1, _length = array.length, _v; _key < _length; ++_key) {
    _v = array[_key];
    _a = _a + _v * 2;
  }
  return array ** _a;
}
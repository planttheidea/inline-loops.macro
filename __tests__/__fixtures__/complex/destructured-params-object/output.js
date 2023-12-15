const _collection = [];
for (
  let _key = 0, _length = _collection.length, _destructured;
  _key < _length;
  ++_key
) {
  _destructured = _collection[_key];
  const {
    a: _a,
    b: { c: _c },
  } = _destructured;
  console.log(_a, _c);
}
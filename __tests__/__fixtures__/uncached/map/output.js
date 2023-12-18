const _collection = [1, 2, 3, 4];
const _length = _collection.length;
const _results = Array(_length);
for (let _key = 0, _value; _key < _length; ++_key) {
  _value = _collection[_key];
  const _doubled = _value * 2;
  _results[_key] = _doubled;
}
const doubledValues = _results;
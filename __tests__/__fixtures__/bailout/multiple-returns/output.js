const _collection = [1, 2, 3];
const _fn = (_value) => {
  if (_value === 2) {
    return 82;
  }
  return _value;
};
const _length = _collection.length;
const _results = Array(_length);
for (let _key = 0, _value; _key < _length; ++_key) {
  _value = _collection[_key];
  _results[_key] = _fn(_value, _key, _collection);
}
const result = _results;
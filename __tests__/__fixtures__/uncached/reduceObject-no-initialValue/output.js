const _collection = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
};
let _skip = true,
  _agg = undefined,
  _value;
for (const _index in _collection) {
  _value = _collection[_index];
  if (_skip) {
    _agg = _value;
    _skip = false;
    continue;
  }
  _agg[_index] = _value * 2;
  _agg = _agg;
}
const doubledValues = _agg;
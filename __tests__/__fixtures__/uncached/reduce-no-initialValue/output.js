const _collection = [1, 2, 3, 4];
let _agg = _collection[0];
for (
  let _index = 1, _length = _collection.length, _value;
  _index < _length;
  ++_index
) {
  _value = _collection[_index];
  _agg[_index] = _value * 2;
  _agg = _agg;
}
const doubledValues = _agg;
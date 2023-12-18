const _collection = [1, 2, 3, 4];
let _agg = _collection[_collection.length - 1];
for (let _index = _collection.length - 1, _value; --_index >= 1; ) {
  _value = _collection[_index];
  _agg[_index] = _value * 2;
  _agg = _agg;
}
const doubledValues = _agg;
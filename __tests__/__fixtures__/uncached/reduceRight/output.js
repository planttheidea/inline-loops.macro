const _collection = [1, 2, 3, 4];
let _agg = {};
for (let _index = _collection.length - 0, _value; --_index >= 0; ) {
  _value = _collection[_index];
  _agg[_index] = _value * 2;
  _agg = _agg;
}
const doubledValues = _agg;
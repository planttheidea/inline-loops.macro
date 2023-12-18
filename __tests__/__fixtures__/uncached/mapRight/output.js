const _collection = [1, 2, 3, 4];
const _length = _collection.length;
let _key = _length;
const _results = Array(_length);
for (let _value; --_key >= 0; ) {
  _value = _collection[_key];
  const _doubled = _value * 2;
  _results[_length - _key - 1] = _doubled;
}
const doubledValues = _results;
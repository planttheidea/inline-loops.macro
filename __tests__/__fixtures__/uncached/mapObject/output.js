const _collection = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
};
const _results = {};
let _value;
for (const _key in _collection) {
  _value = _collection[_key];
  const _doubled = _value * 2;
  _results[_key] = _doubled;
}
const doubledValues = _results;
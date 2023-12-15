const _collection = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
};
const _results = {};
let _result, _value;
for (const _key in _collection) {
  _value = _collection[_key];
  const _isValueEven = _value % 2 === 0;
  _result = _isValueEven;
  if (_result) {
    _results[_key] = _value;
  }
}
const onlyEven = _results;
const _collection = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
};
let _determination = false,
  _value,
  _result;
for (const _key in _collection) {
  _value = _collection[_key];
  const _isValueEven = _value % 2 === 0;
  _result = _isValueEven;
  if (_result) {
    _determination = true;
    break;
  }
}
const areAnyEven = _determination;
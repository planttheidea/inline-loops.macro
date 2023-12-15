const _iterable = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
};
let _result = {};
let _value;
for (let _key in _iterable) {
  _value = _iterable[_key];
  const _isValueEven = _value % 2 === 0;
  if (_isValueEven) _result[_key] = _value;
}
const onlyEven = _result;
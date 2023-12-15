const _iterable = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
};
let _hasInitialValue = false;
let _value;
let _result;
for (let _key in _iterable) {
  if (_hasInitialValue) {
    _value = _iterable[_key];
    _result[_key] = _value * 2;
  } else {
    _hasInitialValue = true;
    _result = _iterable[_key];
  }
}
const doubledValues = _result;
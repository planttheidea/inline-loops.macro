const _iterable = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
};
let _value;
let _result = {};
for (let _key in _iterable) {
  _value = _iterable[_key];
  _result[_key] = _value * 2;
}
const doubledValues = _result;
const _iterable = [1, 2, 3, 4];
let _result = {};
for (let _key = 0, _length = _iterable.length, _value; _key < _length; ++_key) {
  _value = _iterable[_key];
  _result[_key] = _value * 2;
}
const doubledValues = _result;
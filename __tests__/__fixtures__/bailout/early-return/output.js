const _iterable = [1, 2, 3];
const _fn = (value) => {
  if (value === 2) {
    return true;
  }
};
let _result = [];
for (let _key = 0, _length = _iterable.length, _value; _key < _length; ++_key) {
  _value = _iterable[_key];
  if (_fn(_value, _key, _iterable)) _result.push(_value);
}
const result = _result;
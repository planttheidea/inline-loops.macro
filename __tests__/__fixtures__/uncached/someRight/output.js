const _iterable = [1, 2, 3, 4];
let _result = false;

for (let _key = _iterable.length - 1, _value; _key >= 0; --_key) {
  _value = _iterable[_key];

  const _isValueEven = _value % 2 === 0;

  if (_isValueEven) {
    _result = true;
    break;
  }
}

const areAnyEven = _result;

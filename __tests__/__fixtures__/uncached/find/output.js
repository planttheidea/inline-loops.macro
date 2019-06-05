const _iterable = [1, 2, 3, 4];

const _fn = value => {
  const isValueEven = value % 2 === 0;
  return isValueEven;
};

let _result;

for (let _key = 0, _length = _iterable.length, _value; _key < _length; ++_key) {
  _value = _iterable[_key];

  if (_fn(_value, _key, _iterable)) {
    _result = _value;
    break;
  }
}

const firstEven = _result;

const _iterable = {
  one: 1,
  two: 2,
  three: 3,
  four: 4
};

const _fn = value => {
  const isValueEven = value % 2 === 0;
  return isValueEven;
};

let _result = false;

let _value;

for (let _key in _iterable) {
  _value = _iterable[_key];

  if (_fn(_value, _key, _iterable)) {
    _result = true;
    break;
  }
}

const areAnyEven = _result;

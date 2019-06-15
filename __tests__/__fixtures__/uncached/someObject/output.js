const _iterable = {
  one: 1,
  two: 2,
  three: 3,
  four: 4
};
let _result = false;

let _value;

for (let _key in _iterable) {
  _value = _iterable[_key];
  const isValueEven = _value % 2 === 0;

  if (isValueEven) {
    _result = true;
    break;
  }
}

const areAnyEven = _result;

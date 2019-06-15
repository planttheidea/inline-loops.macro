const _iterable = [1, 2, 3, 4];
let _result = [];

for (let _key = _iterable.length - 1, _value; _key >= 0; --_key) {
  _value = _iterable[_key];
  const isValueEven = _value % 2 === 0;
  if (isValueEven) _result.push(_value);
}

const onlyEven = _result;

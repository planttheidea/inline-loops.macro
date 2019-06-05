const _iterable = [1, 2, 3, 4];

const _fn = value => {
  const isValueEven = value % 2 === 0;
  return isValueEven;
};

for (let _key = _iterable.length - 1, _value; _key >= 0; --_key) {
  _value = _iterable[_key];

  _fn(_value, _key, _iterable);
}

const _iterable = [['foo', 'bar'], ['bar', 'baz']];

const _fn = entry => {
  const [first] = entry;
  return [first];
};

let _result = [];

for (let _key = _iterable.length - 1, _value; _key >= 0; --_key) {
  _value = _iterable[_key];

  _result.push.apply(_result, _fn(_value, _key, _iterable));
}

const flattened = _result;

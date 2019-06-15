const _iterable = [['foo', 'bar'], ['bar', 'baz']];

const _fn = entry => {
  const [first] = entry;
  return [first];
};

let _result = [];

for (let _key = 0, _length = _iterable.length, _value; _key < _length; ++_key) {
  _value = _iterable[_key];

  _result.push.apply(_result, _fn(_value, _key, _iterable));
}

const flattened = _result;

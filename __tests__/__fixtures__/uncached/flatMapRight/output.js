const _iterable = [['foo', 'bar'], ['bar', 'baz']];
let _result = [];

for (let _key = _iterable.length - 1, _value; _key >= 0; --_key) {
  _value = _iterable[_key];
  const [first] = _value;

  _result.push.apply(_result, [first]);
}

const flattened = _result;

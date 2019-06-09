const _iterable = [1, 2, 3, 4];

const _fn = value => {
  const doubled = value * 2;
  return doubled;
};

let _result = [];

for (let _key = 0, _length = _iterable.length, _value; _key < _length; ++_key) {
  _value = _iterable[_key];
  _result[_key] = _fn(_value, _key, _iterable);
}

const doubledValues = _result;

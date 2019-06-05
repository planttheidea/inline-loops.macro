const _iterable = {
  one: 1,
  two: 2,
  three: 3,
  four: 4
};

const _fn = value => {
  const doubled = value * 2;
  return doubled;
};

let _result = {};

let _value;

for (let _key in _iterable) {
  _value = _iterable[_key];
  _result[_key] = _fn(_value, _key, _iterable);
}

const doubledValues = _result;

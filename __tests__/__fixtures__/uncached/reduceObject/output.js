const _iterable = {
  one: 1,
  two: 2,
  three: 3,
  four: 4
};

const _fn = (agg, value, index) => {
  agg[index] = value * 2;
  return agg;
};

let _result = {};

for (let _key in _iterable) {
  _value = _iterable[_key];
  _result = _fn(_result, _value, _key, _iterable);
}

const doubledValues = _result;

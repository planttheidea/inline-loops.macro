const _iterable = [1, 2, 3, 4];

const _fn = (agg, value, index) => {
  agg[index] = value * 2;
  return agg;
};

let _result = {};

for (let _key = _iterable.length - 1, _value; _key >= 0; --_key) {
  _value = _iterable[_key];
  _result = _fn(_result, _value, _key, _iterable);
}

const doubledValues = _result;

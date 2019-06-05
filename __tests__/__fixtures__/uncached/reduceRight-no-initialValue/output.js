const _iterable = [1, 2, 3, 4];
const _length = _iterable.length;

const _fn = (agg, value, index) => {
  agg[index] = value * 2;
  return agg;
};

let _result = _iterable[_length - 1];

for (let _key = _length - 2, _value; _key >= 0; --_key) {
  _value = _iterable[_key];
  _result = _fn(_result, _value, _key, _iterable);
}

const doubledValues = _result;

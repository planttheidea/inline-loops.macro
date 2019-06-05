const _iterable = {
  one: 1,
  two: 2,
  three: 3,
  four: 4
};
let _hasInitialValue = false;

const _fn = (agg, value, index) => {
  agg[index] = value * 2;
  return agg;
};

let _result;

for (let _key in _iterable) {
  if (_hasInitialValue) {
    _value = _iterable[_key];
    _result = _fn(_result, _value, _key, _iterable);
  } else {
    _hasInitialValue = true;
    _result = _iterable[_key];
  }
}

const doubledValues = _result;

const _iterable = {
  one: 1,
  two: 2,
  three: 3,
  four: 4
};
let _result = {};

let _value;

for (let _key in _iterable) {
  _value = _iterable[_key];

  const _doubled = _value * 2;

  _result[_key] = _doubled;
}

const doubledValues = _result;

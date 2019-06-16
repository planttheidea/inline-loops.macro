const _iterable = [1, 2, 3, 4];
let _result = [];

for (let _key = _iterable.length - 1, _value; _key >= 0; --_key) {
  _value = _iterable[_key];

  const _doubled = _value * 2;

  _result[_result.length] = _doubled;
}

const doubledValues = _result;

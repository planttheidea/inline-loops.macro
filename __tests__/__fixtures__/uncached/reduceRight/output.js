const _iterable = [1, 2, 3, 4];
let _result = {};

for (let _key = _iterable.length - 1, _value; _key >= 0; --_key) {
  _value = _iterable[_key];
  _result[_key] = _value * 2;
}

const doubledValues = _result;

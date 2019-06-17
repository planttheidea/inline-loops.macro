const _iterable = [1, 2, 3, 4];
const _length = _iterable.length;
let _result = _iterable[_length - 1];

for (let _key = _length - 2, _value; _key >= 0; --_key) {
  _value = _iterable[_key];
  _result[_key] = _value * 2;
}

const doubledValues = _result;

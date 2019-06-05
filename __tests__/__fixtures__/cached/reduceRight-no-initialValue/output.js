const _length = array.length;
let _result = array[_length - 1];

for (let _key = _length - 2, _value; _key >= 0; --_key) {
  _value = array[_key];
  _result = fn(_result, _value, _key, array);
}

const doubledValues = _result;

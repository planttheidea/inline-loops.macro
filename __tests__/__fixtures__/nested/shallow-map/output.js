import { deepEqual } from "fast-equals";
let _result = [];

for (let _key = 0, _length = array.length, _value; _key < _length; ++_key) {
  _value = array[_key];
  _result[_key] = cachedFn(_value, _key, array);
}

const isEqual = deepEqual(_result, [1, 2, 3]);

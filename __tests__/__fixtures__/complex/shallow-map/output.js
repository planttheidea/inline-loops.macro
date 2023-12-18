import { deepEqual } from 'fast-equals';
const _length = array.length;
const _results = Array(_length);
for (let _key = 0, _value; _key < _length; ++_key) {
  _value = array[_key];
  _results[_key] = cachedFn(_value, _key, array);
}
const isEqual = deepEqual(_results, [1, 2, 3]);
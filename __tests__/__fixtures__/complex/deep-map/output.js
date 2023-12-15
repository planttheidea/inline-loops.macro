import { deepEqual } from 'fast-equals';
let _result = {};
let _value;
for (let _key in object) {
  _value = object[_key];
  _result[_key] = cachedFn(_value, _key, object);
}
const isEqual = deepEqual(Object.values(_result), [1, 2, 3]);
import { deepEqual } from 'fast-equals';
const _results = {};
let _value;
for (const _key in object) {
  _value = object[_key];
  _results[_key] = cachedFn(_value, _key, object);
}
const isEqual = deepEqual(Object.values(_results), [1, 2, 3]);
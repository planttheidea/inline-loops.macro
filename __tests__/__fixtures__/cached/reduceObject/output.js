let _skip = false,
  _accumulated = {},
  _value;
for (const _key in object) {
  _value = object[_key];
  if (_skip) {
    _accumulated = _value;
    _skip = false;
    continue;
  }
  _accumulated = fn(_accumulated, _value, _key, object);
}
const doubledValues = _accumulated;